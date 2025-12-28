export const OverheadPressIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Body standing tall */}
    <circle cx="12" cy="11" r="1.5" />
    <path d="M12 12.5v5.5M10 22l1-4h2l1 4" />
    {/* Arms fully locked out upwards */}
    <path d="M9 12l1-7M15 12l-1-7" />
    {/* Barbell at maximum height */}
    <path d="M7 5h10M7 5V3M17 5V3" />
    {/* Upward drive hint */}
    <path d="M12 18v-3M10 16l2-2 2 2" opacity="0.3" />
  </svg>
);
