import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  culturalEventsCard: {
    // flex: 1,
    width: 300,
    borderRadius: 10,
  },
  cardEmptyContainer: {
    borderRadius: 10,
    flex: 1,
    height: 200,
    width: 300,
  },
  culturalEventsCardImageContainer: {
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.20,
        shadowRadius: 12.35,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  culturalEventsCardImage: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  culturalEventsCardCategory: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
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
    paddingHorizontal: 10,
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

  cardLargeEmptyContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
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
  cardDescriptionCategoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  cardDescriptionCategoryContainer: {
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 10,
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
    paddingTop: 15,
  },
});