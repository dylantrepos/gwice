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
import { useTranslation } from 'react-i18next';

const animationOptions = (value: number) => ({
  toValue: value, 
  duration: 100, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)

export const SettingsGeneralView = ({

}) => {
  const { theme } = store.getState().generalReducer;
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark'); 
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleSetDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  }

  const handleSetLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  
  return (
    <View>
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
            {t('screens.settingsGeneral.text.darkMode')}
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
          <TextItem>{t('screens.settingsGeneral.text.language')}</TextItem>
          <Picker
            selectedValue={i18n.language}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              handleSetLanguage(itemValue)
            }>
            <Picker.Item label={t('languages.french')} value="fr" />
            <Picker.Item label={t('languages.english')} value="en" />
          </Picker>
        </View>
      </ScrollView>
    </View>
  );
};

