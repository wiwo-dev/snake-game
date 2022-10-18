export const PartBH = ({ size, fill = "#000000", stroke = "rgba(0,0,0,.8)" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H16.8333V10H20V20H3.33333V10H0V0Z" fill={fill} />
    </svg>
  );
};
