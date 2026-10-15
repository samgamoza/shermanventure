import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sherman Ventures LLC" },
      { name: "description", content: "How Sherman Ventures LLC collects, protects and uses your personal data, and your rights under GDPR." },
      { property: "og:title", content: "Privacy Policy — Sherman Ventures LLC" },
      { property: "og:description", content: "Your data, your rights: how we protect personal information." },
    ],
  }),
  component: Privacy,
});

const sections = [
  ["What we collect", "Contact details you send us (name, email, phone, message), and for account holders: name, company, phone and documents we share with you."],
  ["Why we use it", "To respond to inquiries, provide our services, and meet legal obligations. Legal basis: your consent and our contract with you (GDPR Art. 6(1)(a) and (b))."],
  ["How we protect it", "All data travels over encrypted connections (TLS) and is encrypted at rest. Access is restricted by strict permission rules so clients can only see their own records, and only authorized staff can see inquiries."],
  ["Cookies", "We use only essential browser storage to keep you signed in and remember your privacy choice. No advertising or tracking cookies."],
  ["How long we keep it", "Inquiries are kept for up to 24 months unless you become a client. Account data is kept while your account is active and deleted when you close it, unless law requires otherwise."],
  ["Your rights", "You may access, correct, export or delete your data, withdraw consent, or object to processing. Signed-in clients can export or delete their data directly from the client portal. You can also contact us through the contact page or complain to your local data protection authority."],
];

const slug = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Privacy() {
  return (
    <>
      <PageHero kicker="Legal" title="Privacy policy." intro="How we collect, protect and use your personal data, and the rights you have over it. Last updated October 2026." />
      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-sm font-semibold">On this page</p>
          <ul className="mt-3 space-y-1 text-sm">
            {sections.map(([h]) => (
              <li key={h}><a href={`#${slug(h ?? "")}`} className="block rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">{h}</a></li>
            ))}
          </ul>
        </nav>
        <article className="max-w-3xl space-y-12">
          {sections.map(([h, b]) => (
            <section key={h} id={slug(h ?? "")} className="scroll-mt-32">
              <h2 className="type-title text-primary">{h}</h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">{b}</p>
            </section>
          ))}
          <section className="rounded-2xl bg-secondary p-6">
            <h2 className="text-lg font-bold">Questions about your data?</h2>
            <p className="mt-2 text-muted-foreground">Use the <Link to="/contact" className="font-semibold text-primary">contact page</Link> and mention "privacy" in the subject. We respond within one business day.</p>
          </section>
        </article>
      </div>
    </>
  );
}
