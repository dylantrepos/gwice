import Svg, { Path } from "react-native-svg";

type Props = {
  style?: any,
}

export const ChevronRight = ({style}: Props) => (
  <Svg
    fill="none"
    stroke="black"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    style={style}
    height={24}
    width={24}
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
)