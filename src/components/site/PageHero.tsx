export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-ink-gradient text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <p className="eyebrow animate-hero text-silver">{eyebrow}</p>
        <h1 className="animate-hero mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        {intro && (
          <p className="animate-hero mt-5 max-w-2xl text-base text-ink-foreground/75 sm:text-lg" style={{ animationDelay: "160ms" }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
