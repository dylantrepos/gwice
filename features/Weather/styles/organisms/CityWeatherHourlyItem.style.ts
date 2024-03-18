import { StyleSheet } from 'react-native';
import palette from '../../../../theme/palette';

export default StyleSheet.create({
  cityWeatherHourlyContainer: {
    // backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
    // width: 84,
  },
  cityWeatherHourlyEmptyContainer: {
    borderRadius: 10,
    overflow: 'hidden'
    // width: 84,
  },
  cityWeatherHourlyContainerAnimated: {
    alignItems: 'center',
    // minHeight: 120,
    columnGap: 10,
    position: 'relative',
    paddingVertical: 10
  },
  halfBottomBorder: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    height: '50%',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    zIndex: -1
  },
  cityWeatherHourlyImage: {
    width: '80%',
    height: 50,
    marginBottom: 5
  },
  cityWeatherHourlyTextDate: {
    fontSize: 12,
    fontWeight: '500'
  }
});

export const themeStyle = {
  halfBottomBorderColor: {
    light: palette.grayLight,
    dark: palette.gray200
  }
};
