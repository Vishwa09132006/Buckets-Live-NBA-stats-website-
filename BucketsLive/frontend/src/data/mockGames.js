// Mock NBA Games Data
export const mockGames = [
  {
    id: 1,
    homeTeam: 'Lakers',
    homeLogo: '🏀',
    awayTeam: 'Warriors',
    awayLogo: '🏀',
    homeScore: 112,
    awayScore: 108,
    status: 'Final',
    quarter: 'Q4',
    date: 'Today, 7:30 PM EST',
    venue: 'Crypto.com Arena',
    attendance: '18,997'
  },
  {
    id: 2,
    homeTeam: 'Celtics',
    homeLogo: '🏀',
    awayTeam: 'Heat',
    awayLogo: '🏀',
    homeScore: 95,
    awayScore: 98,
    status: 'Final',
    quarter: 'Q4',
    date: 'Today, 8:00 PM EST',
    venue: 'TD Garden',
    attendance: '19,156'
  },
  {
    id: 3,
    homeTeam: 'Bucks',
    homeLogo: '🏀',
    awayTeam: 'Nets',
    awayLogo: '🏀',
    homeScore: 87,
    awayScore: 92,
    status: 'Live',
    quarter: 'Q3 - 5:23',
    date: 'Today, 8:30 PM EST',
    venue: 'Fiserv Forum',
    attendance: '17,341'
  },
  {
    id: 4,
    homeTeam: 'Mavericks',
    homeLogo: '🏀',
    awayTeam: 'Suns',
    awayLogo: '🏀',
    homeScore: 0,
    awayScore: 0,
    status: 'Upcoming',
    quarter: 'Scheduled',
    date: 'Tomorrow, 7:00 PM EST',
    venue: 'American Airlines Center',
    attendance: 'TBD'
  },
  {
    id: 5,
    homeTeam: 'Nuggets',
    homeLogo: '🏀',
    awayTeam: 'Clippers',
    awayLogo: '🏀',
    homeScore: 0,
    awayScore: 0,
    status: 'Upcoming',
    quarter: 'Scheduled',
    date: 'Tomorrow, 9:00 PM EST',
    venue: 'Ball Arena',
    attendance: 'TBD'
  },
  {
    id: 6,
    homeTeam: '76ers',
    homeLogo: '🏀',
    awayTeam: 'Knicks',
    awayLogo: '🏀',
    homeScore: 0,
    awayScore: 0,
    status: 'Upcoming',
    quarter: 'Scheduled',
    date: 'Tomorrow, 7:30 PM EST',
    venue: 'Wells Fargo Center',
    attendance: 'TBD'
  },
  {
    id: 7,
    homeTeam: 'Grizzlies',
    homeLogo: '🏀',
    awayTeam: 'Pelicans',
    awayLogo: '🏀',
    homeScore: 103,
    awayScore: 99,
    status: 'Final',
    quarter: 'Q4',
    date: 'Yesterday, 8:00 PM EST',
    venue: 'FedExForum',
    attendance: '17,794'
  },
  {
    id: 8,
    homeTeam: 'Trail Blazers',
    homeLogo: '🏀',
    awayTeam: 'Kings',
    awayLogo: '🏀',
    homeScore: 118,
    awayScore: 115,
    status: 'Final',
    quarter: 'OT',
    date: 'Yesterday, 10:00 PM EST',
    venue: 'Moda Center',
    attendance: '19,393'
  }
];

// Helper function to get games by status
export const getGamesByStatus = (status) => {
  return mockGames.filter(game => game.status === status);
};

// Helper function to get live games
export const getLiveGames = () => {
  return mockGames.filter(game => game.status === 'Live');
};

// Helper function to get today's games
export const getTodaysGames = () => {
  return mockGames.filter(game => game.date.includes('Today'));
};