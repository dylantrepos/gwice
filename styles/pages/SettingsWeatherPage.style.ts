import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  weatherModal: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red'
  },
  weatherModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 60,
    color: '#0D89CE'
  },
  weatherInputContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',

    marginHorizontal: 20
  },
  weatherInputDescription: {
    flex: 1
  },
  weatherInputRadioContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    flex: 1
  },
  weatherInputRadio: {
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  weatherInputRadioText: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '400',
    color: '#0D89CE',
    borderWidth: 1,
    borderColor: '#0E7DBC'
  },
  weatherInputText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fff'
  },
  weatherInputLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#D2D2D2',
    marginVertical: 20
  },
  closeButtonAnim: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  closeButton: {
    height: 60,
    backgroundColor: '#08971F',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#fff'
  }
});
