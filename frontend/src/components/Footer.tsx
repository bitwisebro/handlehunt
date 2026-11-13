import React from "react";
import { Compass, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white py-12 text-slate-600 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-bold text-slate-900">HandleHunt</span>
          <span className="text-slate-400">· Free & Open Source Handle Finder</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Checker
          </Link>
          <Link to="/about" className="hover:text-slate-900 transition-colors">
            About
          </Link>
          <Link to="/faqs" className="hover:text-slate-900 transition-colors">
            FAQs
          </Link>
          <a
            href="https://github.com/bitwisebro/handlehunt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1">
          Built for creators & developers worldwide
        </div>
      </div>
    </footer>
  );
};

