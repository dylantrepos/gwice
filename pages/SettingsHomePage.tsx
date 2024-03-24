import { ChevronDown } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { ChooseFavoriteCategoryModal } from '../components/organisms/ChooseFavoriteCategoryModal';
import { Layout } from '../layouts/Layout';
import style from '../styles/pages/SettingsHomePage.style';

interface SettingsHomePageProps {
  navigation: any;
  route: any;
}

export const SettingsHomePage = ({ navigation, route }: SettingsHomePageProps): ReactNode => {
  const { t } = useTranslation();
  const [showLFavoriteCategoryModal, setShowLFavoriteCategoryModal] = useState(false);

  return (
    <Layout>
      <ChooseFavoriteCategoryModal
        isPopinVisible={showLFavoriteCategoryModal}
        setIsPopinVisible={setShowLFavoriteCategoryModal}
      />
      <ScrollView>
        <View style={style.title}>
          <TextItem weight="regular" size="6xl">
            {t('screens.events.title')}
          </TextItem>
        </View>
        <Pressable
          style={style.option}
          onPress={() => {
            setShowLFavoriteCategoryModal(!showLFavoriteCategoryModal);
          }}
        >
          <TextItem weight="light" size="lg" style={style.optionTitle}>
            {t('screens.settingsHome.text.preferredEventsCategories')}
          </TextItem>
          <View style={style.optionInput}>
            <TextItem>Select</TextItem>
            <IconItem IconElt={ChevronDown} size="md" />
          </View>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};
