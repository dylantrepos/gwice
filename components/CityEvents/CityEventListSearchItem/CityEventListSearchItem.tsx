import { Search } from "lucide-react-native";
import style from './CityEventListSearchItem.style';
import { Text } from "../../Text/Text";
import { Animated, Image, ImageBackground, Pressable, View } from "react-native";


export const CityEventListSearchItem = () => {
  return (
    <Pressable
      style={style.searchEvent}
    >
      <Search
        size={22}
        color="black"
        strokeWidth={2}
        style={style.searchEventIcon}
      />
      <Text
        styles={style.searchEventTitle}
      >
        Rechercher un événement
      </Text>
    </Pressable>
  )
}

