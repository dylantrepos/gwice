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
    width: 250,
    borderRadius: 10,
    overflow: "hidden",
  },
  culturalEventsCardImageContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "blue",
  },
  culturalEventsCardImage: {
    width: '100%',
    height: '100%',
  },
  culturalEventsCardDetails: {
    // fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  culturalEventsCardDetailsTitle: {
    fontSize: 12,
  },
});