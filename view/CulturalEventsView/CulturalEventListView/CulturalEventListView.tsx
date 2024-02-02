import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome } from "../../../reducers/generalReducer";
import { RootState } from "../../../store/store";
import { CulturalEventsItem } from "../../../components/CulturalEvents/CulturalEventsItem/CulturalEventsItem";
import { PageHeaderLayout } from "../../../layouts/PageHeaderLayout";
import { eventsCategory } from "../../../utils/culturalEvents";
import { FlatList, View, ViewToken } from "react-native";

type Props = {
  navigation: any;
  route: any;
}

type Comp = Record<string, JSX.Element>;

export const CulturalEventListView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const { currentCity, refetchHome } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();

  const [comp, setComp] = useState<Comp>({}); // Store data for each category

  const fetchCategoryData = async (category: string, id: number) => {
    if (!comp[category]) {
      console.log('OUi : ', category);
      // console.log('CulturalEventListView.tsx: new category: ', category);

      setComp(prevComp => ({ 
        ...prevComp, 
        [category]: (
          <CulturalEventsItem 
          navigation={navigation}
          route={route}
          title={category}
          handleNavigation={() => {}}
          category={id}
          />
         ) 
      }));

      // console.log('CulturalEventListView.tsx: updated data: ', comp);
    }
  };

  type OnViewableItemsChanged = {changed: ViewToken[], viewableItems: ViewToken[]}

  const onViewableItemsChanged = useCallback(async ({ viewableItems }: OnViewableItemsChanged) => {
    console.log('onViewableItemsChanged called ');
    for (const viewableItem of viewableItems) {
      const [title, id] = viewableItem.item;
      await fetchCategoryData(title, id);
    }
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // console.log('CulturalEventListView.tsx: allEvents: ', allEvents);

  return (
    <PageHeaderLayout
      title={'Événements culturels'}
    >
      <FlatList
        data={Object.entries(eventsCategory)}
        renderItem={({ item }) => {
          const [title, id] = item;
          return (
            comp[title] ?? <View 
            style={{
              height: 300,
            }}
            ></View>
          )
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ 
          itemVisiblePercentThreshold: 2,

        }} // Adjust as needed
      />
    </PageHeaderLayout>
  )
}
