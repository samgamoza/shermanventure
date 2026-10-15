import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sherman Ventures LLC" },
      { name: "description", content: "Learn about Sherman Ventures LLC: our mission, values and commitment to building lasting value for investors." },
      { property: "og:title", content: "About Sherman Ventures LLC" },
      { property: "og:description", content: "Investing in tomorrow, building lasting value." },
    ],
  }),
  component: About,
});

const values = [
  { k: "Integrity", v: "We put clients first and are transparent about risk, fees and performance." },
  { k: "Discipline", v: "Research-driven decisions and careful risk management guide every portfolio." },
  { k: "Partnership", v: "Long-term relationships built on responsiveness and clear communication." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Investing in tomorrow, building lasting value" intro="Sherman Ventures LLC helps individuals and families grow and protect their wealth through expert guidance and personalized strategies." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-3">
        {values.map((x, i) => (
          <Reveal key={x.k} delay={i * 90}>
            <div className="border-t-2 border-primary pt-6">
              <h2 className="text-3xl font-semibold">{x.k}</h2>
              <p className="mt-3 text-muted-foreground">{x.v}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Button asChild size="lg"><Link to="/contact">Get in touch</Link></Button>
      </section>
    </>
  );
}
