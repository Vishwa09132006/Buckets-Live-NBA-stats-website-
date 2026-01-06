// API Gateway endpoint
const API_GATEWAY_BASE = 'https://rh8363va1e.execute-api.us-east-2.amazonaws.com/prod';

// Fetch today's games from YOUR Lambda via API Gateway
export const fetchTodaysGames = async () => {
  try {
    console.log('Fetching games from API Gateway...');
    const response = await fetch(`${API_GATEWAY_BASE}/games/today`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Gateway response:', data);
    
    if (data.success && data.games) {
      return data.games;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching games from API Gateway:', error);
    return null;
  }
};

// Fetch recent games (same endpoint for now)
export const fetchRecentGames = async () => {
  return fetchTodaysGames();
};

// Search players (not implemented yet)
export const searchPlayers = async (query) => {
  console.log('Player search not implemented yet');
  return null;
};

// Helper functions
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};