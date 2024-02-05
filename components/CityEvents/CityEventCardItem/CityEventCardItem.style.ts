import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  culturalEventsCard: {
    flex: 1,
    // backgroundColor: "red",
    // width: "100%",
    // width: 400,
    // marginTop: 20,
    // marginLeft: 20,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    width: 300,
    // height: 240,
    borderRadius: 10,
    overflow: "hidden",
  },
  culturalEventsCardImageContainer: {
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  culturalEventsCardImage: {
    width: '100%',
    height: '100%',
  },
  culturalEventsCardCategory: {
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 100,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    backgroundColor: '#F6F6F6',
  },
  culturalEventsCardCategoryTitle: {
      fontSize: 12,
      lineHeight: 16,
  },
  culturalEventsCardDetails: {
    // fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
  },
  culturalEventsCardDetailsTitle: {
    fontSize: 12,
  },
  culturalEventsCardDetailsDate: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  culturalEventsCardDetailsDateTitle: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Event Card Large
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
    height: 450,
  },
  cardImage: {
    justifyContent: 'space-between',
    flex: 1,
  },
  cardInfos: {
    // width: '100%',
    padding: 20,
    paddingBottom: 60,
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
  cardDescriptionCategoryContainer: {
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  cardDescriptionCategory: {
    lineHeight: 20,
  },
  cardDescriptionText: {
    color: '#fff',
    padding: 20,
  },
});