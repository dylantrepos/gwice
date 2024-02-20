import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Animated, Easing, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import style from './SettingsGeneralView.style';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { setTheme, setWeatherSettings } from '../../../reducers/generalReducer';
import { useNavigation } from '@react-navigation/native';
import { TextItem } from '../../../components/TextItem/TextItem';
import palette from '../../../assets/palette';
import { Switch } from 'react-native-gesture-handler';
import { PageHeaderLayout } from '../../../layouts/PageHeaderLayout';
import { setLanguage } from '../../../reducers/userReducer';

const animationOptions = (value: number) => ({
  toValue: value, 
  duration: 100, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)

export const SettingsGeneralView = ({

}) => {
  const { theme } = store.getState().generalReducer;
  const { language } = store.getState().userReducer;
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark'); 
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('theme :', theme);
  }, [theme]);

  const handleSetDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  }

  const handleSetLanguage = (language: string) => {
    setSelectedLanguage(language);
    dispatch(setLanguage(language));
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
        <View style={style.option}>
          <TextItem>Changer la langue</TextItem>
          <Picker
            selectedValue={selectedLanguage}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              handleSetLanguage(itemValue)
            }>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Français" value="fr" />
          </Picker>
        </View>
      </ScrollView>
    </PageHeaderLayout>
  );
};

