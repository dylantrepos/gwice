import { ChevronDown } from 'lucide-react-native';
import React, { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Appearance, Pressable, ScrollView, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { ChooseLanguageModal } from '../components/organisms/ChooseLanguageModal';
import { useGetLanguages } from '../hooks/useGetLanguages';
import { Layout } from '../layouts/Layout';
import { setIsDarkMode } from '../reducers/generalReducer';
import style from '../styles/pages/SettingsGeneralView.style';
import palette from '../theme/palette';

export const SettingsGeneralView = (): ReactNode => {
  const [isCurrDarkMode, setIsCurrDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const languageAvailable = useGetLanguages();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleSetDarkMode = (): void => {
    setIsCurrDarkMode(!isCurrDarkMode);
    dispatch(setIsDarkMode(!isCurrDarkMode));
  };

  return (
    <Layout>
      <ChooseLanguageModal
        isPopinVisible={showLanguageModal}
        setIsPopinVisible={setShowLanguageModal}
      />
      <ScrollView>
        <Pressable style={style.option} onPress={handleSetDarkMode}>
          <TextItem weight="regular" size="lg" style={style.optionTitle}>
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
        <Pressable
          style={style.option}
          onPress={() => {
            setShowLanguageModal(!showLanguageModal);
          }}
        >
          <TextItem weight="regular" size="lg" style={style.optionTitle}>
            {t('screens.settingsGeneral.text.language')}
          </TextItem>
          <View style={style.optionInput}>
            <TextItem>
              {languageAvailable.find((lang) => lang?.value === i18n.language)?.label}
            </TextItem>
            <IconItem IconElt={ChevronDown} size="md" />
          </View>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};
