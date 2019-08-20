import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle,
  list: ViewStyle,
  listRow: ViewStyle,
};

export default StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  list: {
    flex: 1,
    marginHorizontal: 30,
  },
  listRow: {
    flex: 1,
    marginVertical: 15,
  }
});