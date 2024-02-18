import style from './SettingsHomeView.style';
import { Pressable, View } from "react-native"
import { Settings, Sun } from 'lucide-react-native'
import { TextItem } from '../../../components/TextItem/TextItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderItem } from '../../../components/HeaderItem/HeaderItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { THEME } from '../../../assets/palette';
import { IconItem } from '../../../components/IconItem/IconItem';

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
    <SafeAreaView
      style={style.settingsLayout}
    >
      <View
        style={{
          backgroundColor: THEME.background[theme] as string,
          flex: 1,
        }}
      >
        <HeaderItem 
          title={route.name}
          navigation={navigation}
          withBackgroundTransparent={true}
          absolute={false}
        />
      { settingsNavList.map((settingsElt, index) => 
            <SettingsNavButton 
              key={`settingsNavList-${index}`}
              title={settingsElt.title}
              navigation={navigation}
              icons={settingsElt.icons}
            />
      )}
      </View>
    </SafeAreaView>
  )
}

