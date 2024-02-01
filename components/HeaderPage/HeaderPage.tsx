import { Pressable, TextProps, View } from 'react-native';
import { PropsWithChildren } from "react";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "../Text/Text";
import style from './HeaderPage.style';

type Props = TextProps & {
  title: string;
  navigation: any;
}

export const HeaderPage = ({
  title,
  navigation
}: PropsWithChildren<Props>) => {


  return (
    <View style={style.header}>
      <Pressable 
          onPress={() => navigation.goBack()}
          style={style.headerChevron}
        >
          <ChevronLeft color={'black'} size={30}/>
      </Pressable>
      <Text styles={style.headerTitle}>{title}</Text>
    </View>
  );
}