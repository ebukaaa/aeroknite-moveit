import { Svg, G, Path } from "./utils";

export function useHomeSVG({ width, height = width, fill, style }) {
  return (
    <Svg
      height={height}
      viewBox="0 0 217 217"
      width={width}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <G
        fill={!fill ? "none" : fill}
        filter="url(#prefix__a)"
        stroke="#d8a657"
        strokeWidth={10}
        transform="translate(11 5)"
      >
        <Path d="M193.654 86.555l-.013-.013-81.185-81.173A18.199 18.199 0 0099.501 0a18.203 18.203 0 00-12.956 5.367L5.403 86.499l-.082.084c-7.106 7.146-7.094 18.741.035 25.87a18.216 18.216 0 0012.157 5.342c.187.018.376.027.565.027h3.236v59.739c0 11.82 9.62 21.439 21.444 21.439H74.52a5.83 5.83 0 005.831-5.83v-46.835c0-5.394 4.388-9.782 9.783-9.782h18.734c5.395 0 9.783 4.388 9.783 9.782v46.835a5.83 5.83 0 005.831 5.83h31.762c11.825 0 21.444-9.618 21.444-21.44v-59.738h3c4.893 0 9.494-1.905 12.957-5.367 7.137-7.14 7.14-18.755.01-25.9z" />
      </G>
    </Svg>
  );
}
export default useHomeSVG;
