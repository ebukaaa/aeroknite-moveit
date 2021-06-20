import { Svg, G, Path, Circle } from "./utils";

export function useTruckSVG({ size, style, fill }) {
  return (
    <Svg
      height={(113 / 190) * size}
      viewBox="0 0 190 113"
      width={size}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <G fill="none" fillRule="evenodd" transform="translate(1.6 3)">
        <Path
          d="M25.428 88H2.046A1.054 1.054 0 011 86.937V1.063C1 .476 1.468 0 2.046 0h111.908c.578 0 1.046.476 1.046 1.063V88H53.788"
          stroke={!fill ? "#a46503" : fill}
          strokeWidth={5}
        />
        <Path
          d="M66.239 14.488c-1.39-1.013-3.162-.397-3.957 1.375-.795 1.773-.312 4.03 1.079 5.043l12.217 8.898H18.3c-1.601 0-2.9 1.655-2.9 3.696s1.299 3.696 2.9 3.696h57.278l-12.217 8.898c-1.39 1.012-1.874 3.27-1.08 5.043.536 1.194 1.515 1.863 2.522 1.863.488 0 .982-.157 1.436-.488l21.7-15.803c.903-.658 1.461-1.882 1.461-3.21 0-1.326-.558-2.55-1.461-3.209z"
          fill={!fill ? "#a46503" : fill}
        />
        <G stroke={!fill ? "#a46503" : fill} strokeWidth={5}>
          <Path d="M145.473 87.877L115.51 88m30.797.252l-30.797.272v-40l46.386-3.024 22.395 8.37a2 2 0 011.377 1.901V76.66a2 2 0 01-.118.677l-1.537 4.27a2 2 0 01-.796 1.001L174.882 88" />
          <Path
            d="M115.4 11.5h31.245a6 6 0 015.565 3.757L164.4 45.5h-49z"
            strokeLinejoin="round"
          />
          <G fill={!fill ? "#a46503" : fill} strokeLinecap="square">
            <Path d="M119.9 23.5h34M141.752 25.554l6.296 16.892" />
          </G>
          <Circle cx={160.62} cy={92.22} r={14.72} />
        </G>
        <Circle cx={160.4} cy={92} fill={!fill ? "#a46503" : fill} r={6} />
        <Circle
          cx={39.62}
          cy={92.22}
          r={14.72}
          stroke={!fill ? "#a46503" : fill}
          strokeWidth={5}
        />
        <Circle cx={39.4} cy={92} fill={!fill ? "#a46503" : fill} r={6} />
        <G
          stroke={!fill ? "#a46503" : fill}
          strokeLinecap="round"
          strokeWidth={5}
        >
          <Path d="M.9 66.5h169" strokeLinejoin="round" />
          <Path d="M181.9 66.5h3.768" />
        </G>
      </G>
    </Svg>
  );
}
export default useTruckSVG;
