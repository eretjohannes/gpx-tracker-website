import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GPX Tracker",
  description: "Offline motorcycle GPX navigation.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="shell">
          <SiteHeader />
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
