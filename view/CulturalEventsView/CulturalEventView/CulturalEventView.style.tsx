import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  infosContainer: {
    backgroundColor: '#F6F6F6',
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    marginVertical: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    width: '100%',
  },
  image: {
    height: 300,
    width: 'auto',
    marginBottom: 20,
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 20,
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    marginRight: 10,
  },
  description: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  
  link: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,

  },
  linkUrl: {
    fontSize: 14,
    color: 'blue',
  },
  accessContainer: {
    marginBottom: 10,
  },
  transportContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  transportType: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  transportValue: {
    fontSize: 16,
    flex: 4,
  },
  closeImageButton: {
    position: 'absolute', 
    bottom: 50, 
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 50,
    zIndex: 1,
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
      },
      android: {
        elevation: 10,
      },
    }),
  
  }
});