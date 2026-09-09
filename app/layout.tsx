import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPX Tracker",
  description: "Offline motorcycle GPX navigation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <div className="main">{children}</div>
          <footer className="footer">
            <ul className="footer-links">
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/support">Support</Link>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
}
