interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  containerClassName?: string; // Add className for the container div
  iconClassName?: string; // Add className for the SVG icon
}

export default function NavbarIcon({
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
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className={`icon icon-hamburger ${iconClassName}`}
        fill="none"
        viewBox="0 0 18 16"
        {...props} // Spread remaining SVG props
      >
        <path
          d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}
