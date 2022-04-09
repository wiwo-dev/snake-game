import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function JoyStick({ direction, onDirectionChange }) {
  const svgRef = useRef();

  const handleJoyStickClick = (e) => {
    const fromLeft =
      (e.clientX - svgRef.current.getBoundingClientRect().x) / svgRef.current.getBoundingClientRect().width;
    const fromTop =
      (e.clientY - svgRef.current.getBoundingClientRect().y) / svgRef.current.getBoundingClientRect().height;
    if (fromLeft < 0.33 && fromTop > 0.33 && fromTop < 0.66) onDirectionChange("L");
    if (fromLeft > 0.66 && fromTop > 0.33 && fromTop < 0.66) onDirectionChange("R");
    if (fromTop < 0.33 && fromLeft > 0.33 && fromLeft < 0.66) onDirectionChange("U");
    if (fromTop > 0.33 && fromLeft > 0.33 && fromLeft < 0.66) onDirectionChange("D");
  };

  const getStyle = (direction) => {
    const perspective = "1500px";
    const angle = "15deg";
    switch (direction) {
      case "U":
        return { transform: `perspective(${perspective}) rotateX(${angle})` };
      case "D":
        return { transform: `perspective(${perspective}) rotateX(-${angle})` };
      case "L":
        return { transform: `perspective(${perspective}) rotateY(-${angle})` };
      case "R":
        return { transform: `perspective(${perspective}) rotateY(${angle})` };
      default:
        return { transform: "" };
    }
  };

  return (
    <>
      <motion.svg
        layout
        ref={svgRef}
        width="140"
        height="144"
        viewBox="0 0 140 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ ...getStyle(direction) }}
        onClick={handleJoyStickClick}>
        <g filter="url(#filter0_d_5_358)">
          <mask id="path-1-inside-1_5_358" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M95 6C95 2.68629 92.3137 0 89 0H51C47.6863 0 45 2.68629 45 6V39C45 42.3137 42.3137 45 39 45L6 45C2.68629 45 -1.44847e-07 47.6863 0 51L1.66103e-06 89C1.80588e-06 92.3137 2.68629 95 6 95H39C42.3137 95 45 97.6863 45 101V134C45 137.314 47.6863 140 51 140H89C92.3137 140 95 137.314 95 134V101C95 97.6863 97.6863 95 101 95H134C137.314 95 140 92.3137 140 89V51C140 47.6863 137.314 45 134 45L101 45C97.6863 45 95 42.3137 95 39V6Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M95 6C95 2.68629 92.3137 0 89 0H51C47.6863 0 45 2.68629 45 6V39C45 42.3137 42.3137 45 39 45L6 45C2.68629 45 -1.44847e-07 47.6863 0 51L1.66103e-06 89C1.80588e-06 92.3137 2.68629 95 6 95H39C42.3137 95 45 97.6863 45 101V134C45 137.314 47.6863 140 51 140H89C92.3137 140 95 137.314 95 134V101C95 97.6863 97.6863 95 101 95H134C137.314 95 140 92.3137 140 89V51C140 47.6863 137.314 45 134 45L101 45C97.6863 45 95 42.3137 95 39V6Z"
            fill="#92C300"
          />
          <path
            d="M101 45L101 43L101 45ZM134 45L134 47L134 45ZM39 45L39 43L39 45ZM51 2H89V-2H51V2ZM47 39V6H43V39H47ZM6 47L39 47L39 43L6 43L6 47ZM2 89L2 51L-2 51L-2 89L2 89ZM39 93H6V97H39V93ZM47 134V101H43V134H47ZM89 138H51V142H89V138ZM93 101V134H97V101H93ZM134 93H101V97H134V93ZM138 51V89H142V51H138ZM101 47L134 47L134 43L101 43L101 47ZM93 6V39H97V6H93ZM101 43C98.7909 43 97 41.2091 97 39H93C93 43.4183 96.5817 47 101 47L101 43ZM142 51C142 46.5817 138.418 43 134 43L134 47C136.209 47 138 48.7909 138 51H142ZM134 97C138.418 97 142 93.4183 142 89H138C138 91.2091 136.209 93 134 93V97ZM97 101C97 98.7909 98.7909 97 101 97V93C96.5817 93 93 96.5817 93 101H97ZM89 142C93.4183 142 97 138.418 97 134H93C93 136.209 91.2091 138 89 138V142ZM43 134C43 138.418 46.5817 142 51 142V138C48.7909 138 47 136.209 47 134H43ZM39 97C41.2091 97 43 98.7909 43 101H47C47 96.5817 43.4183 93 39 93V97ZM-2 89C-2 93.4183 1.58172 97 6 97V93C3.79086 93 2 91.2091 2 89L-2 89ZM6 43C1.58172 43 -2 46.5817 -2 51L2 51C2 48.7909 3.79086 47 6 47L6 43ZM43 39C43 41.2091 41.2091 43 39 43L39 47C43.4183 47 47 43.4183 47 39H43ZM89 2C91.2091 2 93 3.79086 93 6H97C97 1.58172 93.4183 -2 89 -2V2ZM51 -2C46.5817 -2 43 1.58172 43 6H47C47 3.79086 48.7909 2 51 2V-2Z"
            fill="black"
            mask="url(#path-1-inside-1_5_358)"
          />
          <mask id="path-3-inside-2_5_358" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M88 14C88 10.6863 85.3137 8 82 8H58C54.6863 8 52 10.6863 52 14V46C52 49.3137 49.3137 52 46 52H14C10.6863 52 8 54.6863 8 58V82C8 85.3137 10.6863 88 14 88H46C49.3137 88 52 90.6863 52 94V126C52 129.314 54.6863 132 58 132H82C85.3137 132 88 129.314 88 126V94C88 90.6863 90.6863 88 94 88H126C129.314 88 132 85.3137 132 82V58C132 54.6863 129.314 52 126 52H94C90.6863 52 88 49.3137 88 46V14Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M88 14C88 10.6863 85.3137 8 82 8H58C54.6863 8 52 10.6863 52 14V46C52 49.3137 49.3137 52 46 52H14C10.6863 52 8 54.6863 8 58V82C8 85.3137 10.6863 88 14 88H46C49.3137 88 52 90.6863 52 94V126C52 129.314 54.6863 132 58 132H82C85.3137 132 88 129.314 88 126V94C88 90.6863 90.6863 88 94 88H126C129.314 88 132 85.3137 132 82V58C132 54.6863 129.314 52 126 52H94C90.6863 52 88 49.3137 88 46V14Z"
            fill="#92C300"
          />
          <path
            d="M58 10H82V6H58V10ZM54 46V14H50V46H54ZM14 54H46V50H14V54ZM10 82V58H6V82H10ZM46 86H14V90H46V86ZM54 126V94H50V126H54ZM82 130H58V134H82V130ZM86 94V126H90V94H86ZM126 86H94V90H126V86ZM130 58V82H134V58H130ZM94 54H126V50H94V54ZM86 14V46H90V14H86ZM94 50C91.7909 50 90 48.2091 90 46H86C86 50.4183 89.5817 54 94 54V50ZM134 58C134 53.5817 130.418 50 126 50V54C128.209 54 130 55.7909 130 58H134ZM126 90C130.418 90 134 86.4183 134 82H130C130 84.2091 128.209 86 126 86V90ZM90 94C90 91.7909 91.7909 90 94 90V86C89.5817 86 86 89.5817 86 94H90ZM82 134C86.4183 134 90 130.418 90 126H86C86 128.209 84.2091 130 82 130V134ZM50 126C50 130.418 53.5817 134 58 134V130C55.7909 130 54 128.209 54 126H50ZM46 90C48.2091 90 50 91.7909 50 94H54C54 89.5817 50.4183 86 46 86V90ZM6 82C6 86.4183 9.58172 90 14 90V86C11.7909 86 10 84.2091 10 82H6ZM14 50C9.58172 50 6 53.5817 6 58H10C10 55.7909 11.7909 54 14 54V50ZM50 46C50 48.2091 48.2091 50 46 50V54C50.4183 54 54 50.4183 54 46H50ZM82 10C84.2091 10 86 11.7909 86 14H90C90 9.58172 86.4183 6 82 6V10ZM58 6C53.5817 6 50 9.58172 50 14H54C54 11.7909 55.7909 10 58 10V6Z"
            fill="black"
            mask="url(#path-3-inside-2_5_358)"
          />

          {/* <!-- UP --> */}
          <path
            d="M59.5407 36.25L69.5 19L79.4593 36.25H59.5407Z"
            fill={direction === "U" ? "black" : ""}
            stroke="black"
            strokeWidth="2"
          />

          {/* <!-- DOWN --> */}
          <path
            d="M79.4593 106.75L69.5 124L59.5407 106.75L79.4593 106.75Z"
            fill={direction === "D" ? "black" : ""}
            stroke="black"
            strokeWidth="2"
          />

          {/* <!-- RIGHT --> */}
          <path
            d="M124.941 70.4413L107.691 80.4006L107.691 60.4821L124.941 70.4413Z"
            fill={direction === "R" ? "black" : ""}
            stroke="black"
            strokeWidth="2"
          />

          {/* <!-- LEFT --> */}
          <path
            d="M17.9413 70.4413L35.1913 60.4821L35.1913 80.4006L17.9413 70.4413Z"
            fill={direction === "L" ? "black" : ""}
            stroke="black"
            strokeWidth="2"
          />
          <circle cx="70" cy="70" r="11" stroke="black" strokeWidth="2" />
        </g>
        <defs>
          <filter
            id="filter0_d_5_358"
            x="0"
            y="0"
            width="140"
            height="144"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5_358" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_358" result="shape" />
          </filter>
        </defs>
      </motion.svg>
    </>
  );
}
