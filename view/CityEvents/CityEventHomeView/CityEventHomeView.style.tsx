import { FilterIcon } from "lucide-react-native";
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
  stickyHeader: {
    position: 'absolute',
    zIndex: 13,
    backgroundColor: 'white',
    height: 60,
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
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    alignSelf: 'center',
  },
  promoteEventButtonText: {
    color: '#fff',
    lineHeight: 20,
    textAlign: 'center',
  },

  // Search event
  searchEvent: {
    backgroundColor: '#E9E9E9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    margin: 20,
    borderRadius: 100,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  searchEventIcon: {

  },
  searchEventTitle: {
    fontSize: 16,
    color: '#7D7D7D',
    lineHeight: 22,
  },




  // Category
  categoryContainer: {
    backgroundColor: 'white',
  },
  categoryContainerTitle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10,
  },
  categoryList: {
  },
  category: {
    display: 'flex',
    // backgroundColor: '#1C1C1C',
    // width: 170,
    alignItems: 'center',
    // paddingLeft: 10,
    // gap: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  categoryIcon: {
  },
  categoryName: {
    fontSize: 16,
    textAlign: 'center',
  },



  // Event Temp
  eventTempNavigatorScrollView: {
    // height: 50,
    // backgroundColor: 'red',
    // paddingHorizontal: 20,
    // display: 'flex',
    // width: '100%',
    marginTop: 20,
  },

  eventTempNavigator: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  
  eventTempNavigatorTab: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  eventTempNavigatorTitle: {
    fontSize: 20,
    color: '#fff',
  },
  
  eventTempNavigatorIndicator: {

  },



  // Event Card
  cardList: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    // width: '100%',
    marginVertical: 5,
    marginHorizontal: 10,
    height: 400,
  },
  cardImage: {
    justifyContent: 'space-between',
    flex: 1,
  },
  cardInfos: {
    // width: '100%',
    padding: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
  },
  cardDate: {
    color: '#fff',
  },
  cardDescription: {
    justifyContent: 'flex-end',
    height: 200,
  },
  cardDescriptionText: {
    color: '#fff',
    padding: 20,
    paddingBottom: 30,
  },


  // Filter List
  filterList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  filter: {
    // color: '#fff',
    backgroundColor: '#ECECEC',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 10,
  },
  filterIcon: {
    // color: '#fff',
  },
  filterTitle: {
    // color: '#fff',
  },

});