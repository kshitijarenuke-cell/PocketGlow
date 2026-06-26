import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useCartCount } from "@/lib/cart-store";

export function Navbar(_: { transparentOnTop?: boolean } = {}) {
  const [megaOpen, setMegaOpen] = useState(false);
  const count = useCartCount();

  return (
    <header
      className="sticky top-0 z-50 border-b text-foreground"
      style={{ backgroundColor: "var(--navbar)" }}
    >
      <nav className="relative mx-auto max-w-7xl px-6 md:px-8 h-[76px] grid grid-cols-3 items-center">
        <div className="flex items-center gap-7 text-[11px] tracking-[0.3em] uppercase">
          <button
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen((v) => !v)}
            className="hover:opacity-60 transition-opacity"
          >
            Shop
          </button>
          <Link to="/about" className="hover:opacity-60 transition-opacity">
            About
          </Link>
        </div>

        <Link
          to="/"
          className="justify-self-center font-display text-2xl md:text-[28px] tracking-tight"
        >
          PocketGlow Essentials
        </Link>

        <div className="justify-self-end flex items-center gap-5">
          <button aria-label="Search" className="hover:opacity-60 hidden sm:block">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/login" aria-label="Account" className="hover:opacity-60 hidden sm:block">
            <User className="h-4 w-4" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative flex items-center gap-2 hover:opacity-60">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </div>

        {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      </nav>
    </header>
  );
}
