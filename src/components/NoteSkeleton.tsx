export function NoteSkeleton() {
  return (
    <article className="mt-6 space-y-4">
      {/* Home Button */}
      <div className="h-4 w-24 skeleton-shimmer rounded mb-4"></div>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-4">
        <div className="h-4 w-16 skeleton-shimmer rounded"></div>
        <div className="h-3 w-3 skeleton-shimmer rounded-full"></div>
        <div className="h-4 w-20 skeleton-shimmer rounded"></div>
        <div className="h-3 w-3 skeleton-shimmer rounded-full"></div>
        <div className="h-4 w-24 skeleton-shimmer rounded"></div>
      </nav>

      {/* Title */}
      <div className="h-8 w-3/4 skeleton-shimmer rounded"></div>

      {/* Date */}
      <div className="h-4 w-32 skeleton-shimmer rounded"></div>

      {/* Content */}
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <div className="h-4 w-full skeleton-shimmer rounded"></div>
          <div className="h-4 w-full skeleton-shimmer rounded"></div>
          <div className="h-4 w-5/6 skeleton-shimmer rounded"></div>
        </div>
        <div className="space-y-2 mt-6">
          <div className="h-4 w-full skeleton-shimmer rounded"></div>
          <div className="h-4 w-4/5 skeleton-shimmer rounded"></div>
          <div className="h-4 w-full skeleton-shimmer rounded"></div>
        </div>
        {/* Code block */}
        <div className="h-32 w-full skeleton-shimmer rounded mt-6"></div>
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full skeleton-shimmer rounded"></div>
          <div className="h-4 w-full skeleton-shimmer rounded"></div>
          <div className="h-4 w-3/4 skeleton-shimmer rounded"></div>
        </div>
      </div>
    </article>
  );
}
