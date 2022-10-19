export const PartBV = ({ size, fill = "#000000", stroke = "rgba(0,0,0,.8)" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 0L20 16.8333L10 16.8333L10 20L-8.74228e-07 20L-1.45705e-07 3.33333L10 3.33333L10 -4.37114e-07L20 0Z"
        fill={fill}
      />
    </svg>
  );
};
