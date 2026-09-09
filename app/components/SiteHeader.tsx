import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="logo-link" aria-label="GPX Tracker home">
        <img src="/images/logo.png" alt="" width={48} height={48} />
      </Link>
    </header>
  );
}
