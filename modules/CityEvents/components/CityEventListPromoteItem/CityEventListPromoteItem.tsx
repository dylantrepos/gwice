import style from './CityEventListPromoteItem.style';
import { ImageBackground, Keyboard, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CityEventCard } from '../../types/Events';
import { TextItem } from '../../../../components/TextItem/TextItem';

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
          <LinearGradient 
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={style.promoteEventInfos}
          >
            <TextItem
              size="lg"
              style={style.promoteEventDate}
            >
              Du 31 jan. au 4 fév.
            </TextItem>
            <Pressable
              style={style.promoteEventButton}
            >
              <TextItem
                style={style.promoteEventButtonText}
              >
                Appuyez pour découvrir
              </TextItem>
            </Pressable>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
)};
