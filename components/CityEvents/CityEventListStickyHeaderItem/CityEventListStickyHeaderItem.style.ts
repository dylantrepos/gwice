import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  categoryTitleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryContainerFilterButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#C70303',
  },
  categoryContainerFilterText: {
    color: '#C70303',
    fontSize: 12,
  },
  categoryContainerTitle: {
    fontSize: 18,
    paddingTop: 10,
  },
  searchEvent: {
    backgroundColor: '#E9E9E9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 100,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  searchEventIcon: {

  },
  searchEventTitle: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 22,
  },
});
