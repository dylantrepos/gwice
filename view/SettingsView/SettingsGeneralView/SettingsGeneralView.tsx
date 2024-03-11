import { Picker } from '@react-native-picker/picker';
import React, { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Appearance, Pressable, ScrollView, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { TextItem } from '../../../components/general/TextItem/TextItem';
import { Layout } from '../../../layouts/Layout';
import { setIsDarkMode } from '../../../reducers/generalReducer';
import palette from '../../../theme/palette';
import style from './SettingsGeneralView.style';

export const SettingsGeneralView = (): ReactNode => {
  const [isCurrDarkMode, setIsCurrDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleSetDarkMode = (): void => {
    setIsCurrDarkMode(!isCurrDarkMode);
    dispatch(setIsDarkMode(!isCurrDarkMode));
  };

  const handleSetLanguage = (language: string): void => {
    /* eslint-disable @typescript-eslint/no-floating-promises */
    i18n.changeLanguage(language);
  };

  return (
    <Layout>
      <ScrollView>
        <Pressable style={style.option} onPress={handleSetDarkMode}>
          <TextItem weight="regular" size="md" style={style.optionTitle}>
            {t('screens.settingsGeneral.text.darkMode')}
          </TextItem>
          <View style={style.optionInput}>
            <Switch
              value={isCurrDarkMode}
              onValueChange={handleSetDarkMode}
              trackColor={{ false: '#767577', true: palette.bluePrimary }}
              thumbColor={'#f4f3f4'}
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
