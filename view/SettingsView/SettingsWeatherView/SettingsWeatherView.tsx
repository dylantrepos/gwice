import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import style from './SettingsWeatherView.style';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { setWeatherSettings } from '../../../reducers/generalReducer';
import { SettingsLayout } from '../../../layouts/SettingsLayout';
import { useNavigation } from '@react-navigation/native';
import { Plus, Minus } from 'lucide-react-native';
import { TextItem } from '../../../components/TextItem/TextItem';
import { HeaderItem } from '../../../components/HeaderItem/HeaderItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../../assets/palette';

const animationOptions = (value: number) => ({
  toValue: value, 
  duration: 100, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)

export const SettingsWeatherView = ({

}) => {
  const startDailyHour = store.getState().generalReducer.weatherSettings.startDailyHour;
  const { theme } = store.getState().generalReducer;
  const [currStartDailyHour, setCurrStartDailyHour] = useState(startDailyHour);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const position = useRef(new Animated.Value(1)).current;

  const handleSaveSettings = () => { 
    dispatch(setWeatherSettings({
      startDailyHour: currStartDailyHour
    }));
    navigation.goBack();
  };
  
  const animate = (value: number) => 
    Animated.timing(position, animationOptions(value)).start();
  
  useEffect(() => {
    animate(currStartDailyHour !== startDailyHour ? 0 : 1)
  }, [currStartDailyHour]);
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.background[theme] as string,
        }}
      >
        <HeaderItem
          title="Weather settings"
          navigation={navigation}
          withBackgroundTransparent={true}
          absolute={false}
        />
        <View style={style.weatherInputContainer}>
          <TextItem 
            weight="regular"
            size="md"
            style={style.weatherInputDescription}
          >
            Start daily hour at
          </TextItem>
          <View style={style.weatherInputRadioContainer}>
            <Pressable  
              style={style.weatherInputRadio}
              onPress={() => {
                if ((currStartDailyHour - 1) > 0) {
                  setCurrStartDailyHour(currStartDailyHour - 1);
                }
              }} 
            >
              <Minus color={'#0D89CE'} size={45} strokeWidth={1}/>
            </Pressable>
            <TextItem 
              weight="regular"
              style={style.weatherInputText}
            >
              {currStartDailyHour}
            </TextItem>
            <Pressable 
              style={style.weatherInputRadio}
              onPress={() => {
                if (currStartDailyHour < 24) {
                  setCurrStartDailyHour(currStartDailyHour + 1);
                }
              }} 
            >
              <Plus color={'#0D89CE'} size={45} strokeWidth={1}/>
            </Pressable>
          </View>
        </View>
        <View style={style.weatherInputLine} />
        <Animated.View
        style={[
          style.closeButtonAnim,
          {transform: [
            {
              translateY: position.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }),
            },
          ],}
        ]}>
        <Pressable
            onPress={handleSaveSettings}
            style={style.closeButton}
          >
            <TextItem 
              weight="bold"
              size="lg"
              style={style.closeButtonText}
            >
              Save settings
            </TextItem>
          </Pressable>
        </Animated.View>
    </View>
  </SafeAreaView>
  );
};

