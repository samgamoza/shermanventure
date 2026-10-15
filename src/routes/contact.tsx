import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
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
      <PageHero eyebrow="Contact" title="Speak with an advisor" intro="Tell us about your goals and we'll be in touch shortly." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-6">
          <div className="flex gap-4"><Mail className="mt-1 size-6 text-primary" /><div><h2 className="text-2xl font-semibold">Send us a message</h2><p className="text-muted-foreground">Our team reviews every inquiry personally.</p></div></div>
          <div className="flex gap-4"><ShieldCheck className="mt-1 size-6 text-primary" /><div><h2 className="text-2xl font-semibold">Your data is protected</h2><p className="text-muted-foreground">Sent over an encrypted connection and stored encrypted. Only our team can read it.</p></div></div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-lift sm:p-10">
          {sent ? (
            <div className="py-10 text-center animate-in fade-in zoom-in-95">
              <CheckCircle2 className="mx-auto size-14 text-success" />
              <h2 className="mt-4 text-3xl font-semibold">Thank you</h2>
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
              <Field id="message" label="Message" error={errors.message?.message}><Textarea id="message" rows={6} {...register("message")} {...aria("message")} /></Field>
              <div className="grid gap-1">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" className="mt-1 size-4 accent-primary" {...register("privacy_consent")} {...aria("privacy_consent")} />
                  <span>I agree that Sherman Ventures may store and use my details to respond to this inquiry, as described in the <Link to="/privacy" className="text-primary underline">privacy policy</Link>.</span>
                </label>
                {errors.privacy_consent && <p id="privacy_consent-err" className="text-sm text-destructive">{errors.privacy_consent.message}</p>}
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="sm:justify-self-start">{isSubmitting ? "Sending…" : "Send message"}</Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
