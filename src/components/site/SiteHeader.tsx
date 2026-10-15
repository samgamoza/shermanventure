import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/sv-logo.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-b border-border shadow-[0_1px_0_0_var(--border),0_12px_32px_-24px_oklch(0.2_0.07_265/0.35)]" : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6 md:h-20">
        <Link to="/" aria-label="Sherman Ventures LLC home" className="shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="Sherman Ventures LLC" className="h-9 w-auto sm:h-10 md:h-11" width={165} height={44} fetchPriority="high" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/portal"
              className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              Client portal
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              Inbox
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Button asChild variant="brand">
              <Link to="/portal">Open portal <ArrowRight /></Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/auth">Log in</Link>
              </Button>
              <Button asChild variant="brand">
                <Link to="/auth" search={{ mode: "signup" }}>Open an account <ArrowRight /></Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-full border border-border p-2.5 text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="animate-in fade-in slide-in-from-top-2 fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t bg-background px-5 pb-8 duration-200 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col py-2">
            {[{ to: "/", label: "Home" } as const, ...nav].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-4 text-lg font-semibold text-foreground">
                {n.label}
              </Link>
            ))}
            {user && (
              <Link to="/portal" onClick={() => setOpen(false)} className="border-b py-4 text-lg font-semibold">Client portal</Link>
            )}
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="border-b py-4 text-lg font-semibold">Inbox</Link>
            )}
          </nav>
          <div className="mt-6 grid gap-3">
            {user ? (
              <Button asChild variant="brand" size="lg"><Link to="/portal" onClick={() => setOpen(false)}>Open portal</Link></Button>
            ) : (
              <>
                <Button asChild variant="brand" size="lg"><Link to="/auth" search={{ mode: "signup" }} onClick={() => setOpen(false)}>Open an account</Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/auth" onClick={() => setOpen(false)}>Log in</Link></Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
