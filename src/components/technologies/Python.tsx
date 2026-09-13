export default function Python({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={className}
    >
      <rect width="128" height="128" rx="24" fill="#3776AB" />
      <text
        x="64"
        y="64"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="46"
      >
        Py
      </text>
    </svg>
  );
}
