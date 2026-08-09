export const Clock = ({
  fill = "#ABA8FF",
  width = "48px",
  height = "48px",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.5"
        x="0.84375"
        width="48"
        height="48"
        rx="24"
        fill={fill}
      />
      <g clip-path="url(#clip0_5375_891)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 24C15 21.3478 16.0536 18.8043 17.9289 16.9289C19.8043 15.0536 22.3478 14 25 14C27.6522 14 30.1957 15.0536 32.0711 16.9289C33.9464 18.8043 35 21.3478 35 24C35 26.6522 33.9464 29.1957 32.0711 31.0711C30.1957 32.9464 27.6522 34 25 34C22.3478 34 19.8043 32.9464 17.9289 31.0711C16.0536 29.1957 15 26.6522 15 24ZM24.3333 24V18H25.6667V23.724L29.472 27.528L28.528 28.472L24.528 24.472C24.4661 24.41 24.4171 24.3364 24.3837 24.2554C24.3503 24.1744 24.3332 24.0876 24.3333 24Z"
          fill="#ABA8FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_5375_891">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(15 14)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Clock;
