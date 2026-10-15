import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Handshake, Scale, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sherman Ventures LLC" },
      { name: "description", content: "Who Sherman Ventures LLC is, how we work and what we believe about managing other people's money." },
      { property: "og:title", content: "About Sherman Ventures LLC" },
      { property: "og:description", content: "Investing in tomorrow, building lasting value." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Scale, k: "Integrity", v: "We are paid only by our clients, we show performance net of fees, and we say so when we got something wrong." },
  { icon: Eye, k: "Clarity", v: "A plan you can read in ten minutes beats a brochure you never open. Every report is written in plain language." },
  { icon: ShieldCheck, k: "Discipline", v: "Research-driven decisions, written risk limits and quarterly reviews, so no single market mood changes the plan." },
  { icon: Handshake, k: "Partnership", v: "Long relationships built on responsiveness. Your advisor knows your situation, not just your account number." },
];

const beliefs = [
  "Costs are the one thing in investing you fully control, so we keep them low and visible.",
  "Diversification is the only free lunch. We take it every time.",
  "Time in the market beats timing the market, which is why we plan in decades and review in quarters.",
  "Your plan should survive a bad year without you having to do anything.",
];

const milestones = [
  { y: "Founding", t: "Sherman Ventures LLC is established as an independent advisory firm serving individuals and families." },
  { y: "Research desk", t: "In-house market research begins, so every recommendation carries a written rationale." },
  { y: "Business owners", t: "Advisory practice expands to founders and executives planning liquidity events and succession." },
  { y: "Client portal", t: "Encrypted client portal launches: reports, documents and data controls in one place." },
];

function About() {
  return (
    <>
      <PageHero
        kicker="About Sherman Ventures"
        title="Investing in tomorrow, building lasting value."
        intro="We are an independent investment firm. We manage portfolios, plan retirements and advise families and business owners, and we measure ourselves on one thing: whether your money does what you need it to."
        actions={<Button asChild variant="brand" size="lg"><Link to="/contact">Meet an advisor <ArrowRight /></Link></Button>}
      />

      <section className="border-b bg-background">
        <div className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
          {[
            { n: 25, s: "+", l: "Years of combined experience" },
            { n: 1000, s: "+", l: "Investors served" },
            { n: 4, s: "", l: "Reviews a year, every client" },
            { n: 100, s: "%", l: "Fee-only, no commissions" },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 70} className="border-l pl-6 first:border-l-0 first:pl-0 md:[&:nth-child(3)]:border-l">
              <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl"><CountUp to={x.n} suffix={x.s} /></p>
              <p className="mt-2 text-sm text-muted-foreground">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="type-kicker">What we stand for</p>
          <h2 className="type-headline mt-3 text-primary">Four commitments you can hold us to.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((x, i) => (
            <Reveal key={x.k} delay={i * 70}>
              <div className="flex h-full gap-5 rounded-2xl border bg-card p-7">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><x.icon className="size-6" /></span>
                <div>
                  <h3 className="text-xl font-bold">{x.k}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{x.v}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-gradient text-ink-foreground">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="type-kicker text-brand-soft">How we think</p>
            <h2 className="type-headline mt-3">Our investment beliefs, in four sentences.</h2>
          </Reveal>
          <ol className="grid gap-4">
            {beliefs.map((b, i) => (
              <Reveal key={b} delay={i * 80}>
                <li className="flex gap-5 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-6">
                  <span className="text-3xl font-bold leading-none text-brand-soft">{i + 1}</span>
                  <p className="text-lg leading-relaxed">{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="type-kicker">Our story</p>
          <h2 className="type-headline mt-3 text-primary">Built step by step, like a good portfolio.</h2>
        </Reveal>
        <ol className="relative mt-12 grid gap-8 border-l pl-8 md:grid-cols-4 md:gap-6 md:border-l-0 md:border-t md:pl-0 md:pt-8">
          {milestones.map((m, i) => (
            <Reveal key={m.y} delay={i * 80}>
              <li className="relative">
                <span className="absolute -left-[2.3rem] top-1 size-3 rounded-full bg-brand ring-4 ring-background md:-top-[2.4rem] md:left-0" />
                <p className="text-sm font-semibold text-primary">{m.y}</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">{m.t}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <Reveal className="rounded-3xl bg-secondary px-6 py-14 text-center sm:px-12">
          <h2 className="type-title text-primary">Want to know who you would be working with?</h2>
          <p className="type-lead mx-auto mt-3 max-w-xl">Book a discovery call. You will meet the advisor who would manage your plan, not a sales team.</p>
          <Button asChild variant="brand" size="lg" className="mt-8"><Link to="/contact">Book a discovery call <ArrowRight /></Link></Button>
        </Reveal>
      </section>
    </>
  );
}
