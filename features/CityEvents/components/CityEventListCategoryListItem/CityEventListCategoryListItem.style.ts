import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  categoryContainer: {
    columnGap: 10
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  categoryName: {
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    lineHeight: 23
  },
  iconContainer: {
    borderRadius: 100,
    padding: 10
  }
});
