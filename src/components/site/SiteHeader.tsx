import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sv-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled ? "border-border bg-background/90 backdrop-blur-md shadow-card" : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/" aria-label="Sherman Ventures LLC home" className="shrink-0">
          <img src={logo.url} alt="Sherman Ventures LLC" className="h-9 w-auto sm:h-11" width={160} height={44} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              {isAdmin && (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin">Inbox</Link>
                </Button>
              )}
              <Button asChild size="sm">
                <Link to="/portal">Client portal</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth" search={{ mode: "signup" }}>Open an account</Link>
              </Button>
            </>
          )}
        </div>
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="animate-in fade-in slide-in-from-top-2 border-t bg-background px-5 pb-6 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col py-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-3.5 text-base font-medium">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button asChild variant="outline"><Link to="/admin" onClick={() => setOpen(false)}>Inbox</Link></Button>
                )}
                <Button asChild><Link to="/portal" onClick={() => setOpen(false)}>Client portal</Link></Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline"><Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link></Button>
                <Button asChild><Link to="/auth" search={{ mode: "signup" }} onClick={() => setOpen(false)}>Open an account</Link></Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
