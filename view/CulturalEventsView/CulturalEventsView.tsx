import { StatusBar } from "expo-status-bar"
import { RefreshControl, ScrollView, View, Image, Pressable, Linking, TouchableOpacity, Modal, Animated, Dimensions } from "react-native"
import style from './CulturalEventsView.style';
import { SafeAreaView } from "react-native-safe-area-context";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchHome } from "../../reducers/generalReducer";
import { Text } from "../../components/Text/Text";
import { CulturalEvent } from "../../types/CulturalEvents";
import { BadgeEuro, Calendar, MapPin, X } from "lucide-react-native";
import PanPinchView from "react-native-pan-pinch-view";
import { open } from "fs";


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
    date,
    description,
    price,
    location,
    website,
    contact,
    access,
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
          <TouchableOpacity onPress={() => handleOpenModal()}>
            <Image 
              style={style.image}
              source={{uri: image ?? ''}}
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
                    top: 50, 
                    right: 30, 
                    zIndex: 1,
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => handleOpenModal(false)}
                >
                  <X size={34} color={'#fff'} />
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
                      source={{uri: image ?? ''}}
                      resizeMode="contain"
                    />
                </PanPinchView>
              </View>
          </Modal>
          { title && <Text 
            styles={style.title}
            weight="600"
          >
            {title}
          </Text> }
          <View style={style.infosContainer}>
            <View style={style.infoContainer}>
              <Calendar size={20} color={'black'}/>
              <Text 
                styles={style.date}
              >
                {`${date?.end && 'Du '}${date?.start} ${date?.end && `au ${date?.end}`}`}
              </Text>
            </View>
            <View style={style.infoContainer}>
              <MapPin size={20} color={'black'}/>
              <Text 
                styles={style.date}
              >
                { location ? `${location.name}${location?.name ? `\n${location.address}` : ''}` : 'Non spécifié' }
              </Text>
            </View>
            <View style={style.infoContainer}>
              <BadgeEuro size={20} color={'black'}/>
              <Text 
                styles={style.date}
              >
                { price ? `${price}` : 'Non spécifié' }
              </Text>
            </View>
          </View>
          { description && <Text 
            styles={style.description}
          >
            {description}
          </Text> }
          { access && 
              typeof access === 'object' && access.public ? <View
                style={style.accessContainer}
              >
                <View 
                  style={style.transportContainer}
                >
                  <Text 
                    styles={style.transportType}
                    weight="600">
                    Public: 
                  </Text>
                  <Text 
                    styles={style.transportValue}
                    weight="400">
                    {access.public}
                  </Text>
                </View>
                { access.transport 
                  && Object.entries(access.transport).map(([key, value], index) => (
                    <View 
                      key={index}
                      style={style.transportContainer}
                    >
                      <Text 
                        styles={style.transportType}
                        weight="600">
                        {key}: 
                      </Text>
                      <Text 
                        styles={style.transportValue}
                        weight="400">
                        {value}
                      </Text>
                    </View>
                  )) }
              </View> : typeof access === 'string' ? <View>
                <Text 
                  styles={style.description}
                  weight="500">
                  {access}
                </Text>
              </View> : null
            }
          { website && <Pressable 
            style={style.link}
            onPress={() => {
              Linking.openURL(website);
            }}
          >
            <Text 
              styles={style.linkText}
              weight="500"
            >
              Plus d'infos 
            </Text>
            <Text styles={style.linkUrl}>
              {website}
            </Text>
          </Pressable> }
          { contact?.email && <View>
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
            </View>}
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
