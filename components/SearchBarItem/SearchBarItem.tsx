import style from './SearchBarItem.style';

import { Pressable, View, Animated, Keyboard, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react-native";


type SearchBarItemProps = {
  leftIcon?: React.ReactNode;
  searchValue: string;
  placeholder?: string;
  handleSubmitSearchValue: (searchValue: string) => void;
};

const DefaultLeftIcon = () => (
  <Search
    size={22}
    color="black"
    strokeWidth={2}
  />
);

export const SearchBarItem = ({
  leftIcon = <DefaultLeftIcon />,
  placeholder = '',
  searchValue,
  handleSubmitSearchValue
}: SearchBarItemProps) => {
  const [currSearchValue, setCurrSearchValue] = useState<string>(searchValue);
  const [isFocused, setIsFocused] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current; 
  const inputRef =  useRef<TextInput | null>(null);

  // UseEffect to animate the search icon reset
  useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: (currSearchValue.length > 0) ? 1 : 0, 
        duration: (currSearchValue.length > 0) ? 150 : 0, 
        useNativeDriver: true,
      }
    ).start();
  }, [currSearchValue, isFocused]);

  const clearSearchValue = () => {
    setCurrSearchValue('');

    if (!Keyboard.isVisible()) {
      handleSubmitSearchValue('');
    }
  };

  const handleSubmitSearchInput = () => {
    handleSubmitSearchValue(currSearchValue);
    Keyboard.dismiss();
  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('Keyboard Hidden');
        setIsFocused(false);
        inputRef.current?.blur();
      }
    );
  
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      style={style.searchContainer}
    >
      {leftIcon}
      <TextInput
        style={style.searchInput}
        blurOnSubmit={false}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        inputMode="search"
        multiline={false}
        value={currSearchValue}
        onChangeText={setCurrSearchValue}
        onSubmitEditing={handleSubmitSearchInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
      />
      <Animated.View
        style={{
          ...style.searchIconReset,
          transform: [{
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0]
            })
          }]
        }}
      >
        <Pressable onPress={clearSearchValue}>
          <X
            size={22}
            color="black"
            strokeWidth={2}
          />
        </Pressable>
      </Animated.View>
    </View>
    )
}