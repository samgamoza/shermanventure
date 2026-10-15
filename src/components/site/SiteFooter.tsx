import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">Sherman Ventures LLC</p>
          <p className="mt-3 max-w-sm text-sm text-ink-foreground/70">
            Investing in tomorrow, building lasting value.
          </p>
        </div>
        <div>
          <p className="eyebrow text-silver">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            <li><Link to="/services" className="hover:text-ink-foreground">Services</Link></li>
            <li><Link to="/about" className="hover:text-ink-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-ink-foreground">Contact an advisor</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-silver">Clients</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            <li><Link to="/portal" className="hover:text-ink-foreground">Client portal</Link></li>
            <li><Link to="/privacy" className="hover:text-ink-foreground">Privacy policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-ink-foreground/60 sm:px-8">
          © {new Date().getFullYear()} Sherman Ventures LLC. All rights reserved. Investing involves risk, including possible loss of principal. Past performance does not guarantee future results.
        </p>
      </div>
    </footer>
  );
}
