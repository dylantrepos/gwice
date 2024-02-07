import { View } from "react-native";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";
import { Text } from "../../Text/Text";

type CityEventListFooterItemProps = {
  isLoading: boolean
}

export const CityEventListFooterItem = ({
  isLoading
}: CityEventListFooterItemProps) => {
  return (
    <View
      style={{
        padding: 20,
        width: '100%',
      }}
    >
      { isLoading ? (
          <WarningScreenItem 
            type="loader" 
          />
        ) : (
          <Text
            styles={{
              textAlign: 'center',
            }}
          >
            Il n'y a plus d'événements disponibles.
          </Text>
        )
      }
    </View>
  )
};