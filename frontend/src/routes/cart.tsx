import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { useCart, cartStore } from "@/lib/cart-store";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const lines = items
    .map((i) => {
      const p = getProduct(i.id);
      return p ? { product: p, quantity: i.quantity } : null;
    })
    .filter((x): x is { product: ReturnType<typeof getProduct> & {}; quantity: number } => !!x);
  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 79;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 md:px-8 py-16">
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Your bag
          </div>
          <h1 className="font-display text-5xl md:text-6xl">Cart</h1>
        </div>

        {lines.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground mb-8">Your bag is empty.</p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-ink text-cream text-[11px] tracking-[0.3em] uppercase px-8 py-3.5"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
            <div className="divide-y divide-border border-y border-border">
              {lines.map(({ product, quantity }) => (
                <div key={product!.id} className="py-6 grid grid-cols-[100px_1fr_auto] gap-5 items-center">
                  <Link to="/product/$id" params={{ id: product!.id }} className="block">
                    <Placeholder
                      src={product!.images[0]?.src}
                      alt={product!.images[0]?.alt}
                      label={product!.images[0]?.label}
                      aspect="square"
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link
                      to="/product/$id"
                      params={{ id: product!.id }}
                      className="font-display text-lg hover:underline"
                    >
                      {product!.name}
                    </Link>
                    <div className="mt-1 text-xs text-muted-foreground">{product!.tagline}</div>
                    <div className="mt-3 inline-flex items-center border border-ink/30 rounded-full">
                      <button
                        onClick={() => cartStore.setQty(product!.id, quantity - 1)}
                        className="px-2.5 py-1.5 hover:opacity-60"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-xs tabular-nums w-7 text-center">{quantity}</span>
                      <button
                        onClick={() => cartStore.setQty(product!.id, quantity + 1)}
                        className="px-2.5 py-1.5 hover:opacity-60"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="tabular-nums">₹{product!.price * quantity}</div>
                    <button
                      onClick={() => cartStore.remove(product!.id)}
                      className="mt-3 inline-flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-ink"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-beige rounded-3xl p-8 h-fit lg:sticky lg:top-24">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">
                Summary
              </div>
              <div className="space-y-3 text-sm">
                <Row label="Subtotal" value={`₹${subtotal}`} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
              </div>
              <div className="mt-6 pt-6 border-t border-ink/20 flex justify-between font-display text-xl">
                <span>Total</span>
                <span className="tabular-nums">₹{subtotal + shipping}</span>
              </div>
              <button
                onClick={() => alert("Checkout placeholder")}
                className="mt-8 w-full rounded-full bg-ink text-cream text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-ink/90 transition-colors"
              >
                Checkout
              </button>
              <p className="mt-4 text-[11px] text-muted-foreground text-center">
                Taxes and discounts calculated at checkout.
              </p>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
