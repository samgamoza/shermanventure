import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  LineChart,
  Lock,
  PiggyBank,
  Play,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { PlanPanel, PortalPanel, PortfolioPanel, ResearchPanel } from "@/components/site/Mockups";

const OG = "https://images.unsplash.com/photo-1644995722044-6cd197ffb440?auto=format&fit=crop&w=1920&q=75";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sherman Ventures LLC — Investment management and wealth advisory" },
      { name: "description", content: "Portfolio management, retirement planning, research and advisory for individuals, families and businesses, with a secure client portal." },
      { property: "og:title", content: "Sherman Ventures LLC — The investment partner for ambitious wealth" },
      { property: "og:description", content: "Expert investment guidance, personalized strategies and a secure client portal." },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
    ],
  }),
  component: Home,
});

const services = [
  { id: "portfolio", icon: Briefcase, title: "Portfolio management", body: "Actively managed portfolios built around your goals and risk tolerance, reviewed with you every quarter." },
  { id: "retirement", icon: PiggyBank, title: "Retirement planning", body: "A funded plan with a clear target date, contribution schedule and projections you can follow year by year." },
  { id: "research", icon: Search, title: "Market research", body: "Institutional-grade sector and market insight, distilled into the handful of decisions that matter for you." },
  { id: "advisory", icon: LineChart, title: "Wealth advisory", body: "One-on-one guidance on diversification, liquidity, tax-aware structuring and long-term wealth transfer." },
] as const;

const coverage = [
  "Global equities", "Fixed income", "Private credit", "Real assets", "Cash management", "Retirement accounts",
  "Trusts and estates", "Business owners", "Multi-currency", "Quarterly reviews",
];

const steps = [
  { t: "Discovery", b: "A 45-minute conversation about where you are, what you want your money to do and what keeps you up at night." },
  { t: "Plan", b: "A written investment policy: allocation, risk limits, liquidity needs and the milestones we will measure against." },
  { t: "Implement", b: "We build the portfolio, set up your encrypted portal and agree how often you want to hear from us." },
  { t: "Review", b: "Quarterly reviews in plain language. When life changes, the plan changes with it." },
];

const testimonials = [
  { quote: "Sherman Ventures transformed my investment approach. Their personalized strategy helped me achieve a 23.4% return last year while maintaining a balanced risk profile. The team is responsive and truly understands market dynamics.", name: "Maya Chen", role: "Portfolio Manager" },
  { quote: "After years of managing my own investments, I finally found advisors who match my ambition. The portfolio management service is exceptional, and the quarterly reviews keep me informed without overwhelming detail.", name: "Raj Patel", role: "Entrepreneur" },
  { quote: "I was skeptical about switching firms, but Sherman Ventures exceeded every expectation. Their retirement planning expertise gave me confidence, and my portfolio has grown steadily while preserving capital.", name: "Lucia Torres", role: "Retired Executive" },
  { quote: "The market research insights are invaluable. Sherman Ventures helped me diversify beyond tech stocks into emerging sectors I would never have considered. My portfolio is now resilient and growth-oriented.", name: "Kwame Asante", role: "Tech Founder" },
];

const faqs = [
  { q: "Is there a minimum to open an account?", a: "There is no minimum to open an account or to speak with an advisor. Some managed strategies have their own minimums, which we explain before you commit to anything." },
  { q: "How are you paid?", a: "We charge a transparent advisory fee based on the assets we manage for you. We do not earn commissions on products, so our only incentive is your long-term result." },
  { q: "How often will I hear from you?", a: "You get a formal review every quarter and a written annual plan update. In between, your advisor is one message away in the client portal." },
  { q: "How is my data protected?", a: "Everything in the client portal is encrypted in transit and at rest, access is scoped so you only ever see your own records, and you can export or delete your data yourself at any time." },
  { q: "Can I keep my existing accounts?", a: "Often, yes. We review what you already hold and only recommend moving assets where it clearly improves cost, diversification or simplicity." },
];

function Home() {
  return (
    <>
      <Hero />
      <CoverageStrip />
      <WhySection />
      <PlatformTabs />
      <Process />
      <Calculator />
      <StatsBand />
      <Testimonials />
      <Faq />
      <ClosingCta />
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-x grid items-center gap-14 pb-16 pt-12 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div>
          <h1 className="animate-hero type-display text-primary">
            The investment partner for ambitious wealth.
          </h1>
          <p className="animate-hero type-lead mt-6 max-w-xl" style={{ animationDelay: "80ms" }}>
            Sherman Ventures manages portfolios, plans retirements and advises families and business owners, with every number visible in one secure client portal.
          </p>
          <form
            className="animate-hero mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "160ms" }}
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/auth", search: { mode: "signup", email: email.trim() || undefined } });
            }}
          >
            <Label htmlFor="hero-email" className="sr-only">Work or personal email</Label>
            <Input
              id="hero-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-13 flex-1 rounded-full border-primary/20 px-5 text-base shadow-none focus-visible:border-primary focus-visible:ring-2"
            />
            <Button type="submit" variant="brand" size="lg">Get started <ArrowRight /></Button>
          </form>
          <div className="animate-hero mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground" style={{ animationDelay: "220ms" }}>
            <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-primary">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-secondary"><Play className="size-3.5 fill-current" /></span>
              Take a product tour
            </Link>
            <span className="inline-flex items-center gap-1.5"><Lock className="size-4" /> No obligation, no minimum to start</span>
          </div>
        </div>

        <div className="animate-hero relative" style={{ animationDelay: "140ms" }}>
          <div className="bg-dots absolute -inset-10 -z-10" aria-hidden />
          <PortfolioPanel className="relative" />
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border bg-card px-4 py-3 shadow-lift sm:flex sm:items-center sm:gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand"><CalendarCheck className="size-4" /></span>
            <span>
              <span className="block text-xs text-muted-foreground">Next quarterly review</span>
              <span className="block text-sm font-semibold">Thu, 12 Nov · with your advisor</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverageStrip() {
  return (
    <section className="border-y bg-secondary/60 py-6" aria-label="What we cover">
      <p className="container-x text-center text-sm text-muted-foreground">Built for individuals, families and business owners across every stage of wealth</p>
      <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 whitespace-nowrap px-3">
          {[...coverage, ...coverage].map((c, i) => (
            <span key={i} className="rounded-full border bg-card px-4 py-2 text-sm font-medium text-foreground/80">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="type-kicker">Why Sherman Ventures</p>
        <h2 className="type-headline mt-3 text-primary">Four services, one plan, built around what your money is for.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <Link to="/services" hash={s.id} className="group flex h-full flex-col rounded-2xl border bg-card p-7 transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-card">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><s.icon className="size-6" /></span>
              <h3 className="mt-6 text-xl font-bold text-foreground">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{s.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                <span className="link-underline">Learn more</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const platform = [
  { id: "portfolio", label: "Portfolio", title: "A portfolio you can read at a glance", points: ["Live value and allocation across every account we manage", "Performance shown net of fees, against a benchmark you chose", "Rebalancing and drift alerts handled by your advisor"], Panel: PortfolioPanel },
  { id: "planning", label: "Planning", title: "A retirement plan that stays funded", points: ["A target date and number, with the contribution schedule to get there", "Projections updated as markets and your life move", "Shortfalls flagged early, never at the end"], Panel: PlanPanel },
  { id: "research", label: "Research", title: "Research that ends in a decision", points: ["Sector and market momentum, updated daily", "Short written views on what changed and what we are doing about it", "No noise: only what affects your portfolio"], Panel: ResearchPanel },
  { id: "portal", label: "Client portal", title: "Every document, encrypted and in one place", points: ["Reports, statements and agreements shared securely", "Export or delete your data yourself at any time", "Sign in with email or Google, protected end to end"], Panel: PortalPanel },
];

function PlatformTabs() {
  return (
    <section className="bg-secondary/60 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="type-kicker">The platform</p>
          <h2 className="type-headline mt-3 text-primary">Your wealth, on one platform.</h2>
          <p className="type-lead mt-4">Everything we do for you shows up in the client portal, so you are never guessing what happened or why.</p>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <Tabs defaultValue="portfolio">
            <TabsList className="mx-auto flex h-auto w-full max-w-2xl flex-wrap justify-center gap-1 rounded-full bg-card p-1.5 shadow-card">
              {platform.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="rounded-full px-5 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none">
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {platform.map((p) => (
              <TabsContent key={p.id} value={p.id} className="mt-10 animate-in fade-in-0 duration-500">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
                  <div>
                    <h3 className="type-title text-primary">{p.title}</h3>
                    <ul className="mt-6 grid gap-4">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/85">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />{pt}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-8"><Link to="/services" hash={p.id === "planning" ? "retirement" : p.id === "portal" ? "advisory" : p.id}>See the service <ArrowRight /></Link></Button>
                  </div>
                  <div className="relative">
                    <div className="bg-dots absolute -inset-8 -z-10" aria-hidden />
                    <p.Panel />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
        <p className="mt-8 text-center text-xs text-muted-foreground">Panels show sample data for illustration.</p>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.3fr]">
      <Reveal className="lg:sticky lg:top-32 lg:self-start">
        <p className="type-kicker">How we work</p>
        <h2 className="type-headline mt-3 text-primary">From first conversation to a funded plan in four steps.</h2>
        <p className="type-lead mt-4 max-w-md">No product pitches. The first meeting is about you; the plan comes after.</p>
        <Button asChild variant="brand" className="mt-8"><Link to="/contact">Book a discovery call <ArrowRight /></Link></Button>
      </Reveal>
      <ol className="grid gap-4">
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 80}>
            <li className="grid grid-cols-[3.5rem_1fr] gap-5 rounded-2xl border bg-card p-6 sm:p-7">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">{i + 1}</span>
              <div>
                <h3 className="text-xl font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.b}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Calculator() {
  const [initial, setInitial] = useState(25_000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(15);

  const series = useMemo(() => {
    const r = rate / 100 / 12;
    const out: { year: number; value: number; contributed: number }[] = [];
    let v = initial;
    for (let m = 1; m <= years * 12; m++) {
      v = v * (1 + r) + monthly;
      if (m % 12 === 0) out.push({ year: m / 12, value: v, contributed: initial + monthly * m });
    }
    if (years === 0) out.push({ year: 0, value: initial, contributed: initial });
    return out;
  }, [initial, monthly, rate, years]);
  const last = series[series.length - 1]!;
  const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const max = Math.max(...series.map((s) => s.value));

  return (
    <section className="bg-ink-gradient text-ink-foreground">
      <div className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.25fr]">
        <Reveal>
          <p className="type-kicker text-brand-soft">Plan it</p>
          <h2 className="type-headline mt-3">See what steady investing does over time.</h2>
          <p className="mt-4 max-w-md text-lg text-ink-foreground/70">Drag the sliders. The chart separates what you put in from what compounding adds. Estimates only, not a forecast.</p>
          <div className="mt-8 grid gap-6">
            <Control label="Starting amount" value={fmt(initial)}><Slider value={[initial]} min={0} max={500_000} step={1_000} onValueChange={([v]) => setInitial(v ?? 0)} aria-label="Starting amount" /></Control>
            <Control label="Monthly contribution" value={fmt(monthly)}><Slider value={[monthly]} min={0} max={10_000} step={50} onValueChange={([v]) => setMonthly(v ?? 0)} aria-label="Monthly contribution" /></Control>
            <Control label="Expected annual return" value={`${rate.toFixed(1)}%`}><Slider value={[rate]} min={0} max={15} step={0.5} onValueChange={([v]) => setRate(v ?? 0)} aria-label="Expected annual return" /></Control>
            <Control label="Years invested" value={`${years} yrs`}><Slider value={[years]} min={1} max={40} step={1} onValueChange={([v]) => setYears(v ?? 1)} aria-label="Years invested" /></Control>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-6 backdrop-blur sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3" aria-live="polite">
              <div><p className="text-xs text-ink-foreground/60">Projected value</p><p className="mt-1 text-3xl font-bold tracking-tight">{fmt(last.value)}</p></div>
              <div><p className="text-xs text-ink-foreground/60">You contributed</p><p className="mt-1 text-3xl font-bold tracking-tight text-ink-foreground/80">{fmt(last.contributed)}</p></div>
              <div><p className="text-xs text-ink-foreground/60">Growth</p><p className="mt-1 text-3xl font-bold tracking-tight text-brand-soft">{fmt(last.value - last.contributed)}</p></div>
            </div>
            <div className="mt-8 flex h-52 items-end gap-[3px]" role="img" aria-label={`Projected growth over ${years} years`}>
              {series.map((s) => (
                <div key={s.year} className="group relative flex flex-1 flex-col justify-end" style={{ height: "100%" }}>
                  <div className="w-full rounded-t-sm bg-brand/90 transition-[height] duration-500" style={{ height: `${((s.value - s.contributed) / max) * 100}%` }} />
                  <div className="w-full bg-ink-foreground/35 transition-[height] duration-500" style={{ height: `${(s.contributed / max) * 100}%` }} />
                  <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-semibold text-foreground shadow-card group-hover:block">Yr {s.year}: {fmt(s.value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-5 text-xs text-ink-foreground/70">
              <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-sm bg-brand" /> Growth</span>
              <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-sm bg-ink-foreground/35" /> Contributions</span>
              <span className="ml-auto">Year 1 → {years}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Control({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-ink-foreground/75">{label}</span>
        <span className="font-semibold tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Slider(props: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root className="relative flex w-full touch-none select-none items-center py-1" {...props}>
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-ink-foreground/15">
        <SliderPrimitive.Range className="absolute h-full bg-brand" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-5 cursor-grab rounded-full bg-brand shadow-lift ring-4 ring-brand/20 transition-[box-shadow] focus-visible:outline-none focus-visible:ring-brand/40 active:cursor-grabbing" />
    </SliderPrimitive.Root>
  );
}

function StatsBand() {
  const stats = [
    { n: 23.4, d: 1, s: "%", l: "Top client return last year" },
    { n: 25, s: "+", l: "Years of combined experience" },
    { n: 1000, s: "+", l: "Investors served" },
    { n: 4, s: "", l: "Reviews a year, every client" },
  ];
  return (
    <section className="border-b bg-background">
      <div className="container-x grid grid-cols-2 gap-y-10 py-16 md:grid-cols-4">
        {stats.map((x, i) => (
          <Reveal key={x.l} delay={i * 70} className="border-l pl-6 first:border-l-0 first:pl-0 md:[&:nth-child(3)]:border-l">
            <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl"><CountUp to={x.n} decimals={x.d ?? 0} suffix={x.s} /></p>
            <p className="mt-2 text-sm text-muted-foreground">{x.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 8000);
    return () => clearInterval(t);
  }, [paused]);
  const t = testimonials[i]!;
  const go = (d: number) => setI((x) => (x + d + testimonials.length) % testimonials.length);
  return (
    <section className="container-x py-20 md:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-end">
        <Reveal>
          <p className="type-kicker">Client stories</p>
          <h2 className="type-headline mt-3 text-primary">What it is like to work with us.</h2>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={() => go(-1)} aria-label="Previous story" className="inline-flex size-11 items-center justify-center rounded-full border transition-colors hover:border-primary hover:text-primary"><ChevronLeft className="size-5" /></button>
            <button onClick={() => go(1)} aria-label="Next story" className="inline-flex size-11 items-center justify-center rounded-full border transition-colors hover:border-primary hover:text-primary"><ChevronRight className="size-5" /></button>
            <span className="ml-2 text-sm tabular-nums text-muted-foreground">{i + 1} / {testimonials.length}</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <figure key={t.name} className="animate-in fade-in-0 slide-in-from-right-2 rounded-3xl bg-secondary p-8 duration-500 sm:p-12">
            <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">“{t.quote}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {t.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-secondary/60 py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="type-kicker">Questions</p>
          <h2 className="type-headline mt-3 text-primary">Before you get in touch.</h2>
          <p className="type-lead mt-4 max-w-sm">Anything else? An advisor answers every message personally.</p>
          <Button asChild variant="outline" className="mt-8"><Link to="/contact">Ask a question</Link></Button>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="divide-y rounded-2xl border bg-card px-6">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-0">
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink-gradient px-6 py-16 text-ink-foreground sm:px-12 md:py-24">
        <div className="bg-dots-light absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="type-headline">Open your Sherman Ventures account in minutes.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-foreground/75">No setup fee and no minimum to start. Your advisor reaches out within one business day.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="brand" size="lg"><Link to="/auth" search={{ mode: "signup" }}>Open an account <ArrowRight /></Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/contact">Talk to an advisor</Link></Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-ink-foreground/60"><ShieldCheck className="size-4" /> Encrypted portal · GDPR-ready · You control your data</p>
        </div>
      </Reveal>
    </section>
  );
}
