export const AppleSVG = ({ size, fill = "#DB4E4E", stroke = "rgba(0,0,0,.8)" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_101_34)">
        <path
          d="M18 28.728C19.8 28.728 21.3 30 22.8 30C26.4 30 30 20.4 30 15.336C29.9591 13.7817 29.3055 12.3065 28.1816 11.2321C27.0577 10.1576 25.5546 9.57098 24 9.60002C21.336 9.60002 19.2 11.328 18 12C16.8 11.328 14.664 9.60002 12 9.60002C10.4445 9.56781 8.93964 10.1534 7.81504 11.2285C6.69043 12.3036 6.03777 13.7806 6 15.336C6 20.4 9.6 30 13.2 30C14.7 30 16.2 28.728 18 28.728Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6001 6C16.8001 6.6 18.0001 8.4 18.0001 12"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_101_34">
          <rect width={36} height={36} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
