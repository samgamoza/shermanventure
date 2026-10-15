import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — Sherman Ventures" },
      { name: "description", content: "Choose a new password for your Sherman Ventures client account." },
      { property: "og:title", content: "Reset password — Sherman Ventures" },
      { property: "og:description", content: "Choose a new password for your account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Reset,
});

function Reset() {
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.length < 8) return void toast.error("Password must be at least 8 characters");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Password updated");
    navigate({ to: "/portal" });
  };
  return (
    <section className="bg-secondary px-5 py-16 sm:py-24">
      <form onSubmit={submit} className="mx-auto grid max-w-md gap-4 rounded-2xl border bg-card p-8 shadow-lift">
        <h1 className="type-title text-primary">Set a new password</h1>
        <div className="grid gap-2"><Label htmlFor="np">New password</Label><Input id="np" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
        <Button type="submit" disabled={busy}>Update password</Button>
      </form>
    </section>
  );
}
