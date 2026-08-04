export default function HexDivider() {
  return (
    <div className="hex-divider" aria-hidden="true">
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path
          d="M9 1L17 5.5V14.5L9 19L1 14.5V5.5L9 1Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M9 6L13 8.25V12.75L9 15L5 12.75V8.25L9 6Z"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
