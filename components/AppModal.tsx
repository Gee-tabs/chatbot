"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type AppModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  action?: ReactNode;
  sidePanel?: ReactNode;
  hidePrimary?: boolean;
  maxWidthClass?: string;
  panelClassName?: string;
  children?: ReactNode;
};

export default function AppModal({
  open,
  title,
  description,
  onClose,
  action,
  sidePanel,
  hidePrimary = false,
  maxWidthClass,
  panelClassName,
  children,
}: AppModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  const wrapperMaxWidth = sidePanel && !hidePrimary ? "max-w-6xl" : maxWidthClass ?? "max-w-lg";
  const wrapperLayout = sidePanel && !hidePrimary ? "flex-col lg:flex-row" : "flex-col";
  const primaryPanelMax = panelClassName ?? "max-w-lg";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 py-10">
      <div className={`flex w-full gap-6 ${wrapperMaxWidth} ${wrapperLayout}`}>
        {!hidePrimary && (
          <div
            className={`w-full rounded-3xl border border-slate-200 bg-slate-100 p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${primaryPanelMax}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-bold leading-tight">{title}</h2>
                  {action}
                </div>
                {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-blue-400/60 hover:text-blue-500"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            {children && <div className="mt-5">{children}</div>}
          </div>
        )}

        {sidePanel && (
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-slate-100 p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            {sidePanel}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
