import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    q: "Is HandleHunt completely free?",
    a: "Yes! HandleHunt is 100% free and open-source. There are no paywalls, subscriptions, or hidden charges.",
  },
  {
    q: "How does HandleHunt check if a handle is available?",
    a: "We query platform APIs directly via our secure Cloudflare serverless worker. If a profile doesn't exist (e.g. 404 response on GitHub or false on Reddit's availability API), the handle is classified as Available.",
  },
  {
    q: "Can I add support for more services?",
    a: "Yes! HandleHunt is designed with a scalable platform registry (src/config/platforms.ts). You can add any new service by simply adding its metadata, profile URL schema, and claim URL.",
  },
  {
    q: "Are my searches logged or sold to domain squatters?",
    a: "Never. Your searched queries stay in your browser's localStorage for convenience. The backend worker operates statelessly and does not save search logs.",
  },
  {
    q: "What should I do if a platform says 'Rate limited'?",
    a: "Some platforms enforce temporary rate limiting if queried too rapidly. Simply wait a minute or click 'Manual Check' to verify directly on the platform.",
  },
];

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Help & Answers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Everything you need to know about checking and claiming handles.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white transition-all overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
