import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Check, LineChart, PiggyBank, Search } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { PlanPanel, PortalPanel, PortfolioPanel, ResearchPanel } from "@/components/site/Mockups";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Sherman Ventures LLC" },
      { name: "description", content: "Portfolio management, retirement planning, market research and wealth advisory from Sherman Ventures LLC." },
      { property: "og:title", content: "Services — Sherman Ventures LLC" },
      { property: "og:description", content: "Portfolio management, retirement planning, market research and wealth advisory." },
    ],
  }),
  component: Services,
});

const services = [
  {
    id: "portfolio",
    icon: Briefcase,
    title: "Portfolio management",
    lead: "A diversified portfolio built around your goals, managed day to day and reviewed with you every quarter.",
    points: ["Written investment policy agreed before a single trade", "Global equities, fixed income and alternatives, sized to your risk limits", "Performance reported net of fees against a benchmark you chose", "Rebalancing, drift and liquidity handled by your advisor"],
    Panel: PortfolioPanel,
    forWho: "Investors with $250k or more who want professional management without losing sight of what is happening.",
  },
  {
    id: "retirement",
    icon: PiggyBank,
    title: "Retirement planning",
    lead: "A target date, a target number and the contribution schedule that gets you there, updated as life moves.",
    points: ["Cash-flow modelling across pensions, savings and property", "Tax-aware withdrawal sequencing", "Projections re-run every quarter, shortfalls flagged early", "A plan your family can read and understand"],
    Panel: PlanPanel,
    forWho: "Anyone within 25 years of retirement, and business owners planning an exit.",
  },
  {
    id: "research",
    icon: Search,
    title: "Market research",
    lead: "Sector and market insight distilled into the few decisions that actually affect your portfolio.",
    points: ["Daily momentum across sectors and regions", "Short written views on what changed and what we are doing about it", "Thematic briefs on energy transition, AI infrastructure and private credit", "No noise: nothing that does not touch your holdings"],
    Panel: ResearchPanel,
    forWho: "Clients who want to understand the reasoning, not just the result.",
  },
  {
    id: "advisory",
    icon: LineChart,
    title: "Wealth advisory",
    lead: "One-on-one guidance on structure, liquidity, tax and the transfer of wealth between generations.",
    points: ["Entity and trust structuring with your legal and tax advisers", "Concentrated-stock and liquidity-event planning", "Charitable giving and family governance", "Everything documented and shared in your encrypted portal"],
    Panel: PortalPanel,
    forWho: "Families, founders and executives with complex balance sheets.",
  },
] as const;

const fees = [
  { tier: "Advisory", range: "Up to $1M", fee: "1.00%", note: "Annual fee on assets under management, billed quarterly." },
  { tier: "Private", range: "$1M – $5M", fee: "0.75%", note: "Includes retirement planning and annual tax-aware review." },
  { tier: "Family office", range: "$5M+", fee: "Custom", note: "Multi-entity structuring, governance and reporting." },
];

function Services() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Expertise for every stage of your financial life."
        intro="Four services that work as one plan. Start with the one you need; add the rest when it makes sense."
        actions={
          <>
            <Button asChild variant="brand" size="lg"><Link to="/contact">Talk to an advisor <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg"><a href="#fees">See fees</a></Button>
          </>
        }
      />

      <nav aria-label="Services on this page" className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur md:top-24">
        <div className="container-x flex gap-1 overflow-x-auto py-2">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">{s.title}</a>
          ))}
          <a href="#fees" className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">Fees</a>
        </div>
      </nav>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={cn("scroll-mt-40 py-20 md:py-28", i % 2 === 1 && "bg-secondary/60")}>
          <div className={cn("container-x grid items-center gap-12 lg:grid-cols-2", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
            <Reveal>
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><s.icon className="size-6" /></span>
              <h2 className="type-headline mt-6 text-primary">{s.title}</h2>
              <p className="type-lead mt-4">{s.lead}</p>
              <ul className="mt-7 grid gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Check className="size-3" strokeWidth={3} /></span>{p}
                  </li>
                ))}
              </ul>
              <p className="mt-7 rounded-xl border-l-2 border-brand bg-card px-4 py-3 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Best for: </span>{s.forWho}</p>
              <Button asChild variant="outline" className="mt-8"><Link to="/contact">Ask about {s.title.toLowerCase()} <ArrowRight /></Link></Button>
            </Reveal>
            <Reveal delay={100} className="relative">
              <div className="bg-dots absolute -inset-8 -z-10" aria-hidden />
              <s.Panel />
              <p className="mt-3 text-center text-xs text-muted-foreground">Sample data for illustration.</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section id="fees" className="scroll-mt-40 border-t py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="type-kicker">Fees</p>
            <h2 className="type-headline mt-3 text-primary">One fee. No commissions, no surprises.</h2>
            <p className="type-lead mt-4">We are paid only by you, as a percentage of what we manage. Fees are shown before you sign anything and appear on every quarterly report.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {fees.map((f, i) => (
              <Reveal key={f.tier} delay={i * 80}>
                <div className={cn("flex h-full flex-col rounded-2xl border p-7", i === 1 ? "border-primary bg-primary text-primary-foreground shadow-lift" : "bg-card")}>
                  <p className={cn("text-sm font-semibold", i === 1 ? "text-primary-foreground/80" : "text-muted-foreground")}>{f.tier}</p>
                  <p className="mt-4 text-4xl font-bold tracking-tight">{f.fee}</p>
                  <p className={cn("mt-1 text-sm", i === 1 ? "text-primary-foreground/80" : "text-muted-foreground")}>{f.range}</p>
                  <p className={cn("mt-5 flex-1 text-sm leading-relaxed", i === 1 ? "text-primary-foreground/85" : "text-muted-foreground")}>{f.note}</p>
                  <Button asChild variant={i === 1 ? "inverse" : "outline"} className="mt-7"><Link to="/contact">Get a quote</Link></Button>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Fee tiers are indicative and confirmed in writing before engagement. Custodian and fund expenses are separate and disclosed.</p>
        </div>
      </section>
    </>
  );
}
