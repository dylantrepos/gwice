import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, Platform, Pressable, View, VirtualizedList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { IconItem } from '../../../components/atoms/IconItem';
import { TextItem } from '../../../components/atoms/TextItem';
import { useGetCityEvents } from '../../../hooks/useGetCityEvents';
import { Layout } from '../../../layouts/Layout';
import { setRefetchCityEventHome } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';
import palette from '../../../theme/palette';
import { EventCardEmptyItem } from '../components/molecules/EventCardEmptyItem';
import { EventCardItem } from '../components/molecules/EventCardItem';
import { CityEventListStickyHeaderItem } from '../components/organisms/CityEventListStickyHeaderItem';
import { type CityEventReturn } from '../types/CityEvent';
import { TypeTitle } from '../types/Constant';

interface EventCardProps {
  item: any;
  index: number;
}

export const CityEventsPageNew = (): ReactNode => {
  const [eventList, setEventList] = useState<CityEventReturn[]>([]);
  const [filteredCategoryIdList, setFilteredCategoryIdList] = useState<number[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(TypeTitle.Coming);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [topEvent, setTopEvent] = useState<CityEventReturn>();

  const { currentPeriod, customPeriod, startDate, endDate, searchValue, categoriesId } =
    useSelector((state: RootState) => state.eventReducer);
  const virtualizedRef = useRef<VirtualizedList<CityEventReturn> | null>(null);

  const { isLoading, data, hasNextPage, fetchNextPage, isError } = useGetCityEvents({
    refetchCityEventHome: refreshing,
    categoryIdList: categoriesId,
    startDate,
    endDate,
    search: searchValue,
    key: 'cityEventHome',
    activeTab
  });

  /**
   * useCallback
   */

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const CityHomeEventRender = useCallback(
    ({ item, index }: EventCardProps) => {
      if (index === 0 || isError) {
        return (
          <>
            {item}
            {eventList?.length === 0 && !isLoading && !isError && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Dimensions.get('window').height - headerHeight
                }}
              >
                <TextItem>{t('screens.events.text.noCurrentEvents')}</TextItem>
              </View>
            )}
          </>
        );
      }

      return eventList?.length > 0 && !isLoading ? (
        <>
          <EventCardItem
            event={item}
            period={currentPeriod}
            onTagPressed={handleClickTag}
            filteredCategory={categoriesId}
            large
          />
        </>
      ) : (
        <EventCardEmptyItem large />
      );
    },
    [eventList, isError]
  );

  const fakeWaitingData = Array(5)
    .fill(0)
    .map((_, index) => index);

  /**
   * useEffect
   */

  useEffect(() => {
    setEventList([]);
    virtualizedRef.current?.scrollToOffset({
      offset: headerHeight,
      animated: true
    });
  }, [filteredCategoryIdList, currentPeriod, activeTab, customPeriod, searchValue]);

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const eventsListFinal = data.pages.map((page) => page?.events).flat();
      if (eventsListFinal) {
        setEventList(eventsListFinal as CityEventReturn[]);
        if (eventsListFinal.length > 0) {
          setTopEvent(eventsListFinal[0]);
        }
      }
    } else {
      setEventList([]);
    }
  }, [data, isError]);

  /**
   * Funtions
   */

  const handleClickTag = (categoryId: number): void => {
    const index = filteredCategoryIdList.indexOf(categoryId);

    setFilteredCategoryIdList(
      index === -1
        ? [...filteredCategoryIdList, categoryId]
        : filteredCategoryIdList.filter((cat) => cat !== categoryId)
    );
  };

  return (
    <Layout>
      <VirtualizedList
        contentContainerStyle={{ minHeight: '100%' }}
        data={[
          <CityEventListStickyHeaderItem
            filteredCategoryIdList={filteredCategoryIdList}
            handleSetFilteredCategoryIdList={setFilteredCategoryIdList}
            handleUpdateActiveTab={setActiveTab}
          />,
          ...(!isLoading ? eventList : fakeWaitingData)
        ]}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data?.length}
        getItemLayout={(_, index) => ({ length: 450, offset: 450 * index, index })}
        initialNumToRender={1}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => `${item?.uid?.toString()}-${index}` ?? `header-${index}`}
        ListHeaderComponent={
          <View
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              console.log('height', height);
              setHeaderHeight(height);
            }}
            style={{
              backgroundColor: '#A98BFE',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <LinearGradient
              colors={['#340696', '#9E3EFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 20,
                width: '100%'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  gap: 10
                  // maxWidth: 300
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    ...Platform.select({
                      android: {
                        elevation: 5
                      }
                    })
                  }}
                >
                  <Image
                    source={require('../../../assets/images/samples/event-example.jpg')}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 15,
                      alignSelf: 'center',
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84
                        }
                      })
                    }}
                  />
                </View>
                <View
                  style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                    // justifyContent: 'center'
                  }}
                >
                  <TextItem weight="semiBold" size="xl" color={palette.whitePrimary}>
                    {'Les immanquables\nde la semaine'}
                  </TextItem>
                  <Pressable
                    onPress={() => {}}
                    style={{
                      borderRadius: 100,
                      borderColor: 'white',
                      borderWidth: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-start'
                    }}
                  >
                    <TextItem weight="light" size="md" color={palette.whitePrimary}>
                      Découvrir
                    </TextItem>
                    <IconItem IconElt={ChevronRight} size="sm" color={palette.whitePrimary} />
                  </Pressable>
                </View>
              </View>

              {/* <Pressable
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  alignItems: 'center'
                }}
              >
                <LinearGradient
                  colors={['rgba(96,64,225,1)', 'rgba(232,144,63,1)']}
                  style={{
                    borderRadius: 100,
                    // width: '100%',
                    // maxWidth: 400,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: 10
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <IconItem IconElt={PlusCircle} color="white" size="md" stroke="light" />
                  <TextItem color="white" weight="semiBold">
                    Create an event
                  </TextItem>
                </LinearGradient>
              </Pressable> */}
            </LinearGradient>
          </View>
        }
        maxToRenderPerBatch={10}
        onEndReached={async () => {
          if (hasNextPage && !isError) await fetchNextPage();
        }}
        onEndReachedThreshold={5}
        ref={virtualizedRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        removeClippedSubviews={false}
        renderItem={CityHomeEventRender}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[1]}
        windowSize={21}
      />
    </Layout>
  );
};
