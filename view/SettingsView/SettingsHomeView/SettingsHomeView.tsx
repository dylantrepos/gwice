import style from './SettingsHomeView.style';
import { Pressable, View } from "react-native"
import { Sun } from 'lucide-react-native'
import { SettingsLayout } from "../../../layouts/SettingsLayout";
import { TextItem } from '../../../components/TextItem/TextItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderItem } from '../../../components/HeaderItem/HeaderItem';

type SettingsHomeViewProps = {
  navigation: any;
  route: any;
};

type SettingsNavButtonProps = {
  title: string;
  navigation: any;
  icons?: React.ReactNode;
};

const SettingsNavButton = ({title, navigation, icons}: SettingsNavButtonProps) => {
  return (
    <Pressable 
      style={style.settingsScreenButton}
      onPress={() => {navigation.push(title)}}
    >
      <View style={style.settingsScreenButtonTextIcon}>
        {icons ?? null}
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
    icons: <Sun color={'black'} />
  },
  {
    title: 'Other',
  }
]

export const SettingsHomeView = ({ navigation, route }: SettingsHomeViewProps) => {

  return (
    <SafeAreaView
      style={style.settingsLayout}
    >
      <HeaderItem 
        title={route.name}
        navigation={navigation}
      />
    { settingsNavList.map((settingsElt, index) => 
          <SettingsNavButton 
            key={`settingsNavList-${index}`}
            title={settingsElt.title}
            navigation={navigation}
            icons={settingsElt.icons}
          />
    )}
    </SafeAreaView>
  )
}

