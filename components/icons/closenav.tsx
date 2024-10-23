interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  containerClassName?: string; // Add className for the container div
  iconClassName?: string; // Add className for the SVG icon
}

export default function CloseIcon({
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
        className={`icon icon-close ${iconClassName}`}
        fill="none"
        viewBox="0 0 18 17"
      >
        <path
          d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}
