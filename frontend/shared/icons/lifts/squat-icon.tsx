export const SquatIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Body in deep squat */}
    <circle cx="12" cy="9" r="1.5" />
    <path d="M12 10.5v2.5M12 13l-4 3v5M12 13l4 3v5" />
    {/* Barbell on upper back/shoulders */}
    <path d="M5 11h14M5 11V9M19 11V9" />
    {/* Downward movement hint */}
    <path d="M12 4v3M10 6l2 2 2-2" opacity="0.5" />
  </svg>
);
