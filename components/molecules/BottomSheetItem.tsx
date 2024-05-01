import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useCallback, useEffect, useRef, type PropsWithChildren, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import style from '../../styles/components/molecules/BottomSheetItem.style';
import { ButtonItem } from '../atoms/ButtonItem';
import { TextItem } from '../atoms/TextItem';

type Props = ViewProps & {
  title: string;
  visible: boolean;
  confirmText?: string;
  withConfirm?: boolean;
  dynamicSize?: boolean;
  disableConfirm?: boolean;
  styles?: ViewStyle;
  stylesConfirmButton?: ViewStyle;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: () => void;
  handleClose: () => void;
  handleDismiss?: () => void;
};

export const BottomSheetItem = ({
  title,
  visible,
  confirmText,
  withConfirm = true,
  dynamicSize = true,
  disableConfirm = false,
  children,
  styles,
  stylesConfirmButton,
  setVisibility,
  handleConfirm,
  handleDismiss
}: PropsWithChildren<Props>): ReactNode => {
  const { t } = useTranslation();
  const { colors } = useTheme();
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
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const handleConfirmModal = (): void => {
    if (disableConfirm) return;
    bottomSheetModalRef.current?.dismiss();
    handleConfirm();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      enableDynamicSizing={dynamicSize}
      snapPoints={dynamicSize ? undefined : ['70%']}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      animateOnMount={true}
      enableOverDrag={false}
      onDismiss={handleDismiss}
      handleStyle={{
        backgroundColor: colors.bottomSheetBackground,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.bottomSheetIndicatorBackground
      }}
    >
      <BottomSheetView
        style={{
          ...style.modalContentContainer,
          backgroundColor: colors.bottomSheetBackground,
          paddingBottom: withConfirm ? 30 : 0,
          ...styles
        }}
      >
        <View style={style.modalHeaderContainer}>
          <TextItem size="xl" weight="semiBold" color={colors.text} align="center">
            {title}
          </TextItem>
        </View>

        {children}
        {withConfirm && (
          <ButtonItem
            title={confirmText ?? t('button.confirm')}
            handlePress={handleConfirmModal}
            type={disableConfirm ? 'disabled' : 'primary'}
            style={{
              ...style.confirmButton,
              ...stylesConfirmButton
            }}
          />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};
