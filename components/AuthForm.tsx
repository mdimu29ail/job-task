'use client';

import { supabase } from '@/libs/supabase-client';
import { useState } from 'react';
// import { supabase } from '../lib/supabase-client';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(
          'Sign-up successful! Please check your email to verify your account.'
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Login successful!');
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin, // redirect back to your app after login
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', textAlign: 'center' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

      <form
        onSubmit={handleAuth}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 10 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            color: 'blue',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>

      <hr style={{ margin: '20px 0' }} />

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          padding: 10,
          width: '100%',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Connecting...' : 'Continue with Google'}
      </button>

      {message && <p style={{ marginTop: 15, color: 'gray' }}>{message}</p>}
    </div>
  );
}
