'use client';

import { useState } from 'react';

interface Joke {
  setup?: string;
  delivery?: string;
  joke?: string;
  type: string;
}

export default function JokePage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError('Failed to load joke. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">😂 Joke Generator</h1>
          <p className="text-slate-600">Get a random joke to brighten your day!</p>
        </div>

        {/* Joke Display */}
        <div className="bg-slate-50 rounded-lg p-6 min-h-32 mb-6 flex items-center justify-center">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading a joke...</p>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : joke ? (
            <div className="text-center">
              {joke.setup && (
                <>
                  <p className="text-lg text-slate-800 mb-4 font-medium">{joke.setup}</p>
                  <p className="text-xl text-blue-600 font-bold">{joke.delivery}</p>
                </>
              )}
              {joke.joke && (
                <p className="text-lg text-slate-800">{joke.joke}</p>
              )}
            </div>
          ) : (
            <p className="text-slate-500 text-center">Click the button to get a joke!</p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={fetchJoke}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          {loading ? 'Loading...' : 'Get Another Joke'}
        </button>

        {/* Info */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Powered by Official Joke API
        </p>
      </div>
    </div>
  );
}
