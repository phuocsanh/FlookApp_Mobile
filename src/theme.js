import Constants from 'expo-constants';
import { useWindowDimensions, Platform } from 'react-native';

/* Return the App Theme Object */
export default function getTheme(scheme) {
  const { width, height } = useWindowDimensions();
  const dark = scheme === 'dark';
  const normalize = (size, max) => Math.min(size * (width / 375), max);

  return {
    dark,
    width,
    height,
    ios: Platform.OS === 'ios',
    margin: normalize(20, 35),
    colors: {
      white: '#ffffff',
      primary: '#ff6b6b',
      success: '#20bf6b',
      warning: '#f39c12',
      error: '#e74c3c',
      text: dark ? '#f2f2f2' : '#1a1a1a',
      card: dark ? '#000000' : '#ffffff',
      background: dark ? '#1a1a1a' : '#f2f2f2',
      border: dark ? '#f2f2f2dd' : '#1a1a1add',
      button: dark ? '#1a1a1add' : '#f2f2f2dd',
    },
    font: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}

export const fonts = {
  text: 'OpenSans-Regular',
  h1: 'OpenSans-Bold',
  h2: 'OpenSans-Bold',
  h3: 'OpenSans-Bold',
  h4: 'OpenSans-Bold',
  h5: 'OpenSans-SemiBold',
  p: 'OpenSans-Regular',

  // based on fontWeight
  thin: 'OpenSans-Light',
  extralight: 'OpenSans-Light',
  light: 'OpenSans-Light',
  normal: 'OpenSans-Regular',
  medium: 'OpenSans-SemiBold',
  semibold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
  extrabold: 'OpenSans-ExtraBold',
  black: 'OpenSans-ExtraBold',
};