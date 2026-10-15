import { createFileRoute } from "@tanstack/react-router";
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

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" intro="Last updated October 2026." />
      <article className="mx-auto max-w-3xl space-y-10 px-5 py-16 sm:px-8 md:py-24">
        {sections.map(([h, b]) => (
          <section key={h}>
            <h2 className="text-3xl font-semibold text-primary">{h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{b}</p>
          </section>
        ))}
      </article>
    </>
  );
}
