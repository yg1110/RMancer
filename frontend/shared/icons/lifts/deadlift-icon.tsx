export const DeadliftIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Ground */}
    <path d="M3 22h18" />
    {/* Heavy Barbell on floor */}
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <path d="M5 19h14" />
    {/* Human Figure in a powerful pulling/hinge stance */}
    <circle cx="12" cy="10" r="1.8" /> {/* Head */}
    <path d="M12 11.8c-1 1-3 2-3 4.2v5.5" /> {/* Left Side Hinge/Leg */}
    <path d="M12 11.8c1 1 3 2 3 4.2v5.5" /> {/* Right Side Hinge/Leg */}
    <path d="M10.5 13.5l-2.5 5.5" /> {/* Left Arm grabbing bar */}
    <path d="M13.5 13.5l2.5 5.5" /> {/* Right Arm grabbing bar */}
  </svg>
);
