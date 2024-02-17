import { View } from "react-native";
import { TextItem } from "../../../../components/TextItem/TextItem";

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
        height: 600,
      }}
    >
      <TextItem
          styles={{
            textAlign: 'center',
          }}
        >
          {
            eventLength === 0 
            ? "Pas d'événements disponibles."
            : "Pas d'autres événements pour cette période."
          }
        </TextItem>
    </View>
  )
};