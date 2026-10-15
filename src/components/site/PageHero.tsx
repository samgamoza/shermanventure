import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  kicker,
  title,
  intro,
  actions,
  aside,
  tone = "light",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-ink-gradient text-ink-foreground" : "bg-secondary")}>
      {dark && <div className="bg-dots-light absolute inset-0" aria-hidden />}
      <div className={cn("container-x relative grid items-center gap-12 py-16 md:py-24", aside && "lg:grid-cols-[1.1fr_1fr]")}>
        <div>
          {kicker && <p className={cn("animate-hero type-kicker", dark && "text-brand-soft")}>{kicker}</p>}
          <h1 className={cn("animate-hero type-display mt-3 max-w-3xl", dark ? "text-ink-foreground" : "text-primary")} style={{ animationDelay: "60ms" }}>
            {title}
          </h1>
          {intro && (
            <p className={cn("animate-hero type-lead mt-6 max-w-2xl", dark && "text-ink-foreground/75")} style={{ animationDelay: "120ms" }}>
              {intro}
            </p>
          )}
          {actions && (
            <div className="animate-hero mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="animate-hero" style={{ animationDelay: "200ms" }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
