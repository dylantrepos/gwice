import { Modal, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import style, { themeStyle } from "./BottomSheetItem.style";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import palette from '../../assets/palette';
import { TextItem } from '../TextItem/TextItem';
import { IconItem } from '../IconItem/IconItem';
import { X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { ButtonItem } from '../ButtonItem/ButtonItem';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderItem } from '../HeaderItem/HeaderItem';

type Props = ViewProps & {
  title: string;
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  confirmText?: string;
  handleConfirm: () => void;
  handleClose: () => void;
}

export const BottomSheetItem = ({
  title,
  visible,
  setVisibility,
  confirmText,
  handleConfirm,
  children
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (visible) {
      handlePresentModalPress();
      setVisibility(false);
    } 
  }, [visible]);

  const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

  const handleConfirmModal = () => {
    bottomSheetModalRef.current?.dismiss();
    handleConfirm();
  }

  return (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          enableDynamicSizing={true}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          animateOnMount={true}
          enableOverDrag={false}
          handleStyle={{
            backgroundColor: themeStyle.containerBackground[theme] as string,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          handleIndicatorStyle={{
            backgroundColor: themeStyle.handleIndicator[theme] as string,
          }}
        >
          <BottomSheetView
            style={{
              ...style.modalContentContainer,
              backgroundColor: themeStyle.containerBackground[theme] as string,
            }}
          >
            <View
              style={style.modalHeaderContainer}
            >
              <TextItem
                size="xl"
                weight="semiBold"
              >
                {title}
              </TextItem>
            </View>

            { children }
              <ButtonItem 
                title={confirmText ?? t('button.confirm')}
                handlePress={handleConfirmModal}
                type='confirm'
              />
            </BottomSheetView>
        </BottomSheetModal>
  )
}
