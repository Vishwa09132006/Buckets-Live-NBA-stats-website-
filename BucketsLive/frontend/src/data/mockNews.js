// Mock NBA News Data
export const mockNews = [
  {
    id: 1,
    title: 'Lakers Secure Overtime Victory Against Warriors',
    summary: 'LeBron James leads Lakers to thrilling OT win with 35 points and 10 assists in a Western Conference showdown.',
    category: 'Game Recap',
    date: '2 hours ago',
    image: '🏀',
    source: 'ESPN'
  },
  {
    id: 2,
    title: 'Giannis Antetokounmpo Named Eastern Conference Player of the Week',
    summary: 'Bucks superstar averages 32.5 PPG and 12.3 RPG over four-game stretch, leading team to perfect week.',
    category: 'Awards',
    date: '5 hours ago',
    image: '🏆',
    source: 'NBA.com'
  },
  {
    id: 3,
    title: 'Trade Deadline Approaching: Top Teams Making Moves',
    summary: 'With the trade deadline just weeks away, front offices across the league are evaluating potential roster upgrades.',
    category: 'Trade Rumors',
    date: '8 hours ago',
    image: '🔄',
    source: 'The Athletic'
  },
  {
    id: 4,
    title: 'Rookie Sensation Leads Team to Fifth Straight Win',
    summary: 'First-year guard posts triple-double in crucial victory, continuing impressive debut season performance.',
    category: 'Rising Stars',
    date: '1 day ago',
    image: '⭐',
    source: 'Bleacher Report'
  },
  {
    id: 5,
    title: 'All-Star Voting Results Released: Surprises in Starter Lineup',
    summary: 'Fan voting determines starters for upcoming All-Star Game with some unexpected names making the cut.',
    category: 'All-Star',
    date: '1 day ago',
    image: '🌟',
    source: 'NBA.com'
  },
  {
    id: 6,
    title: 'Injury Report: Key Players Miss Time Across League',
    summary: 'Multiple contenders dealing with injuries to star players as season reaches critical midpoint.',
    category: 'Injuries',
    date: '2 days ago',
    image: '🏥',
    source: 'ESPN'
  }
];

// Helper function to get news by category
export const getNewsByCategory = (category) => {
  return mockNews.filter(article => article.category === category);
};

// Helper function to get recent news
export const getRecentNews = (limit = 3) => {
  return mockNews.slice(0, limit);
};