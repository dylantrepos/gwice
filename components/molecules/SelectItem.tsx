import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import styles from '../../styles/components/molecules/SelectItem.style';
import palette from '../../theme/palette';
import { TextItem } from '../atoms/TextItem';

import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';

export type Choice = {
  label: string;
  value: string;
} | null;

export interface PeriodSelectItemProps {
  choices: Choice[];
  activeChoice: string;
  handleUpdateChoice: (item: string) => void;
}

export const SelectItem = ({
  choices,
  activeChoice,
  handleUpdateChoice
}: PeriodSelectItemProps): ReactNode => {
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View
      style={{
        ...styles.selectContainer
      }}
    >
      {choices.map(
        (choice, index) =>
          choice && (
            <Pressable
              key={`${choice.label}-${index}`}
              onPress={() => {
                handleUpdateChoice(choice.value);
              }}
            >
              <Animated.View
                style={{
                  ...styles.selectItem,
                  borderColor: activeChoice === choice.value ? palette.bluePrimary : 'transparent'
                }}
              >
                <TextItem
                  color={
                    activeChoice === choice.value
                      ? palette.bluePrimary
                      : isDarkMode
                        ? palette.whitePrimary
                        : palette.blackPrimary
                  }
                >
                  {choice.label}
                </TextItem>
              </Animated.View>
            </Pressable>
          )
      )}
    </View>
  );
};
