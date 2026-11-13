import React from "react";
import { Sparkles, ShieldCheck, Zap, Globe, Layers } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>About HandleHunt</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          One identity. Every platform.
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Securing a consistent handle across the web shouldn't require opening dozens of browser tabs.
        </p>
      </div>

      {/* Grid of features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-1">Instant Verification</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our Cloudflare Worker checks platform availability asynchronously without browser CORS restrictions or rate limits.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-1">Extensible Architecture</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Designed to scale effortlessly to 50+ services spanning developer portfolios, social networks, gaming, and content hubs.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-1">Privacy Focused</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We don't track your search queries or log your chosen handles. Your searches remain strictly in your local browser storage.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-1">100% Free & Open Source</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Built with modern React, Vite, Tailwind CSS, and Cloudflare Workers. Anyone can contribute or run their own instance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
