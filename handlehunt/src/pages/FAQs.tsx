function FAQs() {
  const faqs = [
    {
      q: "Is HandleHunt free to use?",
      a: "Yes — HandleHunt is completely free and open-source.",
    },
    {
      q: "How does the username check work?",
      a: "We query each platform's public API to see whether the username already exists. If it doesn't, it's marked as available.",
    },
    {
      q: "Which platforms are supported?",
      a: "Currently GitHub and Reddit. We're working on adding Twitter, Instagram, and more.",
    },
    {
      q: "Is my data stored anywhere?",
      a: "No. Your search is only saved in your browser's local storage for convenience. We don't store any personal data on our servers.",
    },
    {
      q: "Can I contribute?",
      a: "Absolutely! Check out our GitHub repository and feel free to open a pull request.",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold text-dark">Frequently Asked Questions</h1>
      <div className="space-y-5">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="mb-1 font-semibold text-dark">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;

