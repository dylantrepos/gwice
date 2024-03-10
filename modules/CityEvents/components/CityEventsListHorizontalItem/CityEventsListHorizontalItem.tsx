import { ChevronRight } from 'lucide-react-native';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TitleItem } from '../../../../components/TitleItem/TitleItem';
import { type RootState } from '../../../../store/store';
import { useGetCityEvents } from '../../hooks/useGetCityEvents';
import { type CityEventCard } from '../../types/Events';
import { CityEventCardEmptyItem, CityEventCardItem } from '../CityEventCardItem/CityEventCardItem';
import style from './CityEventsListHorizontalItem.style';
import {
  type CityEventsListHorizontalItemRenderProps,
  type Props
} from './CityEventsListHorizontalItem.type';

export const CityEventsListHorizontalItem = ({ title, handleNavigation }: Props): ReactNode => {
  const { refetchCityEventHome } = useSelector((state: RootState) => state.generalReducer);
  const [eventList, setEventList] = useState<any[]>([]);
  const fakeWaitingData = Array(5)
    .fill(0)
    .map((_, index) => index);

  const { currentPeriod, startDate, endDate } = useSelector(
    (state: RootState) => state.eventReducer
  );

  const { isLoading, events, hasNextPage, fetchNextPage } = useGetCityEvents({
    refetchCityEventHome,
    categoryIdList: [],
    startDate,
    endDate,
    key: 'cityEventHome'
  });

  useEffect(() => {
    if (!isLoading && events) {
      const eventsListFinal = events.pages.map((page) => page?.events).flat();
      if (eventsListFinal && eventsListFinal.length > 0) {
        setEventList(eventsListFinal as CityEventCard[]);
      }
    }
  }, [events]);

  const CityEventsListHorizontalItemRender = useCallback(
    ({ item }: CityEventsListHorizontalItemRenderProps) =>
      eventList?.length > 0 ? (
        <CityEventCardItem event={item} period={currentPeriod} />
      ) : (
        <CityEventCardEmptyItem />
      ),
    [eventList]
  );

  return (
    <View style={style.culturalEvents}>
      <TitleItem.Pressable
        title={title}
        size="xl"
        handleNavigation={handleNavigation}
        rightIcon={ChevronRight}
      />
      <FlatList
        data={!isLoading ? eventList : fakeWaitingData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={CityEventsListHorizontalItemRender}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.culturalEventsCardsContainer}
        snapToAlignment="start"
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={315}
        onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
        contentContainerStyle={{
          columnGap: 15,
          paddingRight: 30
        }}
      />
    </View>
  );
};
