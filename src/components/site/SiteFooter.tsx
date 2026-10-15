import { Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import logo from "@/assets/sv-logo.png";

const columns = [
  {
    title: "Services",
    links: [
      { to: "/services", hash: "portfolio", label: "Portfolio management" },
      { to: "/services", hash: "retirement", label: "Retirement planning" },
      { to: "/services", hash: "research", label: "Market research" },
      { to: "/services", hash: "advisory", label: "Wealth advisory" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Sherman Ventures" },
      { to: "/contact", label: "Contact an advisor" },
      { to: "/privacy", label: "Privacy policy" },
    ],
  },
  {
    title: "Clients",
    links: [
      { to: "/portal", label: "Client portal" },
      { to: "/auth", label: "Log in" },
      { to: "/auth", search: { mode: "signup" as const }, label: "Open an account" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <img src={logo} alt="Sherman Ventures LLC" className="h-12 w-auto" width={176} height={60} loading="lazy" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Investment guidance for individuals, families and businesses who want their capital to work harder, with less noise.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground"><Lock className="size-3.5" /> Encrypted at rest and in transit</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground"><ShieldCheck className="size-3.5" /> GDPR-ready data handling</span>
          </div>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-foreground">{c.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    {...("hash" in l ? { hash: l.hash } : {})}
                    {...("search" in l ? { search: l.search } : {})}
                    className="link-underline transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="container-x flex flex-col gap-3 py-6 text-xs leading-relaxed text-muted-foreground md:flex-row md:items-start md:justify-between">
          <p>© {new Date().getFullYear()} Sherman Ventures LLC. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. Figures shown on this site are illustrative unless stated otherwise.
          </p>
        </div>
      </div>
    </footer>
  );
}
