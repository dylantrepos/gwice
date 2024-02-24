import { Platform, StyleSheet } from "react-native";
import palette from "../../../../assets/palette";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContentContainer: { 
    paddingHorizontal: 20, 
    paddingVertical: 30,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  item: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: palette.blue,
    borderWidth: 1,
  },
  itemText: {
    color: 'black',
  },
  selectedItemText: {
    color: palette.blue,
  },
  confirmButton: {
    backgroundColor: palette.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});

export const themeStyle = {
  filterBackgroundColor: {
    light: palette.white,
    dark: palette.grayDark,
  },
}