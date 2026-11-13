function About() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold text-dark">About HandleHunt</h1>
      <p className="mb-4 text-lg text-gray-700">
        HandleHunt is a free tool that lets you check the availability of a username across
        multiple social media platforms at once. No more visiting each site individually!
      </p>
      <h2 className="mb-2 text-xl font-semibold text-dark">How it works</h2>
      <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-700">
        <li>Enter your desired username in the search box.</li>
        <li>Click <strong>Search</strong> — we check GitHub, Reddit, and more in parallel.</li>
        <li>See a ✔️ or ❌ for each platform instantly.</li>
      </ol>
      <h2 className="mb-2 text-xl font-semibold text-dark">Supported Platforms</h2>
      <ul className="list-inside list-disc space-y-1 text-gray-700">
        <li>GitHub</li>
        <li>Reddit</li>
        <li>More coming soon…</li>
      </ul>
    </div>
  );
}

export default About;

