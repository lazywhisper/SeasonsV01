export function LeafIcon({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Leaf body */}
      <path
        d="M12 3C12 3 6 5 4 10C2 15 4 19 8 21C10 22 12 22 12 22C12 22 12 18 12 12C12 6 12 3 12 3Z"
        fill="#F5B563"
        stroke="#E09642"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3C12 3 18 5 20 10C22 15 20 19 16 21C14 22 12 22 12 22"
        fill="#F9D797"
        stroke="#E09642"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central vein */}
      <path
        d="M12 3L12 22"
        stroke="#E09642"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Side veins */}
      <path
        d="M12 8C12 8 15 9 16 11M12 13C12 13 15 13.5 16.5 15M12 8C12 8 9 9 8 11M12 13C12 13 9 13.5 7.5 15"
        stroke="#E09642"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
