import { Picker } from '@react-native-picker/picker';
import React, { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import palette from '../../../assets/palette';
import { TextItem } from '../../../components/TextItem/TextItem';
import { Layout } from '../../../layouts/Layout';
import { setTheme } from '../../../reducers/generalReducer';
import { store } from '../../../store/store';
import style from './SettingsGeneralView.style';

export const SettingsGeneralView = (): ReactNode => {
  const { theme } = store.getState().generalReducer;
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleSetDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  };

  const handleSetLanguage = (language: string): void => {
    /* eslint-disable @typescript-eslint/no-floating-promises */
    i18n.changeLanguage(language);
  };

  return (
    <Layout
      header={{
        headerTitle: t('screens.settingsGeneral.title')
      }}
    >
      <ScrollView>
        <Pressable style={style.option} onPress={handleSetDarkMode}>
          <TextItem weight="regular" size="md" style={style.optionTitle}>
            {t('screens.settingsGeneral.text.darkMode')}
          </TextItem>
          <View style={style.optionInput}>
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
            style={{ height: 50, width: 150 }}
            onValueChange={handleSetLanguage}
          >
            <Picker.Item label={t('languages.french')} value="fr" />
            <Picker.Item label={t('languages.english')} value="en" />
          </Picker>
        </View>
      </ScrollView>
    </Layout>
  );
};
