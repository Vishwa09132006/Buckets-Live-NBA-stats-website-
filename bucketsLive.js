// bucketsLive.js - Main application functionality

console.log('bucketsLive.js loaded successfully');

// Your existing sidebar toggle (keeping your implementation)
function toggleSideBar() {
    document.querySelector('body').classList.toggle("open")
}

// Remove the import statements - we're using the CDN version instead
// The auth functionality is now handled in auth-modals.js

// Initialize the app
function initializeApp() {
    console.log('BucketsLive app initialized');
    
    // Add any other initialization code here
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('mysearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Any other event listeners for your app
}

// Handle search functionality
function handleSearch(event) {
    const query = event.target.value;
    console.log('Searching for:', query);
    
    // Add your search logic here
    // This could search for players, teams, stats, etc.
    if (query.length > 2) {
        // Only search after user types 3+ characters
        performSearch(query);
    }
}

// Perform the actual search
function performSearch(query) {
    // Placeholder for search functionality
    // You can implement this to search through:
    // - Player names
    // - Team names  
    // - Game results
    // - News articles
    
    console.log(`Performing search for: "${query}"`);
    
    // Example: You could filter data or make API calls here
}

// Load game data (placeholder for future API integration)
function loadGamesData() {
    console.log('Loading games data...');
    
    // This is where you'll integrate with a basketball API
    // For example: NBA API, ESPN API, etc.
    
    const container = document.querySelector('.container-left');
    if (container) {
        // For now, show placeholder content
        container.innerHTML = `
            <h3>Today's Games</h3>
            <p>🏀 Loading live games...</p>
            <p>Connect to basketball API to see real data</p>
        `;
    }
}

// Load scores data (placeholder for future API integration)  
function loadScoresData() {
    console.log('Loading scores data...');
    
    const container = document.querySelector('.container-right');
    if (container) {
        container.innerHTML = `
            <h3>Latest Scores</h3>
            <p>📊 Loading latest scores...</p>
            <p>Connect to basketball API to see real data</p>
        `;
    }
}

// Load player stats (placeholder for future API integration)
function loadPlayerStats() {
    console.log('Loading player stats...');
    
    const container = document.querySelector('.container-3');
    if (container) {
        container.innerHTML = `
            <h3>Top Players This Week</h3>
            <p>⭐ Loading player statistics...</p>
            <p>Connect to basketball API to see real data</p>
        `;
    }
}

// Function to load authenticated content
function loadAuthenticatedContent() {
    console.log('Loading authenticated content...');
    
    // Load data that requires authentication
    loadGamesData();
    loadScoresData();
    loadPlayerStats();
}

// Function called when user successfully signs in
function onUserSignedIn() {
    console.log('User signed in - loading personalized content');
    loadAuthenticatedContent();
}

// Function called when user signs out
function onUserSignedOut() {
    console.log('User signed out - showing default content');
    
    // Reset content to default state
    const leftContainer = document.querySelector('.container-left');
    const rightContainer = document.querySelector('.container-right');
    const container3 = document.querySelector('.container-3');
    
    if (leftContainer) {
        leftContainer.innerHTML = `
            <h3>Today's Games</h3>
            <p>Games data will load here once you're authenticated...</p>
        `;
    }
    
    if (rightContainer) {
        rightContainer.innerHTML = `
            <h3>Latest Scores</h3>
            <p>Scores data will load here once you're authenticated...</p>
        `;
    }
    
    if (container3) {
        container3.innerHTML = `
            <h3>Top Players This Week</h3>
            <p>Player stats will load here once you're authenticated...</p>
        `;
    }
}

// Utility function to check if user is authenticated
function isUserAuthenticated() {
    // This will be called from auth-modals.js
    return currentUser !== null;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Don't auto-load content - wait for authentication
    console.log('DOM loaded, waiting for user authentication...');
});