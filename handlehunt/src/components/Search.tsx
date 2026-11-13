import React, { useState, useEffect } from "react";
import { checkUsername, type PlatformResult } from "../api/client";
import ResultCard from "./ResultCard";

function Search() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<PlatformResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setUsername(saved);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim()) return;

    setError(null);
    setLoading(true);
    setShowResult(false);
    localStorage.setItem("username", username);

    try {
      const data = await checkUsername(username);
      setResults(data.results);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to check usernames. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center">
          <img src="/github.svg" alt="Logo" className="mb-2 h-10 w-10 opacity-85" />
          <h3 className="text-xl font-semibold tracking-wide text-dark">HandleHunt</h3>
          <p className="text-sm text-accent">Check username availability instantly</p>
        </div>

        {/* Search form */}
        <form className="mb-5 flex gap-2" onSubmit={handleSubmit}>
          <input
            className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-dark shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-accent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search a username..."
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        <hr className="mb-4 border-gray-200" />

        {/* Error */}
        {error && <p className="mb-3 text-center text-sm text-red-500">{error}</p>}

        {/* Results */}
        {showResult && <ResultCard results={results} />}
      </div>
    </div>
  );
}

export default Search;
