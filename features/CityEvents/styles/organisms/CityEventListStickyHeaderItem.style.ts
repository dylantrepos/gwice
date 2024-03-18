import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  categoryTitleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  categoryContainerFilterButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#C70303'
  },
  categoryContainerFilterText: {
    color: '#C70303',
    fontSize: 12
  },
  categoryContainerTitle: {
    fontSize: 18,
    paddingTop: 10
  },

  // Search
  searchEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    margin: 20,
    marginBottom: 10,
    borderRadius: 100,
    gap: 10,
    overflow: 'hidden'
  },
  searchEventIcon: {},
  searchEventTitle: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 22
  },
  searchResetIcon: {
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    right: 0,
    width: 50,
    height: 40,
    borderTopEndRadius: 100,
    borderBottomEndRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
