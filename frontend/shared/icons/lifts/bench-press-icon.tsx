export const BenchIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Bench structure */}
    <path d="M3 19h18M6 19v2M18 19v2" />
    {/* Body lying flat */}
    <circle cx="5.5" cy="16.5" r="1.5" />
    <path d="M7 17h11" />
    {/* Arms pressing bar up */}
    <path d="M10 17v-5M15 17v-5" />
    {/* Barbell at peak of press */}
    <path d="M7 11h10M7 11V9M17 11V9" />
  </svg>
);
