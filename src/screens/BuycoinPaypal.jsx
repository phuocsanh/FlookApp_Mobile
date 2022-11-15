import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import screenName from '../constants/screenName';
import { useSelector, useDispatch } from 'react-redux';
import { getPersistAuth } from '../functions/globalFunc';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';
import Action from '../Store/Actions';
const logintowatch = require('../anims/logintowatch.json');
import { handleToast } from '../functions/globalFunc';

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

const BuycoinPaypal = () => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)
  // console.log("🚀 ~ file: BuycoinPaypal.jsx ~ line 30 ~ BuycoinPaypal ~ userIsLogin", userIsLogin)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [token, setToken] = useState('');
 
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  const refView = useRef(true)
  const webViewRef = useRef();



  useEffect(() => {
    getPersistAuth().then((accessToken) => { 
      dispatch(Action.auth.FindOneUser(accessToken))
      }).catch()   
}, [ ])

useEffect(() => {
  if (accessToken.length > 0) {
    // console.log("🚀 ~ file: BuycoinPaypal.jsx ~ line 52 ~ useEffect ~ accessToken > 0", accessToken)

    setToken(accessToken)
  }
  if (accessToken.length === 0) {
    // console.log("🚀 ~ file: BuycoinPaypal.jsx ~ line 57 ~ useEffect ~ accessToken == 0", accessToken)
    getPersistAuth().then(token => { setToken(token) }).catch()
  }
  // console.log("token", token)

  return () => {
    // console.log('rertun');
    refView.current = false
  }
}, [accessToken])
  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
  };

  // all the styles
  const styles = {
    screen: useAnimatedStyle(() => ({
      flex: 1,
      opacity: loaded.value,
      backgroundColor: colors.card,
    })),
    header: useAnimatedStyle(() => ({
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingTop: navbar,
      position: 'absolute',
      alignItems: 'center',
      backgroundColor: 'white',
      height: '60%',
      elevation: ios ? undefined : interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [0, 10], 'clamp'),
      shadowOpacity: ios ? interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [0, 0.75], 'clamp') : undefined,
      transform: [
        { translateY: interpolate(scrollY.value, [0, HEADER - navbar], [0, -HEADER + navbar], 'clamp') },
      ],
    })),
    logo: useAnimatedStyle(() => ({
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [1, 0], 'clamp'),
      transform: [
        { translateY: interpolate(scrollY.value, [-HEADER, 0], [-HEADER / 2, 0], 'clamp') },
      ],
    })),
    lottie: {
      top: 5,

      height: '100%',
      opacity: dark ? 0.8 : 1,
    },
    lottieProps: useAnimatedProps(() => ({
      speed: 0.5,
      autoPlay: true,
    })),
  };

  async function onMessage(e) {
    let data = e.nativeEvent.data;
    let payment = JSON.parse(data);
   
    if (payment.status === 'COMPLETED') {
      
      const coin = Number(payment.purchase_units[0]?.description) + Number(userIsLogin?.data?.coin)
      // console.log("🚀 ~ file: BuycoinPaypal.jsx ~ line 119 ~ onMessage ~ coin",  Number(payment.purchase_units[0]?.description) )
  
      dispatch(Action.auth.UpdateOneUserMoblie( {coin:coin}, token,'updateCoin'))
      handleToast("Thanh toán thành công", "success")
      webViewRef.current.reload()

    } else {
  
       handleToast("Thanh toán thành công", "success")
    }
  }
 

  return (
    <SafeAreaView style={{ flex: 1, marginLeft:-2}} ref={refView}>
      {
        accessToken.length === 0 && token?.length == 0 || !token ?
          (
            <Animated.View  onLayout={onLayout} style={styles.screen}>
              <Animated.View style={styles.header}>
                <Animated.View style={styles.logo}>
                  <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={logintowatch} />
                </Animated.View>
                <TouchableOpacity onPress={() => navigation.navigate(screenName.signinScreen, { screenNameBefore: screenName.buyCoinScreen, isGoBack: true })}>
                  <View flexDirection={'row'}>
                    <Text>Đăng nhập để thanh toán </Text>
                    <Text style={{ color: '#7319e0', fontWeight: 'bold' }}>Login</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          )
          :
          <>
            <WebView
              ref={(ref) => webViewRef.current = ref}
              source={{ uri: 'https://tranquil-app-340815.web.app' }}
              style={{ flex: 1, width: "100%", height: '100%' }}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />

          </>
      }

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%", height: '100%'
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default BuycoinPaypal;