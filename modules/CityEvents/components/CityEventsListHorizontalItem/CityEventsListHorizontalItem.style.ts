import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  culturalEvents: {
    marginBottom: 50,
    height: 'auto',
  },
  culturalEventsTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  culturalEventsTitle: {
    fontSize: 20,
  },
  culturalEventsCardsContainer: {
    paddingHorizontal: 20,
    flexGrow: 0,
  },
});