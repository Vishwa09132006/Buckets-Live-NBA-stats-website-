const AWS = require('aws-sdk');
const https = require('https');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    // Determine which date to fetch
    const today = getTodayDate();
    const dateToFetch = event.queryStringParameters?.date || today;
    
    // Check cache first
    const cacheKey = `games_${dateToFetch}`;
    const cachedData = await getFromCache(cacheKey);
    
    if (cachedData) {
      console.log('Returning cached data');
      return successResponse(cachedData);
    }
    
    // Try to fetch from NBA API
    console.log(`Fetching games for ${dateToFetch}`);
    let games;
    
    try {
      games = await fetchFromNBAApi(dateToFetch);
      console.log(`Fetched ${games.length} games from NBA API`);
    } catch (apiError) {
      console.log('NBA API failed, using mock data:', apiError.message);
      games = getMockGames();
    }
    
    // Cache the results
    await saveToCache(cacheKey, games);
    
    return successResponse(games);
    
  } catch (error) {
    console.error('Error:', error);
    // Return mock data on any error
    return successResponse(getMockGames());
  }
};

// Fetch from balldontlie API
const fetchFromNBAApi = (date) => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.NBA_API_KEY || '';
    const url = `https://api.balldontlie.io/v1/games?dates[]=${date}`;
    
    const options = {
      headers: apiKey ? { 'Authorization': apiKey } : {}
    };
    
    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Handle non-200 status codes
        if (res.statusCode !== 200) {
          console.log(`API returned status ${res.statusCode}`);
          reject(new Error(`NBA API error: ${res.statusCode}`));
          return;
        }
        
        try {
          const jsonData = JSON.parse(data);
          const games = transformGamesData(jsonData.data || []);
          resolve(games);
        } catch (err) {
          console.log('Failed to parse API response:', err.message);
          reject(err);
        }
      });
    }).on('error', (err) => {
      console.log('HTTPS request failed:', err.message);
      reject(err);
    });
  });
};

// Mock data fallback
const getMockGames = () => {
  return [
    {
      id: 1,
      homeTeam: 'Los Angeles Lakers',
      awayTeam: 'Golden State Warriors',
      homeScore: 112,
      awayScore: 108,
      homeLogo: '💜',
      awayLogo: '🌉',
      status: 'Final',
      quarter: 'Q4',
      date: 'Jan 2, 7:30 PM',
      venue: 'Los Angeles',
      time: '7:30 PM'
    },
    {
      id: 2,
      homeTeam: 'Boston Celtics',
      awayTeam: 'Miami Heat',
      homeScore: 105,
      awayScore: 98,
      homeLogo: '☘️',
      awayLogo: '🔥',
      status: 'Final',
      quarter: 'Q4',
      date: 'Jan 2, 7:00 PM',
      venue: 'Boston',
      time: '7:00 PM'
    },
    {
      id: 3,
      homeTeam: 'Milwaukee Bucks',
      awayTeam: 'Chicago Bulls',
      homeScore: 0,
      awayScore: 0,
      homeLogo: '🦌',
      awayLogo: '🐂',
      status: 'Upcoming',
      quarter: null,
      date: 'Jan 3, 8:00 PM',
      venue: 'Milwaukee',
      time: '8:00 PM'
    }
  ];
};

// Transform API data to our format
const transformGamesData = (apiGames) => {
  const teamLogos = {
    'ATL': '🦅', 'BOS': '☘️', 'BKN': '🏀', 'CHA': '🐝', 'CHI': '🐂',
    'CLE': '🍷', 'DAL': '🐴', 'DEN': '⛰️', 'DET': '🚗', 'GSW': '🌉',
    'HOU': '🚀', 'IND': '🏎️', 'LAC': '⚓', 'LAL': '💜', 'MEM': '🐻',
    'MIA': '🔥', 'MIL': '🦌', 'MIN': '🐺', 'NOP': '⚜️', 'NYK': '🗽',
    'OKC': '⚡', 'ORL': '🪄', 'PHI': '🔔', 'PHX': '☀️', 'POR': '🌲',
    'SAC': '👑', 'SAS': '⭐', 'TOR': '🦖', 'UTA': '🎵', 'WAS': '🏛️'
  };
  
  return apiGames.map(game => {
    let status = 'Upcoming';
    if (game.status === 'Final') {
      status = 'Final';
    } else if (game.period > 0) {
      status = 'Live';
    }
    
    return {
      id: game.id,
      homeTeam: game.home_team.full_name,
      awayTeam: game.visitor_team.full_name,
      homeScore: game.home_team_score || 0,
      awayScore: game.visitor_team_score || 0,
      homeLogo: teamLogos[game.home_team.abbreviation] || '🏀',
      awayLogo: teamLogos[game.visitor_team.abbreviation] || '🏀',
      status: status,
      quarter: game.period ? `Q${game.period}` : null,
      date: new Date(game.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }),
      venue: game.home_team.city,
      time: game.time || 'TBD'
    };
  });
};

// Cache functions
const getFromCache = async (cacheKey) => {
  try {
    const result = await dynamodb.get({
      TableName: 'BucketsLive-Games',
      Key: { cacheKey }
    }).promise();
    
    if (!result.Item) return null;
    
    // Check if cache is less than 5 minutes old
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - result.Item.timestamp > fiveMinutes) {
      console.log('Cache expired');
      return null;
    }
    
    return result.Item.games;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};

const saveToCache = async (cacheKey, games) => {
  try {
    await dynamodb.put({
      TableName: 'BucketsLive-Games',
      Item: {
        cacheKey,
        games,
        timestamp: Date.now()
      }
    }).promise();
    console.log('Games cached successfully');
  } catch (error) {
    console.error('Cache write error:', error);
  }
};

// Helper functions
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Response functions
const successResponse = (data) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  },
  body: JSON.stringify({
    success: true,
    games: data,
    source: 'lambda'
  })
});