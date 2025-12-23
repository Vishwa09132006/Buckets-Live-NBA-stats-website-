// Mock NBA Players Data
export const mockPlayers = [
  {
    id: 1,
    name: 'LeBron James',
    team: 'Lakers',
    position: 'SF',
    number: 23,
    ppg: 25.4,
    rpg: 7.2,
    apg: 8.1,
    fgPercentage: 52.3,
    height: '6\'9"',
    weight: '250 lbs',
    age: 39
  },
  {
    id: 2,
    name: 'Stephen Curry',
    team: 'Warriors',
    position: 'PG',
    number: 30,
    ppg: 28.7,
    rpg: 4.5,
    apg: 6.3,
    fgPercentage: 47.1,
    height: '6\'2"',
    weight: '185 lbs',
    age: 35
  },
  {
    id: 3,
    name: 'Giannis Antetokounmpo',
    team: 'Bucks',
    position: 'PF',
    number: 34,
    ppg: 31.2,
    rpg: 11.8,
    apg: 5.7,
    fgPercentage: 55.8,
    height: '6\'11"',
    weight: '242 lbs',
    age: 29
  },
  {
    id: 4,
    name: 'Luka Doncic',
    team: 'Mavericks',
    position: 'PG',
    number: 77,
    ppg: 33.5,
    rpg: 8.9,
    apg: 9.2,
    fgPercentage: 48.2,
    height: '6\'7"',
    weight: '230 lbs',
    age: 25
  },
  {
    id: 5,
    name: 'Jayson Tatum',
    team: 'Celtics',
    position: 'SF',
    number: 0,
    ppg: 27.3,
    rpg: 8.4,
    apg: 4.9,
    fgPercentage: 46.7,
    height: '6\'8"',
    weight: '210 lbs',
    age: 26
  },
  {
    id: 6,
    name: 'Nikola Jokic',
    team: 'Nuggets',
    position: 'C',
    number: 15,
    ppg: 26.8,
    rpg: 12.4,
    apg: 9.1,
    fgPercentage: 58.3,
    height: '6\'11"',
    weight: '284 lbs',
    age: 29
  },
  {
    id: 7,
    name: 'Kevin Durant',
    team: 'Suns',
    position: 'PF',
    number: 35,
    ppg: 27.9,
    rpg: 6.7,
    apg: 5.3,
    fgPercentage: 51.4,
    height: '6\'10"',
    weight: '240 lbs',
    age: 35
  },
  {
    id: 8,
    name: 'Joel Embiid',
    team: '76ers',
    position: 'C',
    number: 21,
    ppg: 34.7,
    rpg: 11.0,
    apg: 5.6,
    fgPercentage: 52.9,
    height: '7\'0"',
    weight: '280 lbs',
    age: 30
  }
];

// Helper function to get top scorers
export const getTopScorers = (limit = 5) => {
  return [...mockPlayers]
    .sort((a, b) => b.ppg - a.ppg)
    .slice(0, limit);
};

// Helper function to search players by name
export const searchPlayers = (searchTerm) => {
  return mockPlayers.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Helper function to get players by team
export const getPlayersByTeam = (team) => {
  return mockPlayers.filter(player => player.team === team);
};