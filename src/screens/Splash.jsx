import React, { memo, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useTheme,StackActions,NavigationActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Text from '../components/Text';
import Button from '../components/Button';



import screenName from '../constants/screenName';

const lottie = require('../anims/reading.json');

function Splash() {
  const { colors, margin, normalize } = useTheme();
  const navigation = useNavigation();
  const refSplash = useRef(true)
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
    },
    scroll: {
      paddingVertical: margin,
      paddingHorizontal: margin * 2,
    },
    lottie: {
      alignSelf: 'center',
      marginRight: margin / 2,
      width: normalize(320, 400),
    },
    title: {
      fontSize: 50,
      lineHeight: 60,
      fontWeight: '700',
      marginTop: margin * 2,
    },
    subTitle: {
      fontSize: 17,
      fontWeight: '500',
      marginTop: margin,
      marginBottom: margin * 2,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(screenName.mainTabNavigator)
    },2000)
    return ()=>{
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: screenName.mainTabNavigator})],
        key: null,
      });
      navigation.dispatch(resetAction)
    }
  },[])

  return (
    <ScrollView style={styles.screen} centerContent contentContainerStyle={styles.scroll} ref={refSplash}>
      <LottieView autoPlay loop style={styles.lottie} source={lottie} />
      {/* {/* <Text bold center style={styles.title}>
        {'Flex \n Flook app'}
      </Text> */}
      <Text center style={styles.subTitle}>
        Its never been easier to organize your reading list in one place.
      </Text>
      {/* <Button onPress={() => navigation.push('BookList')}>
        Get Started
      </Button> */}
    </ScrollView>
  );
}

export default memo(Splash);
