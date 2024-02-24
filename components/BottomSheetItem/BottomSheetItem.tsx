import { Animated, Modal, Pressable, View, ViewProps } from 'react-native';
import style from "./BottomSheetItem.style";
import { PropsWithChildren, useRef } from "react";
import palette from '../../assets/palette';
import { TextItem } from '../TextItem/TextItem';
import { BlurView } from 'expo-blur';
import { IconItem } from '../IconItem/IconItem';
import { X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

type Props = ViewProps & {
  title: string;
  visible: boolean;
  confirmText?: string;
  handleConfirm: () => void;
  handleClose: () => void;
}

export const BottomSheetItem = ({
  title,
  visible,
  confirmText,
  handleConfirm,
  handleClose,
  children
}: PropsWithChildren<Props>) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  const close = () => {
    // Replace with your actual view
    Animated.timing(opacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
    handleClose()
  }

  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
      > 
        <Pressable
          style={{flex: 1}}
          onPress={close}
        >
          <View 
            style={style.modalContentContainer}
            onStartShouldSetResponder={() => true} 
          >
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
              >
                <TextItem
                  size="lg"
                  weight="semiBold"
                >
                  {title}
                </TextItem>
                <View>
                  <Pressable
                    onPress={close}
                  >
                    <IconItem
                      size="md"
                      stroke="light"
                      IconElt={X}
                      color={palette.black}
                    />
                  </Pressable>
                </View>
              </View>

              { children }

                <Pressable
                  onPress={handleConfirm}
                >
                  <Animated.View
                      style={style.confirmButton}
                  >
                    <TextItem 
                      weight="bold"
                      style={{
                        color: 'white',
                      }}
                    >{confirmText ?? t('button.confirm')}</TextItem>
                  </Animated.View>
                </Pressable>
              </View>
            </View>
        </Pressable>
      </Modal>
  );
}
