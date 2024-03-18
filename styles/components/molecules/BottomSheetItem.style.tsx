import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({
  modalContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30
  },
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    paddingBottom: 10
  },
  confirmButton: {
    backgroundColor: palette.bluePrimary,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
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
