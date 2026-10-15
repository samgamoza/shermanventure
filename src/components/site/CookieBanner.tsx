import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "sv-privacy-notice";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!localStorage.getItem(KEY));
  }, []);
  if (!show) return null;
  const close = (v: string) => {
    localStorage.setItem(KEY, v);
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Privacy notice" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 rounded-xl border bg-card p-5 shadow-lift sm:inset-x-6">
      <p className="text-sm text-muted-foreground">
        We only use essential storage needed to keep you signed in and remember this choice. No tracking or advertising cookies. Read our{" "}
        <Link to="/privacy" className="font-medium text-primary underline">privacy policy</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => close("accepted")}>Got it</Button>
        <Button size="sm" variant="outline" onClick={() => close("essential-only")}>Essential only</Button>
      </div>
    </div>
  );
}
