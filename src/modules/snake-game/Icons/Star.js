export const StarSVG = ({ size, fill = "black" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="{fill}" xmlns="http://www.w3.org/2000/svg">
      <rect y={7} width={6} height={6} />
      <rect x={14} y={7} width={6} height={6} />
      <rect x={7} width={6} height={6} />
      <rect x={7} y={14} width={6} height={6} />
    </svg>
  );
};
