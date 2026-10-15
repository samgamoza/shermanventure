import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact an Advisor — Sherman Ventures LLC" },
      { name: "description", content: "Send a message to Sherman Ventures LLC and an advisor will get back to you." },
      { property: "og:title", content: "Contact an Advisor — Sherman Ventures LLC" },
      { property: "og:description", content: "Reach out to our advisors about your investment goals." },
    ],
  }),
  component: Contact,
});

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p id={`${id}-err`} className="text-sm text-destructive animate-in fade-in">{error}</p>}
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (v: ContactInput) => {
    const { error } = await supabase.from("contact_messages").insert({
      name: v.name, email: v.email, phone: v.phone || null, subject: v.subject, message: v.message, privacy_consent: true,
    });
    if (error) return void toast.error("We couldn't send your message. Please try again.");
    reset();
    setSent(true);
  };

  const aria = (k: keyof ContactInput) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <>
      <PageHero kicker="Contact" title="Speak with an advisor." intro="Tell us a little about your goals. An advisor, not a sales team, replies within one business day." />
      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-8 lg:sticky lg:top-32 lg:self-start">
          {[
            { icon: Mail, t: "Every message is read by a person", b: "Your inquiry goes straight to our advisory team. No automated replies, no ticket numbers." },
            { icon: Clock, t: "One business day", b: "That is how long you wait for a first response. If it is urgent, say so in the subject." },
            { icon: ShieldCheck, t: "Your details are protected", b: "Sent over an encrypted connection, stored encrypted, visible only to our team. You can ask us to delete them at any time." },
          ].map((x) => (
            <div key={x.t} className="flex gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><x.icon className="size-5" /></span>
              <div>
                <h2 className="text-lg font-bold">{x.t}</h2>
                <p className="mt-1 leading-relaxed text-muted-foreground">{x.b}</p>
              </div>
            </div>
          ))}
          <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">Already a client? Message your advisor from the <Link to="/portal" className="font-semibold text-primary">client portal</Link> instead.</p>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-card sm:p-10">
          {sent ? (
            <div className="py-10 text-center animate-in fade-in zoom-in-95">
              <CheckCircle2 className="mx-auto size-14 text-success" />
              <h2 className="type-title mt-4 text-primary">Thank you</h2>
              <p className="mt-2 text-muted-foreground">Your message has been received. An advisor will respond soon.</p>
              <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name?.message}><Input id="name" autoComplete="name" {...register("name")} {...aria("name")} /></Field>
                <Field id="email" label="Email" error={errors.email?.message}><Input id="email" type="email" autoComplete="email" {...register("email")} {...aria("email")} /></Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="phone" label="Phone (optional)" error={errors.phone?.message}><Input id="phone" type="tel" autoComplete="tel" {...register("phone")} {...aria("phone")} /></Field>
                <Field id="subject" label="Subject" error={errors.subject?.message}><Input id="subject" {...register("subject")} {...aria("subject")} /></Field>
              </div>
              <Field id="message" label="Message" error={errors.message?.message}><Textarea id="message" rows={6} placeholder="What would you like help with?" {...register("message")} {...aria("message")} /></Field>
              <div className="grid gap-1">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" className="mt-1 size-4 accent-primary" {...register("privacy_consent")} {...aria("privacy_consent")} />
                  <span>I agree that Sherman Ventures may store and use my details to respond to this inquiry, as described in the <Link to="/privacy" className="text-primary underline">privacy policy</Link>.</span>
                </label>
                {errors.privacy_consent && <p id="privacy_consent-err" className="text-sm text-destructive">{errors.privacy_consent.message}</p>}
              </div>
              <Button type="submit" variant="brand" size="lg" disabled={isSubmitting} className="sm:justify-self-start">{isSubmitting ? "Sending…" : "Send message"}</Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
