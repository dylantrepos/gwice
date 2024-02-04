import { StatusBar } from "expo-status-bar"
import { RefreshControl, ScrollView, View, Image, Pressable, Linking, TouchableOpacity, Modal, Animated, Dimensions, Platform } from "react-native"
import style from './CulturalEventsView.style';
import { SafeAreaView } from "react-native-safe-area-context";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchHome } from "../../reducers/generalReducer";
import { Text } from "../../components/Text/Text";
import { CulturalEvent, LilleCulturalEvent } from "../../types/Events";
import { BadgeEuro, Calendar, MapPin, X } from "lucide-react-native";
import PanPinchView from "react-native-pan-pinch-view";
import { open } from "fs";
import { getFormatedDateFromTimestamp } from "../../utils/utils";


type Props = {
  navigation: any;
  route: any;
}

export const CulturalEventsView = ({
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

  const { 
    title, 
    image, 
    longDescription,
    firstTiming,
    lastTiming,
    location,
    conditions,
    links,
    category
  } = route.params.event as LilleCulturalEvent;

  console.log('CulturalEventsView.tsx: event: ', title);

  const imageSrc = `${image.base}${image.filename}`;
  const siteLink = links?.length > 0 ? links[0].link : null;
  const categoriesWithNoPrice = [5, 7, 8, 10, 11, 14, 18, 19];

  const conditionsPrice = conditions['fr'] && !category.map(cat => cat.id).find(catId => categoriesWithNoPrice.includes(catId));

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${location.latitude},${location.longitude}`;
  const locationMapUrl = Platform.select({
    ios: `${scheme}${location.name}@${latLng}`,
    android: `${scheme}${latLng}(${location.name})`
  }) ?? '';
      

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="auto" />
        <ScrollView 
          style={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        > 
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
                  style={{
                    position: 'absolute', 
                    bottom: 50, 
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 50,
                    zIndex: 1,
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    ...Platform.select({
                      ios: {
                        shadowOffset: {
                          width: 0,
                          height: 9,
                        },
                        shadowOpacity: 0.50,
                        shadowRadius: 12.35,
                      },
                      android: {
                        elevation: 10,
                      },
                    }),
                  }}
                  onPress={() => handleOpenModal(false)}
                >
                  <X size={34} color={'red'} />
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
                {`Du ${getFormatedDateFromTimestamp(firstTiming.begin)} au ${getFormatedDateFromTimestamp(lastTiming.end)}`}
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
