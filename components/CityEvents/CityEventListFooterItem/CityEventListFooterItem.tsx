import { View } from "react-native";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";
import { Text } from "../../Text/Text";

type CityEventListFooterItemProps = {
  isLoading: boolean;
  eventLength: number;
}

export const CityEventListFooterItem = ({
  isLoading,
  eventLength
}: CityEventListFooterItemProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 40,
        width: '100%',
      }}
    >
      <Text
          styles={{
            textAlign: 'center',
          }}
        >
          {
            eventLength === 0 
            ? "Pas d'événements disponibles."
            : "Pas d'autres événements pour cette période."
          }
        </Text>
    </View>
  )
};