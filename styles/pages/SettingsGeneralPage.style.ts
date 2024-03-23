import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  option: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70
  },
  optionTitle: {
    width: '70%'
  },
  optionInput: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
    // flex: 1,
  }
});
