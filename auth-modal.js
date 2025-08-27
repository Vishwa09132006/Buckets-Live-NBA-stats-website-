// auth-modals.js - Complete Modal Authentication System

// Global variables
let userPool = null;
let currentUser = null;
let currentModal = null;

// NBA Teams for dropdown
const NBA_TEAMS = [
    'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets',
    'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets',
    'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers',
    'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
    'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks',
    'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns',
    'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
    'Utah Jazz', 'Washington Wizards'
];

console.log('auth-modals.js loaded successfully');

// Initialize authentication
function initializeAuth() {
    try {
        // Check if AWS_CONFIG is loaded
        if (typeof AWS_CONFIG === 'undefined') {
            console.error('AWS_CONFIG not found. Make sure aws-config.js is loaded.');
            return;
        }

        // Initialize Cognito User Pool
        const poolData = {
            UserPoolId: AWS_CONFIG.userPoolId,
            ClientId: AWS_CONFIG.clientId
        };

        userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        console.log('Authentication initialized successfully');

        // Check if user is already logged in
        checkExistingAuth();

    } catch (error) {
        console.error('Failed to initialize authentication:', error);
        showNotification('Failed to initialize authentication system', 'error');
    }
}

// Check for existing authentication
function checkExistingAuth() {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
            if (err) {
                console.log('No valid session found');
                return;
            }

            if (session.isValid()) {
                currentUser = cognitoUser;
                updateUIForLoggedInUser();
                console.log('User already authenticated');


            }
        }
        );
}
}

// Handle auth button click
function handleAuthClick() {
    if (currentUser) {
        // User is logged in, show user menu or logout
        showUserMenu();
    } else {
        // User is not logged in, show sign in modal
        showSignInModal();
    }
}

// Show user menu (when logged in)
function showUserMenu() {
    const confirmed = confirm('Would you like to sign out?');
    if (confirmed) {
        signOut();
    }
}

// Show Sign In Modal
function showSignInModal() {
    closeCurrentModal();

    const modalHTML = `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Sign In to BucketsLive</h2>
                <button class="close-btn" onclick="closeCurrentModal()">&times;</button>
            </div>
            
            <form id="signin-form" onsubmit="handleSignIn(event)">
                <div class="form-group">
                    <input type="email" id="signin-email" placeholder="Email" required autocomplete="email">
                </div>
                
                <div class="form-group">
                    <input type="password" id="signin-password" placeholder="Password" required autocomplete="current-password">
                </div>
                
                <div class="form-group">
                    <button type="submit" class="auth-btn primary">Sign In</button>
                </div>
                
                <div class="form-links">
                    <a href="#" onclick="showForgotPasswordModal()">Forgot Password?</a>
                    <span>•</span>
                    <a href="#" onclick="showSignUpModal()">Create Account</a>
                </div>
            </form>
            
            <div id="signin-error" class="error-message" style="display: none;"></div>
            <div id="signin-loading" class="loading-message" style="display: none;">Signing in...</div>
        </div>
    `;

    showModal(modalHTML);

    // Focus on email input
    setTimeout(() => {
        const emailInput = document.getElementById('signin-email');
        if (emailInput) emailInput.focus();
    }, 100);
}

// Show Sign Up Modal
function showSignUpModal() {
    closeCurrentModal();

    // Create teams dropdown options
    const teamOptions = NBA_TEAMS.map(team =>
        `<option value="${team}">${team}</option>`
    ).join('');

    const modalHTML = `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Join BucketsLive</h2>
                <button class="close-btn" onclick="closeCurrentModal()">&times;</button>
            </div>
            
            <form id="signup-form" onsubmit="handleSignUp(event)">
                <div class="form-group">
                    <input type="text" id="signup-name" placeholder="Full Name" required autocomplete="name">
                </div>
                
                <div class="form-group">
                    <input type="email" id="signup-email" placeholder="Email" required autocomplete="email">
                </div>
                
                <div class="form-group">
                    <input type="password" id="signup-password" placeholder="Password (min 8 characters)" 
                           required minlength="8" autocomplete="new-password">
                </div>
                
                <div class="form-group">
                    <select id="signup-team">
                        <option value="">Select Favorite Team (Optional)</option>
                        ${teamOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="auth-btn primary">Create Account</button>
                </div>
                
                <div class="form-links">
                    <a href="#" onclick="showSignInModal()">Already have an account? Sign In</a>
                </div>
            </form>
            
            <div id="signup-error" class="error-message" style="display: none;"></div>
            <div id="signup-loading" class="loading-message" style="display: none;">Creating account...</div>
        </div>
    `;

    showModal(modalHTML);

    // Focus on name input
    setTimeout(() => {
        const nameInput = document.getElementById('signup-name');
        if (nameInput) nameInput.focus();
    }, 100);
}

// Show Email Verification Modal
function showEmailVerificationModal(email) {
    closeCurrentModal();

    const modalHTML = `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Verify Your Email</h2>
                <button class="close-btn" onclick="closeCurrentModal()">&times;</button>
            </div>
            
            <p>We've sent a verification code to:</p>
            <p style="color: rgb(0, 168, 255); font-weight: bold;">${email}</p>
            <p>Please enter the code below:</p>
            
            <form id="verify-form" onsubmit="handleEmailVerification(event, '${email}')">
                <div class="form-group">
                    <input type="text" id="verification-code" placeholder="Verification Code" 
                           required maxlength="6" autocomplete="one-time-code">
                </div>
                
                <div class="form-group">
                    <button type="submit" class="auth-btn primary">Verify Email</button>
                </div>
                
                <div class="form-links">
                    <a href="#" onclick="resendVerificationCode('${email}')">Resend Code</a>
                </div>
            </form>
            
            <div id="verify-error" class="error-message" style="display: none;"></div>
            <div id="verify-loading" class="loading-message" style="display: none;">Verifying...</div>
        </div>
    `;

    showModal(modalHTML);

    // Focus on verification code input
    setTimeout(() => {
        const codeInput = document.getElementById('verification-code');
        if (codeInput) codeInput.focus();
    }, 100);
}

// Show Forgot Password Modal
function showForgotPasswordModal() {
    closeCurrentModal();

    const modalHTML = `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Reset Password</h2>
                <button class="close-btn" onclick="closeCurrentModal()">&times;</button>
            </div>
            
            <p>Enter your email to receive a password reset code:</p>
            
            <form id="forgot-password-form" onsubmit="handleForgotPassword(event)">
                <div class="form-group">
                    <input type="email" id="forgot-email" placeholder="Email" required autocomplete="email">
                </div>
                
                <div class="form-group">
                    <button type="submit" class="auth-btn primary">Send Reset Code</button>
                </div>
                
                <div class="form-links">
                    <a href="#" onclick="showSignInModal()">Back to Sign In</a>
                </div>
            </form>
            
            <div id="forgot-error" class="error-message" style="display: none;"></div>
            <div id="forgot-loading" class="loading-message" style="display: none;">Sending code...</div>
        </div>
    `;

    showModal(modalHTML);

    // Focus on email input
    setTimeout(() => {
        const emailInput = document.getElementById('forgot-email');
        if (emailInput) emailInput.focus();
    }, 100);
}

// Generic modal creator
function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'auth-modal-overlay';
    modal.innerHTML = `
        <div class="auth-modal">
            ${content}
        </div>
    `;

    // Close modal when clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCurrentModal();
        }
    });

    // Close modal on Escape key
    const escapeHandler = function (e) {
        if (e.key === 'Escape' && currentModal) {
            closeCurrentModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    document.body.appendChild(modal);
    currentModal = modal;
}

// Close current modal
function closeCurrentModal() {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }
}

// Handle Sign In
async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;

    if (!email || !password) {
        showError('signin-error', 'Please fill in all fields');
        return;
    }

    showLoading('signin-loading', true);
    hideError('signin-error');

    try {
        const result = await signIn(email, password);

        if (result.success) {
            closeCurrentModal();
            showNotification('Welcome back to BucketsLive! 🏀', 'success');
            updateUIForLoggedInUser();
        }
    } catch (error) {
        showError('signin-error', error.message || 'Sign in failed');
    } finally {
        showLoading('signin-loading', false);
    }
}

// Handle Sign Up
async function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const team = document.getElementById('signup-team').value;

    if (!name || !email || !password) {
        showError('signup-error', 'Please fill in all required fields');
        return;
    }

    if (password.length < 8) {
        showError('signup-error', 'Password must be at least 8 characters');
        return;
    }

    showLoading('signup-loading', true);
    hideError('signup-error');

    try {
        const result = await signUp(email, password, email, name, team);

        if (result.success) {
            showEmailVerificationModal(email);
        }
    } catch (error) {
        showError('signup-error', error.message || 'Sign up failed');
    } finally {
        showLoading('signup-loading', false);
    }
}

// Handle Email Verification
async function handleEmailVerification(event, email) {
    event.preventDefault();

    const verificationCode = document.getElementById('verification-code').value.trim();

    if (!verificationCode) {
        showError('verify-error', 'Please enter the verification code');
        return;
    }

    showLoading('verify-loading', true);
    hideError('verify-error');

    try {
        const result = await confirmSignUp(email, verificationCode);

        if (result.success) {
            closeCurrentModal();
            showNotification('Email verified! You can now sign in.', 'success');
            showSignInModal();
        }
    } catch (error) {
        showError('verify-error', error.message || 'Verification failed');
    } finally {
        showLoading('verify-loading', false);
    }
}

// Handle Forgot Password
async function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('forgot-email').value.trim();

    if (!email) {
        showError('forgot-error', 'Please enter your email');
        return;
    }

    showLoading('forgot-loading', true);
    hideError('forgot-error');

    try {
        const result = await forgotPassword(email);

        if (result.success) {
            showPasswordResetModal(email);
        }
    } catch (error) {
        showError('forgot-error', error.message || 'Failed to send reset code');
    } finally {
        showLoading('forgot-loading', false);
    }
}

// Show Password Reset Modal
function showPasswordResetModal(email) {
    closeCurrentModal();

    const modalHTML = `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Reset Password</h2>
                <button class="close-btn" onclick="closeCurrentModal()">&times;</button>
            </div>
            
            <p>We've sent a reset code to:</p>
            <p style="color: rgb(0, 168, 255); font-weight: bold;">${email}</p>
            
            <form id="reset-password-form" onsubmit="handlePasswordReset(event, '${email}')">
                <div class="form-group">
                    <input type="text" id="reset-code" placeholder="Reset Code" required>
                </div>
                
                <div class="form-group">
                    <input type="password" id="new-password" placeholder="New Password" required minlength="8">
                </div>
                
                <div class="form-group">
                    <button type="submit" class="auth-btn primary">Reset Password</button>
                </div>
                
                <div class="form-links">
                    <a href="#" onclick="showSignInModal()">Back to Sign In</a>
                </div>
            </form>
            
            <div id="reset-error" class="error-message" style="display: none;"></div>
            <div id="reset-loading" class="loading-message" style="display: none;">Resetting password...</div>
        </div>
    `;

    showModal(modalHTML);

    setTimeout(() => {
        const codeInput = document.getElementById('reset-code');
        if (codeInput) codeInput.focus();
    }, 100);
}

// Handle Password Reset
async function handlePasswordReset(event, email) {
    event.preventDefault();

    const code = document.getElementById('reset-code').value.trim();
    const newPassword = document.getElementById('new-password').value;

    if (!code || !newPassword) {
        showError('reset-error', 'Please fill in all fields');
        return;
    }

    if (newPassword.length < 8) {
        showError('reset-error', 'Password must be at least 8 characters');
        return;
    }

    showLoading('reset-loading', true);
    hideError('reset-error');

    try {
        const result = await confirmPasswordReset(email, code, newPassword);

        if (result.success) {
            closeCurrentModal();
            showNotification('Password reset successful! You can now sign in.', 'success');
            showSignInModal();
        }
    } catch (error) {
        showError('reset-error', error.message || 'Password reset failed');
    } finally {
        showLoading('reset-loading', false);
    }
}

// AWS Cognito Functions
function signUp(username, password, email, name, team) {
    return new Promise((resolve, reject) => {
        const attributeList = [];

        // Required attributes
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email,
        }));

        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'name',
            Value: name,
        }));

        // Optional team preference
        if (team) {
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: 'custom:preferred_team',
                Value: team,
            }));
        }

        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                console.error('Sign up failed:', err);
                reject(err);
                return;
            }

            console.log('Sign up successful');
            resolve({
                success: true,
                user: result.user
            });
        });
    });
}

function confirmSignUp(username, verificationCode) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
            if (err) {
                console.error('Verification failed:', err);
                reject(err);
                return;
            }

            console.log('Email verification successful');
            resolve({
                success: true,
                result: result
            });
        });
    });
}

function signIn(username, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: username,
            Password: password,
        });

        const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log('Sign in successful');
                currentUser = cognitoUser;
                resolve({
                    success: true,
                    user: cognitoUser,
                    tokens: result
                });
            },
            onFailure: (err) => {
                console.error('Sign in failed:', err);
                reject(err);
            },
        });
    });
}

function forgotPassword(username) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.forgotPassword({
            onSuccess: (result) => {
                console.log('Password reset code sent');
                resolve({
                    success: true,
                    result: result
                });
            },
            onFailure: (err) => {
                console.error('Forgot password failed:', err);
                reject(err);
            }
        });
    });
}

function confirmPasswordReset(username, verificationCode, newPassword) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => {
                console.log('Password reset successful');
                resolve({
                    success: true
                });
            },
            onFailure: (err) => {
                console.error('Password reset failed:', err);
                reject(err);
            }
        });
    });
}

function resendVerificationCode(username) {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });

    cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
            console.error('Resend verification failed:', err);
            showNotification('Failed to resend verification code', 'error');
            return;
        }

        console.log('Verification code resent');
        showNotification('Verification code resent!', 'success');
    });
}

function signOut() {
    if (currentUser) {
        currentUser.signOut();
        currentUser = null;
        updateUIForLoggedOutUser();
        showNotification('Signed out successfully', 'success');
        console.log('User signed out');

        if (typeof onUserSignedOut === 'function') {
            onUserSignedOut();
        }
    }
}

// UI Update Functions
function updateUIForLoggedInUser() {
    const authBtn = document.getElementById('auth-btn');
    const authText = document.getElementById('auth-text');
    const userDashboard = document.getElementById('user-dashboard');

    if (authText) {
        authText.textContent = 'Account';
    }

    if (userDashboard) {
        userDashboard.style.display = 'block';
    }

    // Get user attributes and update dashboard
    if (currentUser) {
        currentUser.getUserAttributes((err, attributes) => {
            if (err) {
                console.error('Error getting user attributes:', err);
                return;
            }

            const userDisplayName = document.getElementById('user-display-name');
            const userFavoriteTeam = document.getElementById('user-favorite-team');

            if (attributes) {
                const nameAttr = attributes.find(attr => attr.Name === 'name');
                const teamAttr = attributes.find(attr => attr.Name === 'custom:preferred_team');

                if (userDisplayName && nameAttr) {
                    userDisplayName.textContent = nameAttr.Value;
                }

                if (userFavoriteTeam && teamAttr) {
                    userFavoriteTeam.textContent = teamAttr.Value;
                }
            }
        });
    }

    if (typeof onUserSignedIn === 'function') {
        onUserSignedIn();
    }
}

function updateUIForLoggedOutUser() {
    const authText = document.getElementById('auth-text');
    const userDashboard = document.getElementById('user-dashboard');

    if (authText) {
        authText.textContent = 'Sign-in';
    }

    if (userDashboard) {
        userDashboard.style.display = 'none';
    }
}

// Utility Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showLoading(elementId, show) {
    const loadingElement = document.getElementById(elementId);
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: Arial, sans-serif;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}