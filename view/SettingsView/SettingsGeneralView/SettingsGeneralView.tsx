import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Animated, Easing, ScrollView } from 'react-native';
import style from './SettingsGeneralView.style';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { setTheme, setWeatherSettings } from '../../../reducers/generalReducer';
import { useNavigation } from '@react-navigation/native';
import { TextItem } from '../../../components/TextItem/TextItem';
import palette from '../../../assets/palette';
import { Switch } from 'react-native-gesture-handler';
import { PageHeaderLayout } from '../../../layouts/PageHeaderLayout';

const animationOptions = (value: number) => ({
  toValue: value, 
  duration: 100, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)

export const SettingsGeneralView = ({

}) => {
  const startDailyHour = store.getState().generalReducer.weatherSettings.startDailyHour;
  const { theme } = store.getState().generalReducer;
  const [currStartDailyHour, setCurrStartDailyHour] = useState(startDailyHour);
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark'); 
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

  useEffect(() => {
    console.log('theme :', theme);
  }, [theme]);

  const handleSetDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  }
  
  return (
    <PageHeaderLayout
      headerTitle="Paramètres généraux"
      headerWithBackNavigation={true}
      headerWithTransparentBackground={false}
      headerIsAbsolute={false}
    >
      <ScrollView>
        <Pressable 
          style={style.option}
          onPress={handleSetDarkMode}
        >
          <TextItem 
            weight="regular"
            size="md"
            style={style.optionTitle}
          >
            Activer le mode sombre
          </TextItem>
          <View 
            style={style.optionInput}
          >
            <Switch
              value={isDarkMode}
              onValueChange={handleSetDarkMode}
              trackColor={{ false: '#767577', true: palette.blue }}
              thumbColor={theme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </Pressable>
      </ScrollView>
    </PageHeaderLayout>
  );
};

