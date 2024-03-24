import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLanguages } from '../../hooks/useGetLanguages';
import styles from '../../styles/components/organisms/ChooseLanguageModal.style';
import { BottomSheetItem } from '../molecules/BottomSheetItem';
import { SelectItem } from '../molecules/SelectItem';

interface FilterLangugageModalProps {
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseLanguageModal = ({
  isPopinVisible,
  setIsPopinVisible
}: FilterLangugageModalProps): ReactNode => {
  const { t, i18n } = useTranslation();
  const [currSelectedLanguageItem, setCurrSelectedLangugage] = useState(i18n.language);
  const languageAvailable = useGetLanguages();

  const handleClose = (): void => {
    setIsPopinVisible(false);
  };

  const handleUpdateLanguage = (item: string): void => {
    setCurrSelectedLangugage(item);
  };

  // @ts-expect-error-next-line
  const handleConfirm = async (): void => {
    await i18n.changeLanguage(currSelectedLanguageItem);

    handleClose();
  };

  return (
    <BottomSheetItem
      title={t('screens.settingsGeneral.text.languageModalTitle')}
      visible={isPopinVisible}
      setVisibility={setIsPopinVisible}
      handleConfirm={handleConfirm}
      disableConfirm={currSelectedLanguageItem === i18n.language}
      handleClose={handleClose}
      styles={styles.bottomSheetContainer}
      stylesConfirmButton={{
        marginTop: 40
      }}
    >
      <SelectItem
        choices={languageAvailable}
        activeChoice={currSelectedLanguageItem}
        handleUpdateChoice={handleUpdateLanguage}
      />
    </BottomSheetItem>
  );
};
