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
  categoryContainerTitle: {
    fontSize: 18,
    paddingTop: 10,
  },
  categoryList: {
  },
  category: {
    display: 'flex',
    alignItems: 'center',
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