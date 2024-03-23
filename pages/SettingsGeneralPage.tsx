import { ChevronDown } from 'lucide-react-native';
import React, { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Appearance, Pressable, ScrollView, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { DividerItem } from '../components/atoms/DividerItem';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { ChooseLanguageModal } from '../components/organisms/ChooseLanguageModal';
import { useGetLanguages } from '../hooks/useGetLanguages';
import { Layout } from '../layouts/Layout';
import { setIsDarkMode } from '../reducers/generalReducer';
import { type RootState } from '../store/store';
import style from '../styles/pages/SettingsGeneralPage.style';
import palette from '../theme/palette';

export const SettingsGeneralPage = (): ReactNode => {
  const [isCurrDarkMode, setIsCurrDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const languageAvailable = useGetLanguages();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);

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
          <TextItem weight="light" size="lg" style={style.optionTitle}>
            {t('screens.settingsGeneral.text.darkMode')}
          </TextItem>
          <View style={style.optionInput}>
            <Switch
              value={isDarkMode}
              onValueChange={handleSetDarkMode}
              trackColor={{ false: '#767577', true: palette.bluePrimary }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </Pressable>
        <DividerItem />
        <Pressable
          style={style.option}
          onPress={() => {
            setShowLanguageModal(!showLanguageModal);
          }}
        >
          <TextItem weight="light" size="lg" style={style.optionTitle}>
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
