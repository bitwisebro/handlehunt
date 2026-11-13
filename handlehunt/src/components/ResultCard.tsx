import type { PlatformResult } from "../api/client";

const platformIcons: Record<string, string> = {
  GitHub: "/github.svg",
  Reddit: "/reddit.svg",
};

interface ResultCardProps {
  results: PlatformResult[];
}

const ResultCard: React.FC<ResultCardProps> = ({ results }) => {
  return (
    <div className="flex items-center justify-around">
      {results.map((result) => (
        <div key={result.platform} className="flex flex-col items-center gap-1">
          <img
            src={platformIcons[result.platform] ?? "/github.svg"}
            alt={`${result.platform} logo`}
            className="h-12 w-12"
          />
          <p className="text-sm font-medium text-dark">{result.platform}</p>
          {result.error ? (
            <span className="text-xs text-yellow-600" title={result.error}>⚠️</span>
          ) : result.available ? (
            <span className="text-lg text-green-500">✔️</span>
          ) : (
            <span className="text-lg text-red-500">❌</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultCard;

