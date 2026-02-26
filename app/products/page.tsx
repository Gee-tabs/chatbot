"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import products from "@/lib/products";

const FILTERS = ["All", "Portable", "Spot", "Cue", "Framer", "Mime"] as const;

type Filter = (typeof FILTERS)[number];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[color:var(--page-bg)]">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-crystalBlue">Products</p>
          <h1 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">Crystal Prompter Lineup</h1>
          <p className="max-w-2xl text-base text-[color:var(--text-muted)]">
            Explore professional teleprompters built for broadcasting, education, speeches, and content creation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                activeFilter === filter
                  ? "border-crystalBlue bg-crystalBlue text-white"
                  : "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-muted)] hover:border-crystalBlue/40 hover:text-crystalBlue"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-5 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{product.name}</h3>
                  <span className="rounded-full bg-crystalBlue/10 px-3 py-1 text-xs font-semibold text-crystalBlue">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--text-muted)]">{product.description}</p>
                <div className="mt-auto pt-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-crystalBlue hover:text-crystalBlueDark"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
