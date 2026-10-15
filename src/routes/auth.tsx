import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "signin" | "signup" | "forgot";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode } => ({
    mode: s.mode === "signup" || s.mode === "forgot" ? s.mode : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Sherman Ventures Client Portal" },
      { name: "description", content: "Sign in or open an account to access your secure Sherman Ventures client portal." },
      { property: "og:title", content: "Client Portal Sign in — Sherman Ventures" },
      { property: "og:description", content: "Secure access to your Sherman Ventures account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const emailS = z.string().trim().email("Enter a valid email").max(255);
const passS = z.string().min(8, "At least 8 characters").max(72);

function AuthPage() {
  const search = Route.useSearch();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const em = emailS.safeParse(email);
    if (!em.success) errs.email = em.error.issues[0].message;
    if (mode !== "forgot") {
      const pw = passS.safeParse(password);
      if (!pw.success) errs.password = pw.error.issues[0].message;
    }
    if (mode === "signup") {
      if (name.trim().length < 2) errs.name = "Enter your full name";
      if (!agree) errs.agree = "Please accept the privacy policy";
    }
    setErr(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/portal" });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/portal", data: { full_name: name.trim(), privacy_accepted: true } },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
        if (error) throw error;
        toast.success("If that email exists, a reset link is on its way.");
        setMode("signin");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) return void toast.error("Google sign-in failed");
    if (r.redirected) return;
    navigate({ to: "/portal" });
  };

  const title = mode === "signup" ? "Open an account" : mode === "forgot" ? "Reset your password" : "Welcome back";

  return (
    <section className="bg-secondary px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-7 shadow-lift sm:p-10 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-4xl font-semibold text-primary">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Secure access to your Sherman Ventures client portal.</p>
        {mode !== "forgot" && (
          <>
            <Button type="button" variant="outline" className="mt-6 w-full" onClick={google}>Continue with Google</Button>
            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
          </>
        )}
        <form onSubmit={submit} noValidate className="grid gap-4">
          {mode === "signup" && (
            <div className="grid gap-2"><Label htmlFor="n">Full name</Label><Input id="n" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />{err.name && <p className="text-sm text-destructive">{err.name}</p>}</div>
          )}
          <div className="grid gap-2"><Label htmlFor="e">Email</Label><Input id="e" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />{err.email && <p className="text-sm text-destructive">{err.email}</p>}</div>
          {mode !== "forgot" && (
            <div className="grid gap-2"><Label htmlFor="p">Password</Label><Input id="p" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} />{err.password && <p className="text-sm text-destructive">{err.password}</p>}</div>
          )}
          {mode === "signup" && (
            <div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" className="mt-1 size-4 accent-primary" checked={agree} onChange={(e) => setAgree(e.target.checked)} /><span>I accept the <Link to="/privacy" className="text-primary underline">privacy policy</Link>.</span></label>
              {err.agree && <p className="text-sm text-destructive">{err.agree}</p>}
            </div>
          )}
          <Button type="submit" size="lg" disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}</Button>
        </form>
        <div className="mt-6 flex flex-wrap justify-between gap-2 text-sm">
          {mode === "signin" ? (
            <>
              <button className="text-primary hover:underline" onClick={() => setMode("signup")}>Create an account</button>
              <button className="text-muted-foreground hover:underline" onClick={() => setMode("forgot")}>Forgot password?</button>
            </>
          ) : (
            <button className="text-primary hover:underline" onClick={() => setMode("signin")}>Back to sign in</button>
          )}
        </div>
      </div>
    </section>
  );
}
