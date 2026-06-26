import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { Placeholder } from "./Placeholder";

interface Props {
  onClose: () => void;
}

export function MegaMenu({ onClose }: Props) {
  return (
    <div
      onMouseLeave={onClose}
      className="absolute left-0 right-0 top-full bg-cream border-t border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.15)] animate-fade-in"
    >
      <div className="mx-auto max-w-7xl px-8 py-12 grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr] gap-12">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
            Shop by category
          </div>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/shop"
                  search={{ category: c.id }}
                  onClick={onClose}
                  className="font-display text-2xl text-ink hover:text-blush transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
            Featured
          </div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" onClick={onClose} className="hover:underline">New arrivals</Link></li>
            <li><Link to="/shop" onClick={onClose} className="hover:underline">Best sellers</Link></li>
            <li><Link to="/shop" onClick={onClose} className="hover:underline">Travel kits</Link></li>
            <li><Link to="/shop" onClick={onClose} className="hover:underline">Gifts under ₹500</Link></li>
          </ul>
        </div>

        <Link to="/shop" onClick={onClose} className="group block">
          <Placeholder label="Editorial — Pocket routine" aspect="wide" />
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-xl">The Pocket Routine</span>
            <span className="text-xs tracking-[0.25em] uppercase group-hover:underline">
              Discover →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
