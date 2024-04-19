import { BadgeEuro, Calendar, X } from 'lucide-react-native';
import moment from 'moment';
import { useCallback, useState, type ReactNode } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import PanPinchView from 'react-native-pan-pinch-view';
import { useDispatch } from 'react-redux';
import { IconItem } from '../../../components/atoms/IconItem';
import { TextItem } from '../../../components/atoms/TextItem';
import { WarningScreenItem } from '../../../components/molecules/WarningScreenItem';
import { useGetCityEventDetails } from '../../../hooks/useGetCityEvents';
import { Layout } from '../../../layouts/Layout';
import { setRefetchHome } from '../../../reducers/generalReducer';
import { getFormatedDateFromTimestamp } from '../../../utils/utils';
import styles from '../styles/pages/CityEventsDetailsPage.style';

interface Props {
  navigation: any;
  route: any;
}

export const CityEventsDetailsPage = ({ navigation, route }: Props): ReactNode => {
  const { eventId } = route.params;

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

  const { isLoading, data: event, isError } = useGetCityEventDetails({ eventId });

  if (isLoading) {
    return <WarningScreenItem type="loader" />;
  }

  if (isError) {
    return <WarningScreenItem type="error" />;
  }

  if (event === undefined) {
    return (
      <WarningScreenItem type="unavailable">
        Cet événement n&apos;est pas disponible.
      </WarningScreenItem>
    );
  }

  // const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  // const hasLocation = location?.latitude && location?.longitude;
  // const locationMapUrl = hasLocation
  //   ? Platform.select({
  //       ios: `${scheme}${location.name}@${location.latitude},${location.longitude}`,
  //       android: `${scheme}${location.latitude},${location.longitude}(${location.name})`
  //     })
  //   : null;

  const today = moment().startOf('day');
  const firstTimingDate = moment(event.timings[0].begin);

  return (
    <Layout>
      <ScrollView
        style={{ ...styles.scrollView }}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TouchableOpacity
          onPress={() => {
            handleOpenModal();
          }}
        >
          <Image style={styles.image} source={{ uri: event.image_url ?? '' }} />
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
              style={styles.closeImageButton}
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
                source={{ uri: event.image_url ?? '' }}
                resizeMode="contain"
              />
            </PanPinchView>
          </View>
        </Modal>
        {event.title && (
          <TextItem weight="bold" size="lg" style={styles.title} selectable>
            {event.title}
          </TextItem>
        )}
        <View style={styles.infosContainer}>
          <View style={styles.infoContainer}>
            <IconItem IconElt={Calendar} size="md" />
            <TextItem size="md" style={styles.date} selectable>
              {getFormatedDateFromTimestamp(event.timings[0].begin) ===
              getFormatedDateFromTimestamp(event.timings[event.timings.length - 1].end)
                ? `${getFormatedDateFromTimestamp(event.timings[0].begin)}`
                : firstTimingDate < today
                  ? `Jusqu'au ${getFormatedDateFromTimestamp(event.timings[event.timings.length - 1].end)}`
                  : `Du ${getFormatedDateFromTimestamp(event.timings[0].begin)} au ${getFormatedDateFromTimestamp(event.timings[event.timings.length - 1].end)}`}
            </TextItem>
          </View>
          {/* {locationMapUrl && (
            <View style={styles.infoContainer}>
              <IconItem IconElt={MapPin} size="md" />
              <Pressable
                onPress={() => {
                  void (async () => {
                    await Linking.openURL(locationMapUrl);
                  })();
                }}
              >
                <TextItem size="md" style={styles.date}>
                  {`${location.name}\n${location.address}`}
                </TextItem>
              </Pressable>
            </View>
          )} */}
          {(event.price ?? null) && (
            <View style={styles.infoContainer}>
              <BadgeEuro size={20} color={'black'} />
              <TextItem size="md" style={styles.date} selectable>
                {event.price ? `${event.price}` : 'Non spécifié'}
              </TextItem>
            </View>
          )}
        </View>
        <TextItem size="md" style={styles.description} selectable>
          {event.long_description}
        </TextItem>
        {/* {siteLink && (
          <Pressable
            style={styles.link}
            onPress={() => {
              void (async () => {
                await Linking.openURL(siteLink);
              })();
            }}
          >
            <TextItem weight="regular" size="md">
              Plus d'infos
            </TextItem>
            <TextItem size="md" style={styles.linkUrl}>
              {siteLink}
            </TextItem>
          </Pressable>
        )} */}
        {/* { contact?.email && <View>
          <TextItem
            style={styles.linkText}
            weight="500">
            Email : {contact.email}
            </TextItem>
          </View>}
        { contact?.phone && <View>
          <TextItem
            style={styles.linkText}
            weight="500">
            Téléphone : {contact.email}
            </TextItem>
          </View>} */}
        {/* { page && <Pressable
          style={styles.link}
          onPress={() => {
            Linking.openURL(page);
          }}
        >
          <TextItem
            style={styles.linkText}
            weight="500"
          >
            Source
          </TextItem>
          <TextItem style={styles.linkUrl}>
            {page}
          </TextItem>
        </Pressable> } */}
      </ScrollView>
    </Layout>
  );
};
