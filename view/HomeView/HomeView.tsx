import {
  Header,
  LargeHeader,
  ScalingView,
  ScrollViewWithHeaders
} from '@codeherence/react-native-header';
import { ChevronLeft } from 'lucide-react-native';
import { useCallback, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { CityBackgroundItem } from '../../components/CityBackgroundItem/CityBackgroundItem';
import { IconItem } from '../../components/IconItem/IconItem';
import { TextItem } from '../../components/TextItem/TextItem';
import { CityEventsListHorizontalItem } from '../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { setRefetchHome } from '../../reducers/generalReducer';

interface HomeViewProps {
  navigation: any;
  route: any;
}

const HeaderComponent = ({ showNavBar }) => {
  const insets = useSafeAreaInsets();
  return (
    <Header
      showNavBar={showNavBar}
      headerCenter={<TextItem size="xxl">{'Lille'}</TextItem>}
      headerStyle={{ height: 70 + insets.top }}
      headerLeft={
        <Pressable
          onPress={() => {
            // navigate.goBack();
          }}
          // style={style.headerIcon}
        >
          <IconItem IconElt={ChevronLeft} size={'md'} />
        </Pressable>
      }
    />
  );
};

const LargeHeaderComponent = ({ scrollY }) => (
  <LargeHeader>
    <ScalingView scrollY={scrollY} style={{ width: '100%' }}>
      <CityBackgroundItem />
    </ScalingView>
  </LargeHeader>
);

export const HomeView = ({ navigation, route }: HomeViewProps): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  // const { theme, currentCity, refetchHome, currentHomeViewDate } = useSelector(
  // (state: RootState) => state.generalReducer
  // );
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const dispatch = useDispatch();
  // const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollViewWithHeaders
      HeaderComponent={HeaderComponent}
      LargeHeaderComponent={LargeHeaderComponent}
      contentContainerStyle={{ paddingBottom: bottom }}
      absoluteHeader={true}
    >
      <View style={{ paddingVertical: 16 }}>
        {/* <CityBackgroundItem /> */}
        <CityEventsListHorizontalItem
          navigation={navigation}
          route={route}
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
        <Text>Some body text...</Text>
        <Text>Some body text...</Text>
        {Array.from({ length: 120 }, (_, i) => (
          <Text key={i}>Some body text...</Text>
        ))}
      </View>
    </ScrollViewWithHeaders>
  );

  // return (
  //   <Layout
  //     header={{
  //       headerTitle: t('screens.home.title'),
  //       headerTransparent: true
  //     }}
  //   >
  //     <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
  //       <CityBackgroundItem />
  //       <CityEventsListHorizontalItem
  //         navigation={navigation}
  //         route={route}
  //         title={t('screens.home.text.event')}
  //         handleNavigation={() => navigation.push('HomeCulturalEvent')}
  //       />
  //     </ScrollView>
  //   </Layout>
  // );
};
