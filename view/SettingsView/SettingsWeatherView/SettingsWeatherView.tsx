import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import style from './SettingsWeatherView.style';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { setWeatherSettings } from '../../../reducers/generalReducer';
import { SettingsLayout } from '../../../layouts/SettingsLayout';
import { useNavigation } from '@react-navigation/native';
import { Plus, Minus } from 'lucide-react-native';

const animationOptions = (value: number) => ({
  toValue: value, 
  duration: 100, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)

export const SettingsWeatherView = ({

}) => {
  const startDailyHour = store.getState().general.weatherSettings.startDailyHour;
  const [currStartDailyHour, setCurrStartDailyHour] = useState(startDailyHour);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const position = useRef(new Animated.Value(1)).current;

  const handleSaveSettings = () => { 
    dispatch(setWeatherSettings({
      startDailyHour: currStartDailyHour
    }));
    navigate.goBack();
  };
  
  const animate = (value: number) => 
    Animated.timing(position, animationOptions(value)).start();
  
  useEffect(() => {
    animate(currStartDailyHour !== startDailyHour ? 0 : 1)
  }, [currStartDailyHour]);
  
  return (
    <SettingsLayout title={'Weather'}>
      <View style={style.weatherInputContainer}>
        <Text style={style.weatherInputDescription}>Start daily hour at</Text>
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
          <Text style={style.weatherInputText}>{currStartDailyHour}</Text>
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
          <Text style={style.closeButtonText}>Save settings</Text>
        </Pressable>
    </Animated.View>
    </SettingsLayout>
  );
};

