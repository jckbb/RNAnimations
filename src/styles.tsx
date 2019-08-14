import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle,
  list: ViewStyle,
  listRow: ViewStyle,
};

export default StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listRow: {
    flex: 1,
  }
});