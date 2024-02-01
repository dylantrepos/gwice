import { useCallback,  useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome } from "../../../reducers/generalReducer";
import { RootState } from "../../../store/store";
import { CulturalEventsItem } from "../../../components/CulturalEvents/CulturalEventsItem/CulturalEventsItem";
import { PageHeaderLayout } from "../../../layouts/PageHeaderLayout";
import { eventsCategory } from "../../../utils/culturalEvents";



type Props = {
  navigation: any;
  route: any;
}

export const CulturalEventListView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const { currentCity, refetchHome } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();

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
      refetch={onRefresh}
    >
      { Object.entries(eventsCategory).map(([key, value], index) => {
        return (
          <CulturalEventsItem
            key={index}
            navigation={navigation}
            route={route}
            title={key}
            handleNavigation={() => navigation.push('CulturalEventList')}
            category={value}
          />
        )
      })}
    </PageHeaderLayout>
  )
}
