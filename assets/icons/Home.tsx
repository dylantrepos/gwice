import Svg, { Path, Circle } from "react-native-svg";

type Props = {
  style?: any,
  color: string,
  height?: number,
  width?: number,
}

export const Home = ({style, color, height, width}: Props) => (
  <Svg
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    style={style}
    height={height ?? 24}
    width={width ?? 24}
  >
    <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Path d="M9 22V12h6v10" />
  </Svg>
)