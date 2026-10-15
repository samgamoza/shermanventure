import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Zap, Users, Lock, Target, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";

const HERO = "https://images.unsplash.com/photo-1644995722044-6cd197ffb440?auto=format&fit=crop&w=1920&q=75";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sherman Ventures LLC — Smart investing & wealth growth" },
      { name: "description", content: "Unlock investment opportunities and accelerate wealth growth with expert guidance from Sherman Ventures LLC." },
      { property: "og:title", content: "Sherman Ventures LLC — Smart investing starts here" },
      { property: "og:description", content: "Expert investment guidance, personalized strategies and secure client portal." },
      { property: "og:image", content: HERO },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Home,
});

const features = [
  { icon: ShieldCheck, title: "Trusted guidance", body: "Expert advisors with decades of combined experience helping clients achieve their financial goals through strategic investment planning." },
  { icon: Zap, title: "Fast execution", body: "Lightning-fast trade execution and real-time market access ensure you never miss an opportunity in dynamic market conditions." },
  { icon: Users, title: "Experienced professionals", body: "Our team of certified financial analysts and portfolio managers brings institutional-grade expertise to every client relationship." },
  { icon: Lock, title: "Secure transactions", body: "Bank-level encryption and multi-factor authentication protect your investments and personal information at every step." },
  { icon: Target, title: "Personalized strategies", body: "Custom investment portfolios tailored to your risk tolerance, time horizon, and specific financial objectives." },
];

const testimonials = [
  { quote: "Sherman Ventures transformed my investment approach. Their personalized strategy helped me achieve a 23.4% return last year while maintaining a balanced risk profile. The team is responsive and truly understands market dynamics.", name: "Maya Chen", role: "Portfolio Manager" },
  { quote: "After years of managing my own investments, I finally found advisors who match my ambition. The portfolio management service is exceptional, and the quarterly reviews keep me informed without overwhelming detail.", name: "Raj Patel", role: "Entrepreneur" },
  { quote: "I was skeptical about switching firms, but Sherman Ventures exceeded every expectation. Their retirement planning expertise gave me confidence, and my portfolio has grown steadily while preserving capital.", name: "Lucia Torres", role: "Retired Executive" },
  { quote: "The market research insights are invaluable. Sherman Ventures helped me diversify beyond tech stocks into emerging sectors I would never have considered. My portfolio is now resilient and growth-oriented.", name: "Kwame Asante", role: "Tech Founder" },
];

const ticker = [
  ["S&P 500", "+0.84%"], ["NASDAQ", "+1.12%"], ["DOW", "+0.41%"], ["FTSE 100", "+0.27%"], ["NIKKEI", "-0.18%"], ["GOLD", "+0.62%"], ["10Y UST", "-0.05%"], ["EUR/USD", "+0.09%"],
];

function Sparkline() {
  const pts = [8, 14, 11, 19, 17, 25, 22, 31, 28, 37, 34, 44];
  const w = 300, h = 90, max = 48;
  const d = pts.map((y, i) => `${(i / (pts.length - 1)) * w},${h - (y / max) * h}`).join(" L ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" aria-hidden>
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${d} L ${w},${h} L 0,${h} Z`} fill="url(#sg)" />
      <path d={`M ${d}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-primary-foreground">
        <img src={HERO} alt="Financial dashboard with market data and analytics" className="animate-slow-zoom absolute inset-0 -z-30 h-full w-full object-cover opacity-40" fetchPriority="high" width={1920} height={1080} />
        <div className="bg-hero absolute inset-0 -z-20" />
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
          <div>
            <span className="animate-hero glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-primary-foreground/90">
              <span className="animate-pulse-dot size-2 rounded-full bg-success" /> Investing in tomorrow, building lasting value
            </span>
            <h1 className="animate-hero text-gradient mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
              Smart investing starts with Sherman Ventures LLC
            </h1>
            <p className="animate-hero mt-6 max-w-xl text-lg text-primary-foreground/75" style={{ animationDelay: "200ms" }}>
              Unlock investment opportunities and accelerate wealth growth with expert guidance.
            </p>
            <div className="animate-hero mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "300ms" }}>
              <Button asChild variant="hero" size="lg"><Link to="/services">Start investing <ArrowRight /></Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/auth" search={{ mode: "signup" }}>Open an account</Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/contact">Contact an advisor</Link></Button>
            </div>
            <div className="animate-hero mt-10 flex items-center gap-6 text-sm text-primary-foreground/60" style={{ animationDelay: "400ms" }}>
              <span className="flex items-center gap-2"><Lock className="size-4" /> Bank-level encryption</span>
              <span className="flex items-center gap-2"><ShieldCheck className="size-4" /> Privacy-first</span>
            </div>
          </div>

          <div className="animate-hero relative" style={{ animationDelay: "250ms" }}>
            <div className="glass ring-glow animate-float rounded-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="text-sm text-primary-foreground/70">Sample balanced portfolio</p>
                <span className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-semibold text-success">+23.4% YoY</span>
              </div>
              <p className="font-display mt-2 text-4xl font-semibold sm:text-5xl">$1,284,560</p>
              <div className="mt-4 text-silver"><Sparkline /></div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[["Equities", "58%"], ["Fixed income", "27%"], ["Alternatives", "15%"]].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-primary-foreground/5 p-3">
                    <p className="font-display text-2xl font-semibold">{v}</p>
                    <p className="text-[0.7rem] text-primary-foreground/60">{k}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass absolute -bottom-6 -left-4 hidden rounded-xl px-4 py-3 shadow-lift sm:block">
              <p className="text-xs text-primary-foreground/60">Next quarterly review</p>
              <p className="font-semibold">Scheduled with your advisor</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 bg-primary-deep/60 py-3 backdrop-blur" aria-label="Illustrative market ticker">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm">
            {[...ticker, ...ticker].map(([k, v], i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-primary-foreground/60">{k}</span>
                <span className={v.startsWith("-") ? "text-destructive" : "text-success"}>{v}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-12 sm:px-8 md:grid-cols-4">
          {[
            { n: 23.4, d: 1, s: "%", l: "Top client return last year" },
            { n: 25, s: "+", l: "Years combined experience" },
            { n: 1000, s: "+", l: "Investors served" },
            { n: 24, s: "/7", l: "Secure portal access" },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 80} className="text-center md:border-l md:first:border-l-0">
              <p className="font-display text-4xl font-semibold text-primary sm:text-5xl"><CountUp to={x.n} decimals={x.d ?? 0} suffix={x.s} /></p>
              <p className="mt-1 text-sm text-muted-foreground">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-silver">Why choose us</p>
          <h2 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">Experience the difference professional management makes</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
              <article className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-8 ${i === 0 ? "bg-ink-gradient text-ink-foreground" : "bg-card shadow-card"}`}>
                <span className={`inline-flex size-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 ${i === 0 ? "glass" : "bg-accent text-primary"}`}>
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">{f.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-ink-foreground/75" : "text-muted-foreground"}`}>{f.body}</p>
                <span className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <Calculator />

      <section className="px-5 pb-20 sm:px-8 md:pb-28">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink-gradient px-6 py-16 text-center text-ink-foreground sm:px-12 md:py-24">
          <div className="bg-grid absolute inset-0" />
          <div className="relative">
            <h2 className="text-gradient text-4xl font-semibold sm:text-6xl">Ready to start building wealth?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-foreground/75">Join thousands of investors who trust Sherman Ventures with their financial future.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg"><Link to="/auth" search={{ mode: "signup" }}>Open your account today <ArrowRight /></Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/contact">Talk to an advisor</Link></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i]!;
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-silver">What our clients say</p>
          <h2 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">Real results from investors who trust Sherman Ventures</h2>
          <div className="mt-8 flex gap-2">
            {testimonials.map((x, k) => (
              <button key={x.name} onClick={() => setI(k)} aria-label={`Show testimonial from ${x.name}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-primary" : "w-4 bg-silver/50"}`} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <figure key={t.name} className="animate-in fade-in slide-in-from-right-4 duration-700 rounded-2xl bg-card p-8 shadow-lift sm:p-12">
            <Quote className="size-10 text-silver" />
            <blockquote className="font-display mt-5 text-2xl leading-snug text-foreground sm:text-3xl">“{t.quote}”</blockquote>
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

function Calculator() {
  const [initial, setInitial] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const result = useMemo(() => {
    const p = Number(initial), r = Number(rate) / 100, n = Number(years);
    if (!(p >= 0) || !(n >= 0) || Number.isNaN(r)) return null;
    const total = p * Math.pow(1 + r, n);
    return { total, gain: total - p };
  }, [initial, rate, years]);
  const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-silver">Plan your investment</p>
          <h2 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">See how your money can grow over time</h2>
          <p className="mt-4 max-w-md text-muted-foreground">Adjust the numbers to estimate compound growth. Estimates are illustrative only and not a guarantee of returns.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-2xl border bg-card p-6 shadow-lift sm:p-9">
            <h3 className="text-2xl font-semibold">Investment calculator</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div className="grid gap-2"><Label htmlFor="ci">Initial investment ($)</Label><Input id="ci" inputMode="decimal" type="number" min={0} value={initial} onChange={(e) => setInitial(e.target.value)} /></div>
              <div className="grid gap-2"><Label htmlFor="cr">Annual return (%)</Label><Input id="cr" inputMode="decimal" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
              <div className="grid gap-2"><Label htmlFor="cy">Period (years)</Label><Input id="cy" inputMode="numeric" type="number" min={0} max={60} value={years} onChange={(e) => setYears(e.target.value)} /></div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-secondary p-5" aria-live="polite">
              <div><p className="text-xs text-muted-foreground">Estimated value</p><p className="font-display text-3xl font-semibold text-primary">{result ? fmt(result.total) : "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Estimated growth</p><p className="font-display text-3xl font-semibold text-success">{result ? fmt(result.gain) : "—"}</p></div>
            </div>
            {result && (
              <div className="mt-6 flex h-28 items-end gap-1" aria-hidden>
                {Array.from({ length: Math.min(30, Math.max(1, Number(years) || 1)) }, (_, k, arr) => {
                  const n = ((k + 1) / arr.length) * Number(years);
                  const r = Number(rate) / 100;
                  const h = (Math.pow(1 + r, n) / Math.pow(1 + r, Number(years))) * 100;
                  return <div key={k} className="flex-1 rounded-t bg-primary/80 transition-all duration-500" style={{ height: `${Math.max(4, h)}%` }} />;
                })}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
