import { View } from "react-native";
import { CityEventCardLargeItem } from "../CityEventCardItem/CityEventCardItem";
import { useGetCityEvents } from "../../../hooks/useGetCityEvents";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";

type CityEventsListVerticalItemProps = {
  refetchCityEventHome: boolean;
  category?: number;
  navigation: any;
  filteredCategoryIdList?: number[];
  route: any;
}

export const CityEventsListVerticalItem = ({
  navigation, 
  route,
  refetchCityEventHome,
  filteredCategoryIdList
}: CityEventsListVerticalItemProps) => {
  const {
    isLoading, 
    events, 
    isError
  } = useGetCityEvents({
    refetchCityEventHome, 
    categoryIdList: filteredCategoryIdList
  });

  if (!events) return null;

  return (
    <View
    // style={style.cardList}
  >
    { isLoading || isError ?
          <WarningScreenItem
            type={isLoading ? 'loader' : 'error'}
          />
          : events && events?.total > 0 ?
            events.events.map((event, index) => (
              <CityEventCardLargeItem 
                key={`card-${index}`}
                navigation={navigation}
                route={route}
                event={event}
              />
            ))
            : <WarningScreenItem
                type={'unavailable'}
              >Événements non disponible.</WarningScreenItem> 
      }
    </View>
  )
};
