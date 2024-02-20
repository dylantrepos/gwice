import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import style from './SettingsGeneralView.style';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { setTheme, setWeatherSettings } from '../../../reducers/generalReducer';
import { SettingsLayout } from '../../../layouts/SettingsLayout';
import { useNavigation } from '@react-navigation/native';
import { Plus, Minus } from 'lucide-react-native';
import { TextItem } from '../../../components/TextItem/TextItem';
import { HeaderItem } from '../../../components/HeaderItem/HeaderItem2';
import { SafeAreaView } from 'react-native-safe-area-context';
import palette, { THEME } from '../../../assets/palette';
import { GestureHandlerRootView, Switch } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
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
              title="General settings"
              navigation={navigation}
              withBackgroundTransparent={true}
              absolute={false} 
            />
            <Pressable 
              style={style.option}
              onPress={handleSetDarkMode}
            >
              <TextItem 
                weight="regular"
                size="md"
                style={style.optionTitle}
              >
                Activate dark mode
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
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
