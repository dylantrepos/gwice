import { Platform, StyleSheet } from 'react-native';
import palette from '../../../../theme/palette';
import { CityEventDetailsPage } from '../../types/CityEventsDetailsPage.type';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {},
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 9
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35
      },
      android: {
        elevation: 10
      }
    })
  },
  infosContainer: {
    paddingRight: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    gap: 10
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%'
  },
  image: {
    height: CityEventDetailsPage.ImageHeight,
    width: 'auto',
    marginBottom: 20
  },
  title: {
    paddingHorizontal: 20
  },
  date: {
    marginTop: 5,
    marginRight: 10
  },
  description: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  location: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10
  },

  link: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  linkUrl: {
    color: 'blue'
  },
  accessContainer: {
    marginBottom: 10
  },
  transportContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  transportType: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1
  },
  transportValue: {
    fontSize: 16,
    flex: 4
  },
  closeImageButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 50,
    zIndex: 1,
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 9
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35
      },
      android: {
        elevation: 10
      }
    })
  }
});

export const markdownStyles: StyleSheet.NamedStyles<any> = {
  // The main container
  body: {
    paddingHorizontal: 20,
    fontFamily: 'Poppins_400',
    fontSize: 14
  },

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11
  },

  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 1
  },

  // Emphasis
  strong: {
    fontFamily: 'Poppins_600',
    fontWeight: '600'
  },
  em: {
    fontStyle: 'italic'
  },
  s: {
    textDecorationLine: 'line-through'
  },

  // Blockquotes
  blockquote: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCC',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5
  },

  // Lists
  bullet_list: {},
  ordered_list: {},
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    marginLeft: 10,
    marginRight: 10
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    flex: 1
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    marginLeft: 10,
    marginRight: 10
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    flex: 1
  },

  // Code
  code_inline: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'Courier'
      },
      android: {
        fontFamily: 'monospace'
      }
    })
  },
  code_block: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'Courier'
      },
      android: {
        fontFamily: 'monospace'
      }
    })
  },
  fence: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'Courier'
      },
      android: {
        fontFamily: 'monospace'
      }
    })
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row'
  },
  td: {
    flex: 1,
    padding: 5
  },

  // Links
  link: {
    textDecorationLine: 'none',
    color: palette.blue800
  },
  blocklink: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1
  },

  // Images
  image: {
    flex: 1
  },

  // Text Output
  text: {},
  textgroup: {},
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  },
  hardbreak: {
    width: '100%',
    height: 1
  },
  softbreak: {},

  // Believe these are never used but retained for completeness
  pre: {},
  inline: {},
  span: {}
};
