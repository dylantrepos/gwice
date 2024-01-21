import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import style from './SettingsWeatherView.style';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { setWeatherSettings } from '../../../reducers/generalReducer';
import { SettingsLayout } from '../../../layouts/SettingsLayout';
import { useNavigation } from '@react-navigation/native';

const animationOptions = (value: number) => ({
  toValue: value, 
  duration: 100, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)

export const SettingsWeatherView = ({

}) => {
  const dispatch = useDispatch();
  const laps = store.getState().general.weatherSettings.laps.toString();
  const range = store.getState().general.weatherSettings.range.toString();
  const [currLaps, setCurrLaps] = useState(+laps);
  const [currRange, setCurrRange] = useState(+range);
  const position = React.useRef(new Animated.Value(1)).current;
  const navigate = useNavigation();

  const handleCloseModal = () => { 
    dispatch(setWeatherSettings({
      laps: currLaps.toString(),
      range: currRange.toString()
    }));
    navigate.goBack();
  };
  
  const animate = (value: number) => 
    Animated.timing(position, animationOptions(value)).start();
  
  useEffect(() => {
    animate(currLaps !== +laps || currRange !== +range ? 0 : 1)
  }, [currLaps, currRange]);
  
  return (
    <SettingsLayout title={'Weather'}>
      <View style={style.weatherInputContainer}>
        <Text style={style.weatherInputDescription}>Hourly steps</Text>
        <View style={style.weatherInputRadioContainer}>
          <Pressable  
            style={style.weatherInputRadio}
            onPress={() => {
              if ((currLaps - 1) * 6 > 1) {
                setCurrLaps(+currLaps - 1);
                setCurrRange((currLaps - 1) * 6)
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>-</Text>
          </Pressable>
          <Text style={style.weatherInputText}>{currLaps}</Text>
          <Pressable 
            style={style.weatherInputRadio}
            onPress={() => {
              if (currLaps < 6) {
                setCurrLaps(currLaps + 1);
                setCurrRange((currLaps + 1) * 6);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>+</Text>
          </Pressable>
        </View>
      </View>
      <View style={style.weatherInputLine} />
      <View style={style.weatherInputContainer}>
        <Text style={style.weatherInputDescription}>Meteo forecast</Text>
        <View style={style.weatherInputRadioContainer}>
          <Pressable  
            style={style.weatherInputRadio}
            onPress={() => {
              if ((currRange / 2) >= currLaps * 6) {
                setCurrRange(currRange / 2);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>-</Text>
          </Pressable>
          <Text style={style.weatherInputText}>{currRange}</Text>
          <Pressable 
            style={style.weatherInputRadio}
            onPress={() => {
              if (currRange * 2 < (+currLaps * 6 * 4)) {
                setCurrRange(currRange * 2);
              }
            }} 
          >
            <Text style={style.weatherInputRadioText}>+</Text>
          </Pressable>
        </View>
      </View> 
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
          onPress={handleCloseModal}
          style={style.closeButton}
        >
          <Text style={style.closeButtonText}>Save settings</Text>
        </Pressable>
    </Animated.View>
    </SettingsLayout>
  );
};

