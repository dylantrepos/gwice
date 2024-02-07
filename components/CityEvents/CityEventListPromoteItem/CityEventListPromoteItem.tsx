import { Calendar } from "lucide-react-native";
import style from './CityEventListPromoteItem.style';
import { Text } from "../../Text/Text";
import { Animated, Image, ImageBackground, Pressable, View } from "react-native";
import { getFormatedDateFromTimestamp } from "../../../utils/utils";
import { memo, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CityEventCard } from "../../../types/Events";
import { allEventsCategoryLille, formatTitle } from '../../../utils/events';
import { HeaderPage } from "../../HeaderPage/HeaderPage";

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
            <Text
              styles={style.promoteEventDate}
            >
              Du 31 jan. au 4 fév.
            </Text>
            <Pressable
              style={style.promoteEventButton}
            >
              <Text
                styles={style.promoteEventButtonText}
              >
                Appuyez pour découvrir
              </Text>
            </Pressable>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
)};
