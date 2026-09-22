'use client';

interface LoadingSkeletonProps {
  className?: string;
  label?: string;
}

/** Shimmering placeholder shown while an embed is off-screen or loading. */
export function LoadingSkeleton({ className = '', label = 'Loading embed' }: LoadingSkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`relative overflow-hidden rounded-md bg-gray-800 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-gray-700/60 to-transparent" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
