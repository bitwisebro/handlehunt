import React, { useState, useEffect } from "react";
import { Search, Loader2, Sparkles, Filter, Copy, CheckCheck, RefreshCw, X } from "lucide-react";
import { PLATFORMS, CATEGORIES, PlatformConfig } from "../config/platforms";
import { PlatformCard, PlatformCheckState } from "./PlatformCard";
import { checkUsername } from "../api/client";

const SUGGESTIONS = ["devninja", "cloudcrafter", "pixelsmith", "solobuilder", "cybernaut"];

export const SearchHero: React.FC = () => {
  const [username, setUsername] = useState("");
  const [submittedUser, setSubmittedUser] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedAvailable, setCopiedAvailable] = useState<boolean>(false);
  const [checkResults, setCheckResults] = useState<Record<string, PlatformCheckState>>({});

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) {
      setUsername(saved);
    }
  }, []);

  const triggerCheck = async (name: string) => {
    const clean = name.trim();
    if (!clean) return;

    setSubmittedUser(clean);
    localStorage.setItem("username", clean);
    setLoading(true);

    // Set initial loading states for automated platforms
    const initialStates: Record<string, PlatformCheckState> = {};
    PLATFORMS.forEach((p) => {
      initialStates[p.id] = {
        loading: p.isAutomated,
      };
    });
    setCheckResults(initialStates);

    try {
      const response = await checkUsername(clean);
      const results = Array.isArray(response?.results) ? response.results : [];

      setCheckResults((prev) => {
        const next = { ...prev };
        results.forEach((r) => {
          if (!r || !r.platform) return;
          const platformId = r.platform.toLowerCase();
          next[platformId] = {
            loading: false,
            available: r.available,
            error: r.error,
          };
        });
        return next;
      });
    } catch (err: any) {
      console.error("Check failed:", err);
      // Mark automated platforms as error
      setCheckResults((prev) => {
        const next = { ...prev };
        PLATFORMS.filter((p) => p.isAutomated).forEach((p) => {
          next[p.id] = {
            loading: false,
            error: err.message || "Failed to reach API",
          };
        });
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCheck(username);
  };

  const handleSuggestionClick = (name: string) => {
    setUsername(name);
    triggerCheck(name);
  };

  // Filtered platforms
  const filteredPlatforms = PLATFORMS.filter((p) => {
    // Category filter
    if (activeCategory !== "all" && p.category !== activeCategory) {
      return false;
    }
    // Only available filter
    if (onlyAvailable) {
      const state = checkResults[p.id];
      if (!state?.available) return false;
    }
    // Search query filter inside platform grid
    if (searchFilter.trim()) {
      const query = searchFilter.toLowerCase();
      return p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
    }
    return true;
  });

  // Calculate metrics
  const totalPlatforms = PLATFORMS.length;
  const availableCount = Object.values(checkResults).filter((r) => r.available === true).length;
  const takenCount = Object.values(checkResults).filter((r) => r.available === false).length;

  const handleCopyAvailable = () => {
    if (!submittedUser) return;
    const availablePlatforms = PLATFORMS.filter((p) => checkResults[p.id]?.available === true);
    if (availablePlatforms.length === 0) return;

    const text = availablePlatforms
      .map((p) => `${p.name}: ${p.claimUrl(submittedUser)}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAvailable(true);
    setTimeout(() => setCopiedAvailable(false), 2000);
  };

  return (
    <div className="w-full">
      {/* ─── Hero Header ───────────────────────────────────────────── */}
      <div className="relative py-12 md:py-16 text-center">
        {/* Glow decoration */}
        <div className="pointer-events-none absolute left-1/2 -top-12 -translate-x-1/2 h-72 w-full max-w-2xl bg-gradient-to-r from-blue-400/20 via-indigo-500/20 to-purple-400/20 blur-3xl opacity-60 rounded-full" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur mb-6">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>Real-time Handle & Username Discovery</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-3xl mx-auto">
          Hunt your dream handle across the{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            entire internet
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl mx-auto">
          Instantly check handle availability on GitHub, Reddit, X, YouTube, and more with zero friction.
        </p>

        {/* ─── Search Bar ────────────────────────────────────────────── */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="group relative flex items-center rounded-2xl bg-white p-2 shadow-xl shadow-slate-200/50 border border-slate-200/80 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
          >
            {/* Input prefix */}
            <div className="flex items-center pl-3 pr-2 text-slate-400 select-none">
              <span className="font-mono text-xl font-bold text-slate-400">@</span>
            </div>

            {/* Main Input */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (e.g. yourname)"
              className="w-full bg-transparent py-2.5 text-base md:text-lg font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
              autoFocus
            />

            {/* Clear button */}
            {username && (
              <button
                type="button"
                onClick={() => setUsername("")}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors mr-1"
                title="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 stroke-[2.5]" />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>

          {/* Suggestions row */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-2 text-xs text-slate-500">
            <span>Popular ideas:</span>
            {SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSuggestionClick(sug)}
                className="rounded-full bg-white/80 border border-slate-200/80 px-2.5 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                @{sug}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Search Results & Filter Controls ───────────────────────── */}
      <div className="mt-4">
        {/* Metric Overview Bar */}
        {submittedUser && (
          <div className="mb-6 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-4 text-sm">
              <span className="font-semibold text-slate-900">
                Checking handle: <span className="font-mono text-blue-600 font-bold">@{submittedUser}</span>
              </span>
              <div className="h-4 w-px bg-slate-200 hidden md:block" />
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {availableCount} Available
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                {takenCount} Taken
              </span>
              <span className="text-xs text-slate-500">
                {totalPlatforms} platforms supported
              </span>
            </div>

            {availableCount > 0 && (
              <button
                type="button"
                onClick={handleCopyAvailable}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {copiedAvailable ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>Copy Available URLs</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Filter Navigation & Search Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
          {/* Category Chips */}
          <div className="flex items-center overflow-x-auto pb-2 md:pb-0 gap-1.5 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2">
            {/* Filter by availability */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium border transition-colors ${onlyAvailable
                ? "border-emerald-300 bg-emerald-50 text-emerald-700 font-semibold"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Filter className="h-3 w-3" />
              <span>Available Only</span>
            </button>

            {/* In-page platform filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter services..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-36 md:w-44 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Scalable Platform Grid ─────────────────────────────────── */}
        {filteredPlatforms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm font-medium text-slate-600">No platforms match your filter.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setOnlyAvailable(false);
                setSearchFilter("");
              }}
              className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                username={submittedUser}
                checkState={checkResults[platform.id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

