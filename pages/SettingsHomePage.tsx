import { ChevronDown } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { Layout } from '../layouts/Layout';
import style from '../styles/pages/SettingsHomePage.style';

interface SettingsHomePageProps {
  navigation: any;
  route: any;
}

export const SettingsHomePage = ({ navigation, route }: SettingsHomePageProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ScrollView>
        <View style={style.title}>
          <TextItem weight="regular" size="6xl">
            {t('screens.events.title')}
          </TextItem>
        </View>
        <Pressable
          style={style.option}
          onPress={() => {
            // setShowLanguageModal(!showLanguageModal);
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
