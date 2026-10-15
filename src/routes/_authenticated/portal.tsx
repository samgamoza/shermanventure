import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { FileText, Download, Trash2, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { deleteMyAccount } from "@/lib/account.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Client Portal — Sherman Ventures" },
      { name: "description", content: "Your secure Sherman Ventures client portal." },
      { property: "og:title", content: "Client Portal — Sherman Ventures" },
      { property: "og:description", content: "Your profile and documents." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Portal,
});

type Doc = { id: string; title: string; storage_path: string; created_at: string };

function Portal() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const del = useServerFn(deleteMyAccount);
  const [profile, setProfile] = useState({ full_name: "", phone: "", company: "" });
  const [docs, setDocs] = useState<Doc[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("profiles").select("full_name, phone, company").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile({ full_name: data.full_name ?? "", phone: data.phone ?? "", company: data.company ?? "" });
    });
    supabase.from("client_documents").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).then(({ data }) => setDocs(data ?? []));
  }, [user.id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.full_name.trim().length > 100 || profile.phone.length > 30 || profile.company.length > 120) return void toast.error("One of the fields is too long");
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ ...profile, updated_at: new Date().toISOString() }).eq("id", user.id);
    setSaving(false);
    error ? toast.error("Could not save") : toast.success("Profile saved");
  };

  const download = async (d: Doc) => {
    const { data, error } = await supabase.storage.from("client-documents").createSignedUrl(d.storage_path, 60);
    if (error || !data) return void toast.error("Could not open document");
    window.open(data.signedUrl, "_blank", "noopener");
  };

  const exportData = async () => {
    const [{ data: p }, { data: d }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase.from("client_documents").select("title, created_at").eq("client_id", user.id),
    ]);
    const blob = new Blob([JSON.stringify({ account: { email: user.email, created_at: user.created_at }, profile: p, documents: d }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sherman-ventures-my-data.json";
    a.click();
  };

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const removeAccount = async () => {
    if (!confirm("Permanently delete your account and all your data? This cannot be undone.")) return;
    try {
      await del();
      await signOut();
      toast.success("Your account has been deleted");
    } catch {
      toast.error("Could not delete account");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-silver">Client portal</p>
          <h1 className="mt-2 text-4xl font-semibold text-primary sm:text-5xl">Welcome{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}</h1>
        </div>
        <Button variant="outline" onClick={signOut}><LogOut /> Sign out</Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-semibold">Your documents</h2>
          {docs.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No documents yet. Statements and reports from your advisor will appear here.</p>
          ) : (
            <ul className="mt-4 divide-y">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 py-3">
                  <span className="flex min-w-0 items-center gap-3"><FileText className="size-5 shrink-0 text-primary" /><span className="truncate">{d.title}</span></span>
                  <Button size="sm" variant="ghost" onClick={() => download(d)} aria-label={`Download ${d.title}`}><Download /></Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form onSubmit={save} className="grid content-start gap-4 rounded-xl border bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="grid gap-2"><Label htmlFor="fn">Full name</Label><Input id="fn" maxLength={100} value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></div>
          <div className="grid gap-2"><Label htmlFor="ph">Phone</Label><Input id="ph" type="tel" maxLength={30} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
          <div className="grid gap-2"><Label htmlFor="co">Company</Label><Input id="co" maxLength={120} value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} /></div>
          <Button type="submit" disabled={saving}>Save profile</Button>
        </form>
      </div>

      <section className="mt-6 rounded-xl border bg-card p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-semibold">Privacy & your data</h2>
        <p className="mt-2 text-sm text-muted-foreground">Download a copy of everything we hold about you, or permanently delete your account.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportData}><Download /> Export my data</Button>
          <Button variant="destructive" onClick={removeAccount}><Trash2 /> Delete my account</Button>
        </div>
      </section>
    </div>
  );
}
