import { StyleSheet, ViewStyle, TextStyle, ImageBackground, Dimensions } from 'react-native';

interface Styles {
  container: ViewStyle,
  defaultContainer: ViewStyle,
  selectedContainer: ViewStyle,
  defaultButton: ViewStyle,
  labelContainer: ViewStyle,
  label: TextStyle,
  button: ViewStyle,
};

export const buttonDimension = 65;

const defaultColor = '#ffffff';

export const iconSize = 30, iconColor = '#000000';
export const selectedBackgroundColor = '#2ecc71';
export const dismissBackgroundColor = '#c0392b';

export default StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: buttonDimension,
    width: buttonDimension,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#000000',
    opacity: 0.8,
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  labelContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  defaultButton: {
    backgroundColor: defaultColor,
    height: buttonDimension,
    width: buttonDimension,
    borderRadius: buttonDimension / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: buttonDimension,
    borderRadius: buttonDimension / 2,
    backgroundColor: selectedBackgroundColor,
  },
});