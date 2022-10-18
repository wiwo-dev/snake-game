export const PartHead = ({ size, fill = "#000000", stroke = "rgba(0,0,0,.8)", direction = "R" }) => {
  let path = "";
  if (direction === "R") path = "M0 0L16 0L20 10L16 20L3.33333 20L3.33333 10H0L0 0Z";
  if (direction === "L")
    path = "M20 20L4 20L8.74228e-07 10L4 -1.39876e-06L16.6667 -2.91409e-07L16.6667 10L20 10L20 20Z";
  if (direction === "U") path = "M0 20L-6.99382e-07 4L10 -4.37114e-07L20 4L20 16.6667L10 16.6667L10 20L0 20Z";
  if (direction === "D")
    path = "M20 0L20 16L10 20L-6.99382e-07 16L-1.45705e-07 3.33333L10 3.33333L10 -4.37114e-07L20 0Z";

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d={path} fill={fill} />
    </svg>
  );
};
