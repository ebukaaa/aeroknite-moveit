import { Svg, G, Path, Circle } from "./utils";

export function useSearchSVG({ size, style }) {
  return (
    <Svg
      height={(241 / 240) * size}
      viewBox="0 0 240 241"
      width={size}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <G
        fill="none"
        fillRule="evenodd"
        filter="url(#prefix__a)"
        transform="translate(26 22)"
      >
        <Path
          d="M70.173 135.544a9.969 9.969 0 012.93 7.071c0 2.56-.977 5.119-2.93 7.071l-36.77 36.77c-3.71 3.71-8.572 5.565-13.434 5.565s-9.725-1.855-13.435-5.565S.969 177.883.969 173.02a18.94 18.94 0 015.565-13.435l36.77-36.77a9.969 9.969 0 017.07-2.929c2.56 0 5.119.977 7.071 2.93z"
          stroke="#d8a657"
          strokeLinejoin="round"
          strokeWidth={10}
        />
        <Path
          d="M69.11 103.737l19.8 19.799-12.728 12.727-19.799-19.799z"
          fill="#d8a657"
        />
        <G transform="translate(60.646)">
          <Circle
            cx={65.5}
            cy={65.5}
            r={70.5}
            stroke="#d8a657"
            strokeWidth={10}
          />
          <Path
            d="M18.367 40.166C14.305 47.706 12 56.334 12 65.5 12 95.047 35.953 119 65.5 119S119 95.047 119 65.5 95.047 12 65.5 12c-9.765 0-18.919 2.616-26.799 7.186"
            stroke="#d8a657"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={5}
          />
          <Circle cx={65.5} cy={65.5} r={57.5} />
          <Path
            d="M29.762 26.876a2.756 2.756 0 00-3.958-.071 2.755 2.755 0 000 3.89 2.756 2.756 0 003.892 0 2.753 2.753 0 00.066-3.819z"
            stroke="#d8a657"
            strokeWidth={3}
          />
        </G>
      </G>
    </Svg>
  );
}
export default useSearchSVG;
