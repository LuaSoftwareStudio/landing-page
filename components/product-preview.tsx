type PreviewVariant = "hero" | "ops" | "web" | "app";

const titles: Record<PreviewVariant, string> = {
  hero: "Produto",
  ops: "Operação",
  web: "Experiência",
  app: "Aplicativo",
};

export function ProductPreview({
  variant = "hero",
  className,
}: {
  variant?: PreviewVariant;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full min-h-[14.5rem] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.28)] ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 text-[11px] tracking-[0.16em] text-white/35 uppercase">
          {titles[variant]}
        </span>
      </div>
      <div className="grid min-h-0 flex-1 gap-4 overflow-hidden p-4 sm:grid-cols-[88px_1fr] sm:p-5">
        <div className="hidden min-h-0 flex-col gap-2 sm:flex">
          <span className="h-8 shrink-0 rounded-lg bg-white/8" />
          <span className="h-8 shrink-0 rounded-lg bg-white/5" />
          <span className="h-8 shrink-0 rounded-lg bg-white/5" />
          <span className="mt-auto h-8 shrink-0 rounded-lg bg-white/8" />
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <div className="flex shrink-0 items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="block h-2.5 w-24 rounded-full bg-white/20" />
              <span className="block h-7 w-40 rounded-md bg-white/12" />
            </div>
            <span className="h-8 w-24 rounded-full bg-white/10" />
          </div>
          {variant === "ops" ? (
            <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
              <span className="h-full min-h-16 rounded-xl bg-white/6" />
              <span className="h-full min-h-16 rounded-xl bg-white/8" />
              <span className="h-full min-h-16 rounded-xl bg-white/6" />
            </div>
          ) : null}
          {variant === "web" ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <span className="block min-h-0 flex-1 rounded-xl bg-white/8" />
              <span className="block h-2 w-5/6 shrink-0 rounded-full bg-white/10" />
              <span className="block h-2 w-2/3 shrink-0 rounded-full bg-white/8" />
            </div>
          ) : null}
          {variant === "app" ? (
            <div className="mx-auto flex min-h-0 w-28 flex-1 flex-col rounded-[22px] border border-white/10 bg-white/5 p-3">
              <span className="block h-2 w-10 shrink-0 rounded-full bg-white/20" />
              <span className="mt-4 block min-h-0 flex-1 rounded-xl bg-white/10" />
            </div>
          ) : null}
          {variant === "hero" ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
                <span className="h-full rounded-xl bg-white/8" />
                <span className="h-full rounded-xl bg-white/12" />
                <span className="h-full rounded-xl bg-white/7" />
              </div>
              <span className="block h-2 w-full shrink-0 rounded-full bg-white/8" />
              <span className="block h-2 w-4/5 shrink-0 rounded-full bg-white/6" />
              <span className="block h-2 w-3/5 shrink-0 rounded-full bg-white/6" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
