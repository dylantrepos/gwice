import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useCallback, useEffect, useRef, type PropsWithChildren, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View, type ViewProps } from 'react-native';
import { ButtonItem } from '../ButtonItem/ButtonItem';
import { TextItem } from '../TextItem/TextItem';
import style from './BottomSheetItem.style';

type Props = ViewProps & {
  title: string;
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  confirmText?: string;
  handleConfirm: () => void;
  disableConfirm?: boolean;
  handleClose: () => void;
};

export const BottomSheetItem = ({
  title,
  visible,
  setVisibility,
  confirmText,
  handleConfirm,
  disableConfirm = false,
  children
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
      enableDynamicSizing={true}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      animateOnMount={true}
      enableOverDrag={false}
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
          backgroundColor: colors.bottomSheetBackground
        }}
      >
        <View style={style.modalHeaderContainer}>
          <TextItem size="xl" weight="semiBold" color={colors.text}>
            {title}
          </TextItem>
        </View>

        {children}
        <ButtonItem
          title={confirmText ?? t('button.confirm')}
          handlePress={handleConfirmModal}
          type={disableConfirm ? 'disabled' : 'primary'}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
