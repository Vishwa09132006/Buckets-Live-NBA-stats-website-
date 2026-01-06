import React, { useState } from 'react';
import { signUp, signIn, confirmSignUp, signOut } from 'aws-amplify/auth';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email
          }
        }
      });

      setSuccess('Sign up successful! Check your email for verification code.');
      setMode('verify');
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signIn({
        username: email,
        password: password
      });

      setSuccess('Signed in successfully!');
      setTimeout(() => {
        window.location.reload(); // Reload to update auth state
      }, 1000);
    } catch (err) {
      console.error('Sign in error:', err);
      if (err.message.includes('UserNotConfirmedException')) {
        setError('Please verify your email first');
        setMode('verify');
      } else {
        setError(err.message || 'Sign in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: verificationCode
      });

      setSuccess('Email verified! You can now sign in.');
      setTimeout(() => {
        setMode('signin');
      }, 2000);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-content">
          
          {/* Header */}
          <div className="auth-header">
            <h2>
              {mode === 'signin' && '🏀 Sign In'}
              {mode === 'signup' && '🏀 Create Account'}
              {mode === 'verify' && '✉️ Verify Email'}
            </h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          {/* Messages */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Sign In Form */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="auth-btn primary"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="form-links">
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); }}>
                  Sign Up
                </a>
              </div>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="auth-btn primary"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="form-links">
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setMode('signin'); }}>
                  Sign In
                </a>
              </div>
            </form>
          )}

          {/* Verification Form */}
          {mode === 'verify' && (
            <form onSubmit={handleVerify}>
              <p style={{color: 'white', marginBottom: '15px', opacity: 0.8}}>
                Enter the verification code sent to {email}
              </p>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="auth-btn primary"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>

              <div className="form-links">
                <a href="#" onClick={(e) => { e.preventDefault(); setMode('signin'); }}>
                  Back to Sign In
                </a>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

export default AuthModal;