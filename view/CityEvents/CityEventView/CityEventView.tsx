import { BadgeEuro, Calendar, MapPin, X } from 'lucide-react-native';
import { useCallback, useState, type ReactNode } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import PanPinchView from 'react-native-pan-pinch-view';
import { useDispatch } from 'react-redux';
import { IconItem } from '../../../components/IconItem/IconItem';
import { TextItem } from '../../../components/TextItem/TextItem';
import { WarningScreenItem } from '../../../components/WarningScreenItem/WarningScreenItem';
import { Layout } from '../../../layouts/Layout';
import { useGetCityEventDetails } from '../../../modules/CityEvents/hooks/useGetCityEvents';
import { setRefetchHome } from '../../../reducers/generalReducer';
import { getFormatedDateFromTimestamp } from '../../../utils/utils';
import style from './CityEventView.style';

interface Props {
  navigation: any;
  route: any;
}

export const CityEventView = ({ navigation, route }: Props): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = (open: boolean = true): void => {
    setModalVisible(open);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setModalVisible(false);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const { eventId } = route.params;

  const { isLoading, events, isError } = useGetCityEventDetails({ eventId });

  if (isLoading) {
    return <WarningScreenItem type="loader" />;
  }

  if (isError) {
    return <WarningScreenItem type="error" />;
  }

  if (events === undefined) {
    return (
      <WarningScreenItem type="unavailable">
        Cet événement n&apos;est pas disponible.
      </WarningScreenItem>
    );
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
  } = events.events[0];

  const imageSrc = `${image.base}${image.filename}`;
  const siteLink = links?.length > 0 ? links[0].link : null;
  const categoriesWithNoPrice = [5, 7, 8, 10, 11, 14, 18, 19];

  const conditionsPrice =
    conditions.fr &&
    !category.map((cat) => cat.id).find((catId) => categoriesWithNoPrice.includes(catId));

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${location.latitude},${location.longitude}`;
  const locationMapUrl =
    Platform.select({
      ios: `${scheme}${location.name}@${latLng}`,
      android: `${scheme}${latLng}(${location.name})`
    }) ?? '';

  const today = new Date();
  const firstTimingDate = new Date(firstTiming.begin);

  return (
    <Layout>
      <ScrollView
        style={{ ...style.scrollView }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TouchableOpacity
          onPress={() => {
            handleOpenModal();
          }}
        >
          <Image style={style.image} source={{ uri: imageSrc ?? '' }} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            handleOpenModal(false);
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <TouchableOpacity
              style={style.closeImageButton}
              onPress={() => {
                handleOpenModal(false);
              }}
            >
              <X size={26} color={'red'} strokeWidth={1} />
            </TouchableOpacity>
            <PanPinchView
              minScale={1}
              initialScale={1}
              containerDimensions={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
              contentDimensions={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: imageSrc ?? '' }}
                resizeMode="contain"
              />
            </PanPinchView>
          </View>
        </Modal>
        {title && (
          <TextItem weight="bold" size="lg" style={style.title}>
            {title.fr}
          </TextItem>
        )}
        <View style={style.infosContainer}>
          <View style={style.infoContainer}>
            <IconItem IconElt={Calendar} size="md" />
            <TextItem size="md" style={style.date}>
              {getFormatedDateFromTimestamp(firstTiming.begin) ===
              getFormatedDateFromTimestamp(lastTiming.end)
                ? `${getFormatedDateFromTimestamp(firstTiming.begin)}`
                : firstTimingDate < today
                  ? `Jusqu'au ${getFormatedDateFromTimestamp(lastTiming.end)}`
                  : `Du ${getFormatedDateFromTimestamp(firstTiming.begin)} au ${getFormatedDateFromTimestamp(lastTiming.end)}`}
            </TextItem>
          </View>
          <View style={style.infoContainer}>
            <IconItem IconElt={MapPin} size="md" />
            <Pressable
              onPress={() => {
                Linking.openURL(locationMapUrl);
              }}
            >
              <TextItem size="md" style={style.date}>
                {`${location.name}\n${location.address}`}
              </TextItem>
            </Pressable>
          </View>
          {(conditionsPrice ?? null) && (
            <View style={style.infoContainer}>
              <BadgeEuro size={20} color={'black'} />
              <TextItem size="md" style={style.date}>
                {conditions.fr ? `${conditions.fr}` : 'Non spécifié'}
              </TextItem>
            </View>
          )}
        </View>
        <TextItem size="md" style={style.description}>
          {longDescription.fr}
        </TextItem>
        {siteLink && (
          <Pressable
            style={style.link}
            onPress={() => {
              Linking.openURL(siteLink);
            }}
          >
            <TextItem weight="regular" size="md">
              Plus d'infos
            </TextItem>
            <TextItem size="md" style={style.linkUrl}>
              {siteLink}
            </TextItem>
          </Pressable>
        )}
        {/* { contact?.email && <View>
          <TextItem
            style={style.linkText}
            weight="500">
            Email : {contact.email}
            </TextItem>
          </View>}
        { contact?.phone && <View>
          <TextItem
            style={style.linkText}
            weight="500">
            Téléphone : {contact.email}
            </TextItem>
          </View>} */}
        {/* { page && <Pressable
          style={style.link}
          onPress={() => {
            Linking.openURL(page);
          }}
        >
          <TextItem
            style={style.linkText}
            weight="500"
          >
            Source
          </TextItem>
          <TextItem style={style.linkUrl}>
            {page}
          </TextItem>
        </Pressable> } */}
      </ScrollView>
    </Layout>
  );
};
