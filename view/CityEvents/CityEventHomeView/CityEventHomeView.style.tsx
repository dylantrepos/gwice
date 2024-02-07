import { FilterIcon } from "lucide-react-native";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityEventHomeContainer: {
    flex: 1, 
    height: Dimensions.get("screen").height, 
    position: 'relative'
  },
  cityEventHomeContainerSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  scrollView: {
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  stickyHeader: {
    position: 'absolute',
    zIndex: 13,
    backgroundColor: 'white',
    height: 60,
  },
  headerTitle: {
    color: '#fff',
  },
});