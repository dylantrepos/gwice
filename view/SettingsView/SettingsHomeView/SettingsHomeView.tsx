import style from './SettingsHomeView.style';
import { Pressable, View } from "react-native"
import { Settings, Sun } from 'lucide-react-native'
import { TextItem } from '../../../components/TextItem/TextItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IconItem } from '../../../components/IconItem/IconItem';
import { PageHeaderLayout } from '../../../layouts/PageHeaderLayout';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

type SettingsHomeViewProps = {
  navigation: any;
  route: any;
};

type SettingsNavButtonProps = {
  title: string;
  navigation: any;
  id: string;
  icons?: any;
};

const SettingsNavButton = ({title, navigation, icons, id}: SettingsNavButtonProps) => {

  return (
    <Pressable 
      style={style.settingsScreenButton}
      onPress={() => {navigation.push(id)}}
    >
      <View style={style.settingsScreenButtonTextIcon}>
        {icons && (
          <IconItem
            IconElt={icons}
            size="md"
          />
        )}
        <TextItem
          weight='regular'
          size='lg'
        >
          {title}
        </TextItem>
      </View>
    </Pressable>
  )
}


export const SettingsHomeView = ({ navigation, route }: SettingsHomeViewProps) => {
  const { t } = useTranslation();

  return (
    <PageHeaderLayout
      headerTitle={t('screens.settingsHome.title')}
      headerWithBackNavigation={false}
      headerWithTransparentBackground={false}
      headerIsAbsolute={false}
    >
      <SettingsNavButton 
        title={t('screens.settingsHome.text.general')}
        navigation={navigation}
        id={'General'}
        icons={Settings}
      />
      <SettingsNavButton 
        title={t('screens.settingsHome.text.weather')}
        navigation={navigation}
        id={'Weather'}
        icons={Sun}
      />
    </PageHeaderLayout>
  )
}

