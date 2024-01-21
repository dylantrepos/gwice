import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  weatherModal: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
  },
  weatherModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 60,
    color: '#0D89CE',
  },
  weatherInputContainer: {
    flexDirection: 'row',
    gap: 10,  
    alignItems: 'center',
    
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  weatherInputDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherInputRadioContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  weatherInputRadio: {
    height: 50,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
  weatherInputRadioText: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '400',
    color: '#0D89CE',
  },
  weatherInputText: {
    height: 40,
    width: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  weatherInputLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#D2D2D2',
    marginVertical: 20,
  },
  closeButtonAnim: {
    position: 'absolute',
    width: '100%',
    bottom: 0,

  },
  closeButton: {
    height: 60,
    backgroundColor: '#08971F',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});