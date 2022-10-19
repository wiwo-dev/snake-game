export const PartCornerLeftBottom = ({ size, fill = "#000000", stroke = "rgba(0,0,0,.8)" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 20L3.16667 20L0 20L8.74228e-07 10L1.48619e-06 3L10 3L10 -8.74228e-07L16.6667 -2.91409e-07L16.6667 10L20 10L20 20Z"
        fill={fill}
      />
    </svg>
  );
};
