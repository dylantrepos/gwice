import { StatusBar } from "expo-status-bar"
import { RefreshControl, ScrollView, View, Image, Pressable, Linking, TouchableOpacity, Modal, Dimensions, Platform } from "react-native"
import style from './CityEventView.style';
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchHome } from "../../../reducers/generalReducer";
import { Text } from "../../../components/Text/Text";
import { CityEventCardRequest, CityEventDetails, CityEventDetailsRequest } from "../../../types/Events";
import { BadgeEuro, Calendar, ChevronLeft, MapPin, X } from "lucide-react-native";
import PanPinchView from "react-native-pan-pinch-view";
import { getFormatedDateFromTimestamp } from "../../../utils/utils";
import { WarningScreenItem } from "../../../components/WarningScreenItem/WarningScreenItem";
import { useGetCityEventDetail } from "../../../hooks/useGetCityEvents";


type Props = {
  navigation: any;
  route: any;
}

export const CityEventView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = (open: boolean = true) => {
    setModalVisible(open);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setModalVisible(false);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const { eventId } = route.params;

  console.log('CityEventView.tsx: uid: ', eventId);

  const {isLoading, events, isError} = useGetCityEventDetail(eventId);

  if (isLoading) {
    return <WarningScreenItem type='loader' />; 
  }

  if (isError) {
    return <WarningScreenItem type='error' />; 
  }

  if (!isLoading && !events) {
    return <WarningScreenItem type='unavailable'>Cet événement n'est pas disponible.</WarningScreenItem>
  }

  const { 
    title, 
    image, 
    longDescription,
    firstTiming,
    lastTiming,
    location,
    conditions,
    links,
    'categories-metropolitaines': category
  } = (events as CityEventDetailsRequest).events[0] as CityEventDetails;

  console.log('CulturalEventsView.tsx: event: ', title);

  const imageSrc = `${image.base}${image.filename}`;
  const siteLink = links?.length > 0 ? links[0].link : null;
  const categoriesWithNoPrice = [5, 7, 8, 10, 11, 14, 18, 19];

  const descriptionFormat = longDescription['fr']?.replace(/<[^>]*>?/gm, '') ?? '';

  const conditionsPrice = conditions['fr'] && !category.map(cat => cat.id).find(catId => categoriesWithNoPrice.includes(catId));

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${location.latitude},${location.longitude}`;
  const locationMapUrl = Platform.select({
    ios: `${scheme}${location.name}@${latLng}`,
    android: `${scheme}${latLng}(${location.name})`
  }) ?? '';


  const today = new Date();
  const firstTimingDate = new Date(firstTiming.begin);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="auto" />
          <ScrollView 
                style={style.scrollView}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              > 
                 <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={style.backButton}
            >
              <ChevronLeft color={'black'} size={30}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenModal()}>
            <Image 
              style={style.image}
              source={{uri: imageSrc ?? ''}}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => handleOpenModal(false)}
          >
              <View style={{flex: 1, backgroundColor: 'black'}}>
                <TouchableOpacity 
                  style={style.closeImageButton}
                  onPress={() => handleOpenModal(false)}
                >
                  <X size={26} color={'red'} strokeWidth={1}/>
                </TouchableOpacity>
                <PanPinchView
                  minScale={1}
                  initialScale={1}
                  containerDimensions={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  }}
                  contentDimensions={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                >
                  <Image 
                      style={{width: '100%', height: '100%'}}
                      source={{uri: imageSrc ?? ''}}
                      resizeMode="contain"
                    />
                </PanPinchView>
              </View>
          </Modal>
          { title && <Text 
            styles={style.title}
            weight="600"
          >
            {title['fr']}
          </Text> }
          <View style={style.infosContainer}>
            <View style={style.infoContainer}>
              <Calendar size={20} color={'black'}/>
              <Text 
                styles={style.date}
              >
               {getFormatedDateFromTimestamp(firstTiming.begin) === getFormatedDateFromTimestamp(lastTiming.end) 
              ? `${getFormatedDateFromTimestamp(firstTiming.begin)}` 
              : firstTimingDate < today ? `Jusqu'au ${getFormatedDateFromTimestamp(lastTiming.end)}` : `Du ${getFormatedDateFromTimestamp(firstTiming.begin)} au ${getFormatedDateFromTimestamp(lastTiming.end)}`}
              </Text>
            </View>
            <View style={style.infoContainer}>
              <MapPin size={20} color={'black'}/>
              <Pressable
                onPress={() => {
                  Linking.openURL(locationMapUrl);
                }}
              >
                <Text 
                  styles={style.date}
                >
                  {`${location.name}\n${location.address}`}
                </Text>
              </Pressable>
            </View>
            { (conditionsPrice ?? null) && 
              <View style={style.infoContainer}>
                <BadgeEuro size={20} color={'black'}/>
                <Text 
                  styles={style.date}
                >
                  { conditions['fr'] ? `${conditions['fr']}` : 'Non spécifié' }
                </Text>
              </View>
            }
          </View>
          <Text 
            styles={style.description}
          >
            {longDescription['fr']}
          </Text> 
          { siteLink && <Pressable 
            style={style.link}
            onPress={() => {
              Linking.openURL(siteLink);
            }}
          >
            <Text 
              styles={style.linkText}
              weight="500"
            >
              Plus d'infos 
            </Text>
            <Text styles={style.linkUrl}>
              { siteLink }
            </Text>
          </Pressable> }
          {/* { contact?.email && <View>
            <Text 
              styles={style.linkText}
              weight="500">
              Email : {contact.email}
              </Text>
            </View>}
          { contact?.phone && <View>
            <Text 
              styles={style.linkText}
              weight="500">
              Téléphone : {contact.email}
              </Text>
            </View>} */}
          {/* { page && <Pressable 
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
          </Pressable> } */}
              </ScrollView>      
    </SafeAreaView>
  )
}
