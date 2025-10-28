'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase-client';
import { useRouter } from 'next/navigation';
import { supabase } from '../libs/supabase-client';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!mounted) return null; // prevent hydration issues

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">MyApp</Link>
      </div>

      {/* Center: Links */}
      <div className="flex gap-10">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link href="/task" className="hover:text-blue-600">
          Task
        </Link>
        {session && (
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
        )}
        {session && (
          <Link href="/addTopic" className="hover:text-blue-600">
            Add Task
          </Link>
        )}
      </div>

      {/* Right: Profile / Login */}
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <span>{session.user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
