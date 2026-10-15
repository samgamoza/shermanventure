import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Illustrative product panels. They look like the client portal but every
  number is a sample — the site says so wherever a panel appears.
*/

export function Window({ title, children, className }: { title: string; children: ReactNode; className?: string | undefined }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lift", className)}>
      <div className="flex items-center gap-2 border-b bg-secondary/70 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs font-medium text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Sparkline({ points, className, id = "spark" }: { points: number[]; className?: string; id?: string }) {
  const w = 320, h = 96, max = Math.max(...points) * 1.08, min = Math.min(...points) * 0.92;
  const d = points.map((y, i) => `${(i / (points.length - 1)) * w},${h - ((y - min) / (max - min)) * h}`).join(" L ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-24 w-full", className)} aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${d} L ${w},${h} L 0,${h} Z`} fill={`url(#${id})`} />
      <path d={`M ${d}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="animate-draw" />
    </svg>
  );
}

const holdings = [
  { k: "Global equities", v: 58, a: 744_045 },
  { k: "Fixed income", v: 27, a: 346_831 },
  { k: "Alternatives", v: 15, a: 193_684 },
];

export function PortfolioPanel({ className }: { className?: string }) {
  return (
    <Window title="Portfolio overview — sample account" className={className}>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total value</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-primary sm:text-4xl">{fmt(1_284_560)}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
            <ArrowUpRight className="size-3.5" /> 23.4% this year
          </span>
        </div>
        <div className="mt-3 text-primary"><Sparkline id="pf" points={[61, 64, 62, 70, 68, 76, 74, 83, 80, 88, 86, 94]} /></div>
        <div className="mt-4 grid gap-3">
          {holdings.map((h) => (
            <div key={h.k}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{h.k}</span>
                <span className="text-muted-foreground">{h.v}% · {fmt(h.a)}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${h.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

export function PlanPanel({ className }: { className?: string }) {
  const goal = 2_500_000, now = 1_284_560;
  const pct = Math.round((now / goal) * 100);
  return (
    <Window title="Retirement plan — sample" className={className}>
      <div className="p-5 sm:p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Goal by 2041</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-primary">{fmt(goal)}</p>
          </div>
          <p className="text-sm font-semibold text-success">{pct}% funded</p>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-brand" style={{ width: `${pct}%` }} />
        </div>
        <ul className="mt-6 grid gap-3 text-sm">
          {[
            ["Monthly contribution", "$4,500", "On track"],
            ["Projected shortfall", "$0", "Covered"],
            ["Next review", "12 Nov", "Scheduled"],
          ].map(([k, v, s]) => (
            <li key={k} className="flex items-center justify-between rounded-xl bg-secondary/70 px-4 py-3">
              <span className="text-muted-foreground">{k}</span>
              <span className="flex items-center gap-3 font-semibold">{v}<span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">{s}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

const movers = [
  ["Semiconductors", "+2.4%", true],
  ["Healthcare", "+1.1%", true],
  ["Energy", "-0.6%", false],
  ["Industrials", "+0.3%", true],
] as const;

export function ResearchPanel({ className }: { className?: string }) {
  return (
    <Window title="Market research — sector view" className={className}>
      <div className="grid gap-5 p-5 sm:grid-cols-[1.2fr_1fr] sm:p-6">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Sector momentum, 30 days</p>
          <div className="mt-3 flex h-32 items-end gap-2">
            {[42, 55, 48, 70, 64, 78, 60, 86, 74, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-primary/85" style={{ height: `${h}%`, opacity: 0.45 + (i / 10) * 0.55 }} />
            ))}
          </div>
        </div>
        <ul className="divide-y text-sm">
          {movers.map(([k, v, up]) => (
            <li key={k} className="flex items-center justify-between py-2.5">
              <span className="font-medium">{k}</span>
              <span className={cn("inline-flex items-center gap-1 font-semibold", up ? "text-success" : "text-destructive")}>
                {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}{v}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

export function PortalPanel({ className }: { className?: string }) {
  return (
    <Window title="Client portal — documents" className={className}>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Shared with you</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"><ShieldCheck className="size-3.5 text-success" /> Encrypted</span>
        </div>
        <ul className="mt-4 divide-y text-sm">
          {[
            ["Q3 performance report", "PDF · 1.2 MB", "Today"],
            ["Investment policy statement", "PDF · 420 KB", "2 Oct"],
            ["Fee schedule 2026", "PDF · 96 KB", "14 Sep"],
          ].map(([t, m, d]) => (
            <li key={t} className="flex items-center gap-3 py-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-secondary text-primary"><FileText className="size-4" /></span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{t}</span>
                <span className="block text-xs text-muted-foreground">{m}</span>
              </span>
              <span className="text-xs text-muted-foreground">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}
