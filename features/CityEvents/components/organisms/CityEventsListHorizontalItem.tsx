import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetCityEvents } from '../../../../hooks/useGetCityEvents';
import { type RootState } from '../../../../store/store';
import style from '../../styles/organisms/CityEventsListHorizontalItem.style';
import { type CityEventsListHorizontalItemRenderProps } from '../../types/CityEventsListHorizontalItem.type';
import { type CityEventCard } from '../../types/Events';
import { EventCardEmptyItem } from '../molecules/EventCardEmptyItem';
import { EventCardItem } from '../molecules/EventCardItem';

export const CityEventsListHorizontalItem = (): ReactNode => {
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
        <EventCardItem event={item} period={currentPeriod} />
      ) : (
        <EventCardEmptyItem />
      ),
    [eventList]
  );

  const handleReachingEnd = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  return (
    <View style={style.culturalEvents}>
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
        onEndReached={handleReachingEnd}
        contentContainerStyle={{
          columnGap: 15,
          paddingRight: 30
        }}
      />
    </View>
  );
};
