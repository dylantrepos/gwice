import { Home, Settings, Sun, type LucideIcon } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { DividerItem } from '../components/atoms/DividerItem';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { Layout } from '../layouts/Layout';
import style from '../styles/pages/SettingsHomeView.style';

interface SettingsHomeViewProps {
  navigation: any;
  route: any;
}

interface SettingsNavButtonProps {
  title: string;
  navigation: any;
  id: string;
  icons?: LucideIcon;
}

const SettingsNavButton = ({ title, navigation, icons, id }: SettingsNavButtonProps): ReactNode => (
  <Pressable
    style={style.settingsScreenButton}
    onPress={() => {
      navigation.push(id);
    }}
  >
    <View style={style.settingsScreenButtonTextIcon}>
      {icons && <IconItem IconElt={icons} size="md" />}
      <TextItem weight="regular" size="lg">
        {title}
      </TextItem>
    </View>
  </Pressable>
);

export const SettingsHomeView = ({ navigation, route }: SettingsHomeViewProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* <HeaderItem title={t('screens.settingsHome.title')} /> */}
      <SettingsNavButton
        title={t('screens.settingsHome.text.general')}
        navigation={navigation}
        id={'General'}
        icons={Settings}
      />
      <DividerItem />
      <SettingsNavButton
        title={t('screens.settingsHome.text.weather')}
        navigation={navigation}
        id={'Weather'}
        icons={Sun}
      />
      <DividerItem />
      <SettingsNavButton
        title={t('screens.home.title')}
        navigation={navigation}
        id={'Home'}
        icons={Home}
      />
    </Layout>
  );
};
