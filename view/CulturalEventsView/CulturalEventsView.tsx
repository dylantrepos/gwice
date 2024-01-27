import { StatusBar } from "expo-status-bar"
import { RefreshControl, ScrollView, View, Image, Pressable, Linking } from "react-native"
import style from './CulturalEventsView.style';
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchHome } from "../../reducers/generalReducer";
import { Text } from "../../components/Text/Text";
import { CulturalEvent } from "../../types/CulturalEvents";

type Props = {
  navigation: any;
  route: any;
}

export const CulturalEventsView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const { 
    title, 
    image, 
    date,
    description,
    location,
    link,
    page
  } = route.params.event as CulturalEvent;

  console.log('CulturalEventsView.tsx: event: ', title);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="auto" />
        <ScrollView 
          style={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        > 
          <Image 
            style={style.image}
            source={{uri: image}}
          />
          { title && <Text 
            styles={style.title}
            weight="600"
          >
            {title}
          </Text> }
          { date && <Text 
            styles={style.date}
          >
            {date}
          </Text> }
          { description && <Text 
            styles={style.description}
          >
            {description}
          </Text> }
          { location && <Text 
            styles={style.location}
          >
            Location : {location}
          </Text> }
          { link && <Pressable 
            style={style.link}
            onPress={() => {
              Linking.openURL(link);
            }}
          >
            <Text 
              styles={style.linkText}
              weight="500"
            >
              Plus d'infos 
            </Text>
            <Text styles={style.linkUrl}>
              {link}
            </Text>
          </Pressable> }
          { page && <Pressable 
            style={style.link}
            onPress={() => {
              Linking.openURL(page);
            }}
          >
            <Text 
              styles={style.linkText}
              weight="500"
            >
              Source 
            </Text>
            <Text styles={style.linkUrl}>
              {page}
            </Text>
          </Pressable> }
        </ScrollView>      
    </SafeAreaView>
  )
}
