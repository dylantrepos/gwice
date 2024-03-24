import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({
  modalContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    paddingBottom: 10
  },
  confirmButton: { marginTop: 20 }
});

export const themeStyle = {
  containerBackground: {
    light: palette.whitePrimary,
    dark: palette.blackPrimary
  },
  handleIndicator: {
    light: palette.blackPrimary,
    dark: palette.whitePrimary
  }
};
