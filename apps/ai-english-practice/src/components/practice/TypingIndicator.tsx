export default function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm">
        <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide opacity-60">{name}</span>
        <span className="flex h-5 items-center gap-1" role="status" aria-label={`${name} is typing`}>
          {[0, 160, 320].map((delay) => (
            <span
              key={delay}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/50"
              style={{ animationDelay: `${delay}ms`, animationDuration: "900ms" }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
