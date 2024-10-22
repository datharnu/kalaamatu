interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  containerClassName?: string; // Add className for the container div
  iconClassName?: string; // Add className for the SVG icon
}

export default function SearchIcon({
  width = 16,
  height = 16,
  containerClassName = "", // Default to empty string
  iconClassName = "", // Default to empty string
  ...props
}: Props) {
  return (
    <div
      className={containerClassName}
      style={{
        color: "rgb(var(--color-foreground))",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        id="search"
        className={`icon icon-search ${iconClassName}`}
        {...props}
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="rgb(var(--color-foreground))"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          transform="translate(2 2)"
        >
          <circle cx="9.767" cy="9.767" r="8.989"></circle>
          <line x1="16.018" x2="19.542" y1="16.485" y2="20"></line>
        </g>
      </svg>
    </div>
  );
}
