import style from './CityEventListPromoteItem.style';
import { ImageBackground, Keyboard, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CityEventCard } from '../../types/Events';
import { TextItem } from '../../../../components/TextItem/TextItem';
import { HeaderPage } from '../../../../components/HeaderPage/HeaderPage';

type Props = {
  navigation: any;
  route: any;
  event: CityEventCard;
}

type PromoteEventProps = {
  navigation: any;
}

export const CityEventListPromoteItem = ({
  navigation
}: PromoteEventProps) => {

  const handlePressPromoteEvent = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    console.log('Promote pressed!');
  }

  return (
    <Pressable
        onPress={handlePressPromoteEvent}
        style={style.promoteEvent}
        >
        <ImageBackground
          style={style.promoteEventImage}
          source={{
            uri: 'https://lilleaddict.fr/wp-content/uploads/2024/02/gand-festival-lumieres-1024x900.jpeg'
          }} 
        >
          <HeaderPage
            title={'Événements'}
            // navigation={navigation}
            styles={style.header}
            titleStyles={style.headerTitle}
            // iconColor="white"
          />
          <LinearGradient 
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={style.promoteEventInfos}
          >
            <TextItem
              styles={style.promoteEventDate}
            >
              Du 31 jan. au 4 fév.
            </TextItem>
            <Pressable
              style={style.promoteEventButton}
            >
              <TextItem
                styles={style.promoteEventButtonText}
              >
                Appuyez pour découvrir
              </TextItem>
            </Pressable>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
)};
