import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingBottom: 40,
  },
  infosContainer: {
    backgroundColor: '#F6F6F6',
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    marginVertical: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    width: '100%',
  },
  image: {
    height: 300,
    width: 'auto',
    marginBottom: 20,
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 20,
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    marginRight: 10,
  },
  description: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  
  link: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,

  },
  linkUrl: {
    fontSize: 14,
    color: 'blue',
  },
  accessContainer: {
    marginBottom: 10,
  },
  transportContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  transportType: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  transportValue: {
    fontSize: 16,
    flex: 4,
  },
});