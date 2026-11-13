import React, { useState } from "react";
import { PlatformConfig } from "../config/platforms";
import { PlatformIcon } from "./PlatformIcon";
import { Check, X, ExternalLink, Copy, CheckCheck, Loader2, AlertCircle } from "lucide-react";

export interface PlatformCheckState {
  available?: boolean;
  error?: string;
  loading?: boolean;
}

interface PlatformCardProps {
  platform: PlatformConfig;
  username: string;
  checkState?: PlatformCheckState;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  username,
  checkState,
}) => {
  const [copied, setCopied] = useState(false);

  const hasSearched = Boolean(username.trim());
  const profileUrl = hasSearched ? platform.profileUrl(username.trim()) : "#";
  const claimUrl = platform.claimUrl(username.trim());

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!profileUrl || profileUrl === "#") return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (!hasSearched) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          Ready to check
        </span>
      );
    }

    if (checkState?.loading) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600 animate-pulse">
          <Loader2 className="h-3 w-3 animate-spin" />
          Checking...
        </span>
      );
    }

    if (!platform.isAutomated) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
          Manual check
        </span>
      );
    }

    if (checkState?.error) {
      return (
        <span
          className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700"
          title={checkState.error}
        >
          <AlertCircle className="h-3 w-3" />
          Rate limited
        </span>
      );
    }

    if (checkState?.available) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
          Available
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
        <X className="h-3.5 w-3.5 text-rose-600 stroke-[3]" />
        Taken
      </span>
    );
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        checkState?.available
          ? "border-emerald-200 hover:border-emerald-300 ring-1 ring-emerald-100"
          : checkState?.available === false
          ? "border-slate-200 hover:border-slate-300 opacity-95"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div>
        {/* Top Header: Platform Icon + Name + Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
              style={{
                backgroundColor: `${platform.color}15`,
                color: platform.color,
              }}
            >
              <PlatformIcon type={platform.iconType} size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                  {platform.name}
                </h4>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  {platform.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{platform.description}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Username Preview */}
        <div className="mt-4 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600 font-mono flex items-center justify-between border border-slate-100">
          <span className="truncate pr-2">
            {hasSearched ? (
              <span className="text-slate-800 font-medium">@{username.trim()}</span>
            ) : (
              <span className="text-slate-400">@yourname</span>
            )}
          </span>
          {hasSearched && (
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-700 transition-colors shrink-0"
              title="Copy URL"
            >
              {copied ? (
                <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {checkState?.available ? (
          <a
            href={claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow"
          >
            Claim Handle
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : hasSearched && checkState?.available === false ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 font-medium text-slate-700 transition-all hover:bg-slate-200"
          >
            View Taken Profile
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <a
            href={hasSearched ? profileUrl : claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 transition-all hover:bg-slate-50"
          >
            {hasSearched ? "Check On " + platform.name : "Visit " + platform.name}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

