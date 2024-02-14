import { Search } from "lucide-react-native";
import style from './CityEventListSearchItem.style';
import { Animated, Modal, Pressable, View, Text as TextRN } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";


export const CityEventListSearchItem = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCityEventListSearchItemPress = () => {
    console.log('CityEventListSearchItem pressed');
    setIsModalVisible(!isModalVisible);
  }

  return (
    <Animated.View>
      <Pressable
        onPress={handleCityEventListSearchItemPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#f5f5f5',
          margin: 20,
          borderRadius: 100,
          gap: 10,
        }}
      >
        <Search
          size={22}
          color="black"
          strokeWidth={2}
          style={style.searchEventIcon}
        />
        <TextRN
          style={style.searchEventTitle}
        >
          Rechercher un événement
        </TextRN>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#f5f5f5',
            margin: 20,
            borderRadius: 100,
            gap: 10,
          }}
        >
          <Search
            size={22}
            color="black"
            strokeWidth={2}
            style={style.searchEventIcon}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              paddingTop: 0,
              paddingBottom: 0
            }}
            placeholder="Rechercher un événement"
            placeholderTextColor="#A0A0A0"
            inputMode="search"
            multiline={false}
          />
        </View>
      </Modal>
    </Animated.View>
  )
}

