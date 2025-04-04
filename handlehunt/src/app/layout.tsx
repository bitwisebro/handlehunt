import "bootstrap/dist/css/bootstrap.css";
// import "./globals.css";
import type { Metadata } from "next";
import "./styles.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HandleHunt - Check usernames on Social Media",
  description: "Check availability of desired usernames on Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="top-nav navbar bg-primary" data-bs-theme="dark">
          <div className="nav-text-large">HandleHunt</div>
          <ul className="nav-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
          </ul>
        </nav>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
