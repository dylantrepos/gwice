import { useNavigation } from '@react-navigation/native';
import { Minus, Plus } from 'lucide-react-native';
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, Pressable, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { TextItem } from '../../../components/TextItem/TextItem';
import { Layout } from '../../../layouts/Layout';
import { setWeatherSettings } from '../../../reducers/generalReducer';
import { store } from '../../../store/store';
import style from './SettingsWeatherView.style';

const animationOptions = (value: number): Animated.TimingAnimationConfig => ({
  toValue: value,
  duration: 100,
  useNativeDriver: true,
  easing: Easing.inOut(Easing.linear)
});

export const SettingsWeatherView = (): ReactNode => {
  const startDailyHour = store.getState().generalReducer.weatherSettings.startDailyHour;
  const [currStartDailyHour, setCurrStartDailyHour] = useState(startDailyHour);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const position = useRef(new Animated.Value(1)).current;
  const { t } = useTranslation();

  const handleSaveSettings = (): void => {
    dispatch(
      setWeatherSettings({
        startDailyHour: currStartDailyHour
      })
    );
    navigation.goBack();
  };

  const animate = (value: number): void => {
    Animated.timing(position, animationOptions(value)).start();
  };

  useEffect(() => {
    animate(currStartDailyHour !== startDailyHour ? 0 : 1);
  }, [currStartDailyHour]);

  return (
    <Layout
      header={{
        headerTitle: t('screens.settingsWeather.title')
      }}
    >
      <View style={style.weatherInputContainer}>
        <TextItem weight="regular" size="md" style={style.weatherInputDescription}>
          {t('screens.settingsWeather.text.dailyStartHour')}
        </TextItem>
        <View style={style.weatherInputRadioContainer}>
          <Pressable
            style={style.weatherInputRadio}
            onPress={() => {
              if (currStartDailyHour - 1 > 0) {
                setCurrStartDailyHour(currStartDailyHour - 1);
              }
            }}
          >
            <Minus color={'#0D89CE'} size={45} strokeWidth={1} />
          </Pressable>
          <TextItem weight="regular" style={style.weatherInputText}>
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
            <Plus color={'#0D89CE'} size={45} strokeWidth={1} />
          </Pressable>
        </View>
      </View>
      <View style={style.weatherInputLine} />
      <Animated.View
        style={[
          style.closeButtonAnim,
          {
            transform: [
              {
                translateY: position.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100]
                })
              }
            ]
          }
        ]}
      >
        <Pressable onPress={handleSaveSettings} style={style.closeButton}>
          <TextItem weight="bold" size="lg" style={style.closeButtonText}>
            {t('screens.settingsWeather.text.save')}
          </TextItem>
        </Pressable>
      </Animated.View>
    </Layout>
  );
};
