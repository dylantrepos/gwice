import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 10
  },
  option: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
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
  }
});
