import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, type ReactNode } from 'react';
import { Image, ImageBackground, Keyboard, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { TextItem } from '../../../../components/atoms/TextItem';
import style from '../../styles/organisms/CityEventListPromoteItem.style';

export const CityEventListPromoteItem = (): ReactNode => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handlePressPromoteEvent = (): void => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    console.log('Promote pressed!');
  };

  const imageSrc =
    'https://lilleaddict.fr/wp-content/uploads/2024/02/gand-festival-lumieres-1024x900.jpeg';

  useEffect(() => {
    Image.prefetch(imageSrc)
      .then(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to prefetch image', error);
      });
  }, []);

  return (
    <Pressable onPress={handlePressPromoteEvent} style={style.promoteEvent}>
      <Animated.View style={style.promoteEventImage}>
        {imageLoaded && (
          <ImageBackground
            style={style.promoteEventImage}
            source={{
              uri: imageSrc
            }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,1)']}
              style={style.promoteEventInfos}
            >
              <TextItem size="lg" style={style.promoteEventDate}>
                Du 31 jan. au 4 fév.
              </TextItem>
              <Pressable style={style.promoteEventButton}>
                <TextItem style={style.promoteEventButtonText}>Appuyez pour découvrir</TextItem>
              </Pressable>
            </LinearGradient>
          </ImageBackground>
        )}
      </Animated.View>
    </Pressable>
  );
};
