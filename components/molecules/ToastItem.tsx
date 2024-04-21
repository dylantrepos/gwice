import { Info, X } from 'lucide-react-native';
import React, { type ReactNode, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../../reducers/generalReducer';
import { type RootState } from '../../store/store';
import palette from '../../theme/palette';
import { ToastPosition } from '../../types/components/molecules/Toast.type';
import { IconItem } from '../atoms/IconItem';

export const ToastItem = (): ReactNode => {
  const [animation] = useState(new Animated.Value(0));
  const toastQueue = useSelector((state: RootState) => state.generalReducer.toastQueue);
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();

  const closeToast = (): void => {
    Animated.timing(animation, {
      toValue: toastQueue[0].position === ToastPosition.TOP ? -top : top,
      duration: 300,
      useNativeDriver: true
    }).start();
    dispatch(removeToast(toastQueue[0]));
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [toastQueue]);

  if (toastQueue.length === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [toastQueue[0].position === ToastPosition.TOP ? top : -top, 0]
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity style={styles.toast} onPress={closeToast}>
        <IconItem IconElt={Info} size="md" color={palette.whitePrimary} />
        <Text style={styles.message}>{toastQueue[0].message}</Text>
        <IconItem IconElt={X} size="md" color={palette.whitePrimary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    maxWidth: 400,
    marginHorizontal: 300,
    padding: 16,
    backgroundColor: palette.red400,
    flexDirection: 'row',
    alignItems: 'center'
  },
  toast: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  message: {
    color: '#fff',
    fontSize: 16,
    flex: 1
  }
});

export default ToastItem;
