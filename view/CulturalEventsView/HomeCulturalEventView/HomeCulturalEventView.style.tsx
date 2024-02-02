import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeCulturalEvent: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  scrollView: {
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerTitle: {
    color: '#fff',
  },

  // Promote event
  promoteEvent: {
    backgroundColor: '#0D89CE',
    position: 'relative',
  },
  promoteEventImage: {
    width: '100%',
    height: 400,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  promoteEventInfos: {
    gap: 10,
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  promoteEventDate: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  promoteEventButton: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    lineHeight: 20,
    alignSelf: 'center',
  },

  // Category
  categoryContainer: {
  },
  categoryContainerTitle: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  categoryList: {
    gap: 10, 
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    // width: 170,
    height: 80, 
    alignItems: 'center',
    // paddingLeft: 10,
    // gap: 10,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 25,
    gap: 10,
  },
  categoryIcon: {
  },
  categoryName: {
    fontSize: 14,
    color: '#fff',
  },

  // Event Temp
  eventTempNavigator: {
    marginTop: 20,
  },
});