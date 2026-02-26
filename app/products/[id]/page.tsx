"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import products from "@/lib/products";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  const imageSrc = product.image || "/images/products/placeholder.jpg";
  const gallery = useMemo(() => (product.gallery?.length ? product.gallery : [imageSrc]), [product, imageSrc]);
  const [activeImage, setActiveImage] = useState(gallery[0] ?? imageSrc);

  return (
    <main className="min-h-screen bg-[color:var(--page-bg)]">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-crystalBlue hover:text-crystalBlueDark"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to Products
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="mx-auto grid w-full max-w-[480px] grid-cols-3 gap-3 sm:grid-cols-6">
                {gallery.map((src) => {
                  const isActive = src === activeImage;
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(src)}
                      className={`overflow-hidden rounded-2xl border bg-[color:var(--surface)] transition ${
                        isActive
                          ? "border-crystalBlue shadow-[0_0_0_2px_rgba(26,60,110,0.2)]"
                          : "border-[color:var(--border)] hover:border-crystalBlue/60"
                      }`}
                      aria-label={`View ${product.name} image`}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 30vw, 120px"
                          className="object-contain"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-crystalBlue/10 px-3 py-1 text-xs font-semibold text-crystalBlue">
                {product.category}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
                {product.size}
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">{product.name}</h1>
              <p className="text-base text-[color:var(--text-muted)]">{product.description}</p>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 shadow-sm">
              <h2 className="text-sm font-semibold text-[color:var(--text-primary)]">Key Features</h2>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-muted)]">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span>✅</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-crystalBlue/20 bg-crystalBlue/5 px-5 py-4">
              <p className="text-sm font-semibold text-crystalBlue">Best For</p>
              <p className="mt-2 text-sm text-[color:var(--text-muted)]">{product.bestFor}</p>
            </div>

            <a
              href={`mailto:${product.contact}?subject=${encodeURIComponent(`Crystal Prompter Inquiry - ${product.name}`)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-crystalBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-crystalBlueDark"
            >
              <Mail className="h-4 w-4" strokeWidth={1.8} />
              Inquiry: {product.contact}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
