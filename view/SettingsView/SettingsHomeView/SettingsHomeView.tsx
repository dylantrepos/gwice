import style from './SettingsHomeView.style';
import { Pressable, View } from "react-native"
import { Settings, Sun } from 'lucide-react-native'
import { TextItem } from '../../../components/TextItem/TextItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IconItem } from '../../../components/IconItem/IconItem';
import { PageHeaderLayout } from '../../../layouts/PageHeaderLayout';

type SettingsHomeViewProps = {
  navigation: any;
  route: any;
};

type SettingsNavButtonProps = {
  title: string;
  navigation: any;
  icons?: any;
};

const SettingsNavButton = ({title, navigation, icons}: SettingsNavButtonProps) => {
  return (
    <Pressable 
      style={style.settingsScreenButton}
      onPress={() => {navigation.push(title)}}
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

const settingsNavList = [
  {
    title: 'Weather',
    icons: Sun
  },
  {
    title: 'General',
    icons: Settings
  }
]

export const SettingsHomeView = ({ navigation, route }: SettingsHomeViewProps) => {

  const { theme } = useSelector((state: RootState) => state.generalReducer); 

  return (
    <PageHeaderLayout
      headerTitle="Paramètres"
      headerWithBackNavigation={false}
      headerWithTransparentBackground={false}
      headerIsAbsolute={false}
    >
      { settingsNavList.map((settingsElt, index) => 
            <SettingsNavButton 
              key={`settingsNavList-${index}`}
              title={settingsElt.title}
              navigation={navigation}
              icons={settingsElt.icons}
            />
      )}
    </PageHeaderLayout>
  )
}

