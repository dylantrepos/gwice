import Svg, { Path, Circle } from "react-native-svg";

type Props = {
  style?: any
}

export const Sun = ({style}: Props) => (
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
    <Circle cx={12} cy={12} r={5} />
    <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  
  </Svg>
)