import style from '../../styles/components/atoms/SearchBarItem.style';

import { useTheme } from '@react-navigation/native';
import { Search, X } from 'lucide-react-native';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Keyboard, Pressable, TextInput, View, type ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCurrentSearchValue } from '../../reducers/eventReducer';

interface SearchBarItemProps {
  leftIcon?: ReactNode;
  searchValue: string;
  placeholder?: string;
  handleSubmitSearchValue: (searchValue: string) => void;
  handleIsFocused?: (isFocused: boolean) => void;
  styles?: ViewStyle;
}

const DefaultLeftIcon: ReactNode = <Search size={22} color="black" strokeWidth={2} />;

export const SearchBarItem = ({
  leftIcon = DefaultLeftIcon,
  placeholder = '',
  searchValue,
  handleSubmitSearchValue,
  handleIsFocused,
  styles
}: SearchBarItemProps): ReactNode => {
  const [currSearchValue, setCurrSearchValue] = useState<string>(searchValue);
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput | null>(null);

  // UseEffect to animate the search icon reset
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: currSearchValue.length > 0 ? 1 : 0,
      duration: currSearchValue.length > 0 ? 150 : 0,
      useNativeDriver: true
    }).start();
    dispatch(setCurrentSearchValue(currSearchValue));
  }, [currSearchValue, isFocused]);

  const clearSearchValue = (): void => {
    setCurrSearchValue('');

    if (!Keyboard.isVisible()) {
      dispatch(setCurrentSearchValue(''));
      handleSubmitSearchValue('');
    }
  };

  const handleSubmitSearchInput = (): void => {
    handleSubmitSearchValue(currSearchValue);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsFocused(false);
      inputRef.current?.blur();
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    handleIsFocused?.(isFocused);
  }, [isFocused]);

  return (
    <View
      style={{
        ...style.searchContainer,
        backgroundColor: colors.searchBarBackground,
        overflow: 'hidden',
        ...styles
      }}
    >
      <TextInput
        style={{
          ...style.searchInput,
          color: colors.searchBarText,
          flex: 1,
          height: '100%'
        }}
        blurOnSubmit={false}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        inputMode="search"
        autoFocus={true}
        returnKeyType="search"
        multiline={false}
        value={currSearchValue}
        onChangeText={setCurrSearchValue}
        onSubmitEditing={handleSubmitSearchInput}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        ref={inputRef}
      />
      {currSearchValue.length > 0 && (
        <Pressable
          onPress={clearSearchValue}
          style={{ ...style.searchIconReset, backgroundColor: colors.searchBarBackground }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                  })
                }
              ]
            }}
          >
            <X size={22} color={colors.searchBarIcon} strokeWidth={2} />
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};
