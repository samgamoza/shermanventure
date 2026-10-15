import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart, PiggyBank, Search, Briefcase } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Investment Services — Sherman Ventures LLC" },
      { name: "description", content: "Portfolio management, retirement planning, market research and wealth advisory from Sherman Ventures LLC." },
      { property: "og:title", content: "Investment Services — Sherman Ventures LLC" },
      { property: "og:description", content: "Portfolio management, retirement planning, market research and wealth advisory." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Briefcase, title: "Portfolio management", body: "Actively managed portfolios built around your goals, with quarterly reviews that keep you informed." },
  { icon: PiggyBank, title: "Retirement planning", body: "Long-term strategies designed to grow and preserve capital so you can retire with confidence." },
  { icon: Search, title: "Market research", body: "Institutional-grade research and insights that uncover opportunities across sectors and markets." },
  { icon: LineChart, title: "Wealth advisory", body: "One-on-one guidance from experienced advisors on diversification, risk and long-term wealth." },
];

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Expertise for every stage of your financial journey" intro="Tailored investment solutions backed by experienced professionals." />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <article className="h-full rounded-xl border bg-card p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
              <s.icon className="size-8 text-primary" />
              <h2 className="mt-5 text-3xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 text-center sm:px-8">
        <Button asChild size="lg"><Link to="/contact">Talk to an advisor</Link></Button>
      </section>
    </>
  );
}
