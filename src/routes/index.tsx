import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldCheck, Zap, Users, Lock, Target, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";

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

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-primary-foreground">
        <img src={HERO} alt="Financial dashboard with market data and analytics" className="animate-slow-zoom absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" width={1920} height={1080} />
        <div className="bg-hero absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36 lg:py-44">
          <p className="eyebrow animate-hero text-silver">Investing in tomorrow, building lasting value</p>
          <h1 className="animate-hero mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
            Smart investing starts with Sherman Ventures LLC
          </h1>
          <p className="animate-hero mt-6 max-w-xl text-lg text-primary-foreground/80" style={{ animationDelay: "200ms" }}>
            Unlock investment opportunities and accelerate wealth growth with expert guidance.
          </p>
          <div className="animate-hero mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "300ms" }}>
            <Button asChild variant="hero" size="lg"><Link to="/services">Start investing <ArrowRight /></Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/auth" search={{ mode: "signup" }}>Open an account</Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/contact">Contact an advisor</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-silver">Why choose us</p>
          <h2 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">The difference professional management makes</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <article className="group h-full rounded-xl border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-silver">What our clients say</p>
            <h2 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">Real results from investors who trust us</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="h-full rounded-xl bg-card p-7 shadow-card sm:p-9">
                  <Quote className="size-8 text-silver" />
                  <blockquote className="mt-4 text-base leading-relaxed text-foreground">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {t.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Calculator />

      <section className="bg-ink-gradient text-ink-foreground">
        <Reveal className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 md:py-28">
          <h2 className="text-4xl font-semibold sm:text-5xl">Ready to start building wealth?</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-foreground/75">Join thousands of investors who trust Sherman Ventures with their financial future.</p>
          <Button asChild variant="hero" size="lg" className="mt-9"><Link to="/auth" search={{ mode: "signup" }}>Open your account today</Link></Button>
        </Reveal>
      </section>
    </>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
