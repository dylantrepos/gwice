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
});