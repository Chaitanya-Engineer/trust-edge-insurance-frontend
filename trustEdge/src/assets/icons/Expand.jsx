export const Expand = ({
  fill = "none",
  width = "28px",
  height = "28px",
  className,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.6663 9.99967V3.33301M24.6663 3.33301H17.9997M24.6663 3.33301L16.6663 11.2383M9.99967 24.6663L3.33301 24.697V17.9997M11.333 16.6663L3.33301 24.6663"
        stroke="#5F5BD5"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
