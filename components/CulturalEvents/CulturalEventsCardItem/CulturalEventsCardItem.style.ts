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
});