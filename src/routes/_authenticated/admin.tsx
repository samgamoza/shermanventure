import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Mail, Trash2, Upload, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const { data } = await supabase.rpc("has_role", { _user_id: context.user.id, _role: "admin" });
    if (!data) throw redirect({ to: "/portal" });
  },
  head: () => ({
    meta: [
      { title: "Inbox — Sherman Ventures Admin" },
      { name: "description", content: "Incoming inquiries and client documents." },
      { property: "og:title", content: "Admin Inbox — Sherman Ventures" },
      { property: "og:description", content: "Manage incoming inquiries." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Msg = { id: string; name: string; email: string; phone: string | null; subject: string; message: string; status: string; created_at: string };
type Client = { id: string; full_name: string | null };
const STATUSES = ["new", "read", "replied", "archived"] as const;

function Admin() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [sel, setSel] = useState<Msg | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMsgs(data ?? []);
  }, []);

  useEffect(() => {
    load();
    const ch = supabase.channel("inbox").on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_messages" }, (p) => {
      setMsgs((m) => [p.new as Msg, ...m]);
      toast.info(`New message from ${(p.new as Msg).name}`);
    }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  const shown = useMemo(() => msgs.filter((m) => (filter === "all" || m.status === filter) && (`${m.name} ${m.email} ${m.subject}`.toLowerCase().includes(q.toLowerCase()))), [msgs, filter, q]);

  const setStatus = async (m: Msg, status: string) => {
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", m.id);
    if (error) return void toast.error("Update failed");
    setMsgs((all) => all.map((x) => (x.id === m.id ? { ...x, status } : x)));
    setSel((s) => (s && s.id === m.id ? { ...s, status } : s));
  };

  const open = (m: Msg) => { setSel(m); if (m.status === "new") setStatus(m, "read"); };

  const remove = async (m: Msg) => {
    if (!confirm("Delete this message permanently?")) return;
    await supabase.from("contact_messages").delete().eq("id", m.id);
    setMsgs((all) => all.filter((x) => x.id !== m.id));
    setSel(null);
  };

  const counts = useMemo(() => ({ total: msgs.length, new: msgs.filter((m) => m.status === "new").length }), [msgs]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <p className="eyebrow text-silver">Admin</p>
      <h1 className="mt-2 text-4xl font-semibold text-primary sm:text-5xl">Inbox</h1>
      <p className="mt-2 text-muted-foreground">{counts.total} messages · {counts.new} new</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search name, email or subject" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search messages" /></div>
        <div className="flex flex-wrap gap-1">
          {["all", ...STATUSES].map((s) => (
            <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)} className="capitalize">{s}</Button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <ul className="max-h-[70vh] divide-y overflow-auto rounded-xl border bg-card shadow-card">
          {shown.length === 0 && <li className="p-6 text-sm text-muted-foreground">No messages.</li>}
          {shown.map((m) => (
            <li key={m.id}>
              <button onClick={() => open(m)} className={cn("w-full p-4 text-left transition-colors hover:bg-muted", sel?.id === m.id && "bg-accent")}>
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("truncate", m.status === "new" ? "font-bold" : "font-medium")}>{m.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{m.subject}</p>
                <span className={cn("mt-1 inline-block rounded px-2 py-0.5 text-[0.7rem] font-semibold uppercase", m.status === "new" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>{m.status}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="rounded-xl border bg-card p-6 shadow-card sm:p-8">
          {sel ? (
            <article className="animate-in fade-in">
              <h2 className="text-3xl font-semibold">{sel.subject}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{sel.name} · <a className="text-primary underline" href={`mailto:${sel.email}`}>{sel.email}</a>{sel.phone ? ` · ${sel.phone}` : ""}</p>
              <p className="text-xs text-muted-foreground">{new Date(sel.created_at).toLocaleString()}</p>
              <p className="mt-6 whitespace-pre-wrap leading-relaxed">{sel.message}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Button asChild><a href={`mailto:${sel.email}?subject=${encodeURIComponent("Re: " + sel.subject)}`} onClick={() => setStatus(sel, "replied")}><Mail /> Reply</a></Button>
                <Button variant="outline" onClick={() => setStatus(sel, "archived")}>Archive</Button>
                <Button variant="ghost" onClick={() => remove(sel)}><Trash2 /> Delete</Button>
              </div>
            </article>
          ) : <p className="text-muted-foreground">Select a message to read it.</p>}
        </div>
      </div>

      <DocUploader />
    </div>
  );
}

function DocUploader() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.from("profiles").select("id, full_name").order("full_name").then(({ data }) => setClients(data ?? []));
  }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !file || !title.trim()) return void toast.error("Choose a client, a title and a file");
    setBusy(true);
    const path = `${clientId}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const up = await supabase.storage.from("client-documents").upload(path, file);
    if (!up.error) await supabase.from("client_documents").insert({ client_id: clientId, title: title.trim().slice(0, 150), storage_path: path });
    setBusy(false);
    if (up.error) return void toast.error("Upload failed");
    toast.success("Document shared with client");
    setTitle(""); setFile(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={upload} className="mt-10 grid gap-4 rounded-xl border bg-card p-6 shadow-card sm:p-8 md:grid-cols-4 md:items-end">
      <h2 className="text-2xl font-semibold md:col-span-4">Share a document with a client</h2>
      <div className="grid gap-2"><Label htmlFor="cl">Client</Label>
        <select id="cl" value={clientId} onChange={(e) => setClientId(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="">Select client</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.full_name || c.id.slice(0, 8)}</option>)}
        </select>
      </div>
      <div className="grid gap-2"><Label htmlFor="dt">Title</Label><Input id="dt" maxLength={150} value={title} onChange={(e) => setTitle(e.target.value)} /></div>
      <div className="grid gap-2"><Label htmlFor="df">File</Label><Input id="df" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
      <Button type="submit" disabled={busy}><Upload /> Upload</Button>
    </form>
  );
}
