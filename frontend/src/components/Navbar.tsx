import React from "react";
import { NavLink } from "react-router-dom";
import { Compass } from "lucide-react";
import { PlatformIcon } from "./PlatformIcon";

const Navbar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
      isActive
        ? "bg-slate-100 text-slate-900 font-semibold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Compass className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Handle<span className="text-blue-600">Hunt</span>
            </span>
          </div>
        </NavLink>

        {/* Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/faqs" className={linkClass}>
            FAQs
          </NavLink>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* GitHub Link */}
          <a
            href="https://github.com/yourusername/handlehunt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors ml-1"
          >
            <PlatformIcon type="github" size={14} className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
