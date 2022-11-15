import React,{useEffect, useRef,useState} from 'react'
import { FlatList, Image, Text, View } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector ,useDispatch} from 'react-redux';
import ListVertical from '../components/ListVertical'
import {getPersistAuth} from '../functions/globalFunc'
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';
const logintowatch = require('../anims/logintowatch.json');
import {TouchableOpacity} from 'react-native'


const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

import mocks from '../mocks'
import Action from '../Store/Actions';
import screenName from '../constants/screenName';
import Forum from './Forum';


const Tab = createMaterialTopTabNavigator();


export default function BookCase() {
  const dispatch = useDispatch()
  const [userToken, setTokenUser] = useState('')
  const navigation = useNavigation()
  const accessToken = useSelector(state => state.AuthReducer.accessToken)

   const listHistoryReaded = useSelector(state => state.BookReducer.listHistoryReaded)
  const listSubscribeBook = useSelector(state => state.BookReducer.listSubscribeBook)
  const listBookDownload = useSelector(state => state.BookReducer.listBookDownload)
  // const listHotBook = useSelector(state => state.BookReducer.listHotBook)


  useEffect(() => {
    if (accessToken.length > 0) {
      // console.log("🚀 ~ file: BookCase.jsx ~ line 40 ~ useEffect ~ accessToken", accessToken)
      setTokenUser(accessToken)
      dispatch(Action.book.findHistoryReaded(accessToken))
      dispatch(Action.book.findSubscribeBook(accessToken))
      return
    }
    if(accessToken.length == 0){
    // console.log("🚀 ~ file: BookCase.jsx ~ line 45 ~ useEffect ~ accessToken", accessToken)
      
    getPersistAuth().then((accessToken) => { 
    // console.log("🚀 ~ file: BookCase.jsx ~ line 49 ~ getPersistAuth ~ accessToken",)
     
      setTokenUser(accessToken)
      dispatch(Action.book.findHistoryReaded(accessToken))
      dispatch(Action.book.findSubscribeBook(accessToken))
      return
      }).catch()
    }   
    setTokenUser('')
  }, [accessToken.length])

  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
    const HEADER = normalize(300, 400);
    const scrollY = useSharedValue(0);
    const loaded = useSharedValue(0);

    const forumRef = useRef(true)
    // useEffect(() => {
    //     return ()=>{
    //         console.log("end");
    //         forumRef.current = false
    //     }
    // }, [])
      
    // fade in screen, slowly if light mode is on
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
            // justifyContent: 'flex-end',
            backgroundColor: 'white',
            height:'60%',
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


  return (
      userToken?.length > 0 ? (
        <Tab.Navigator>
        <Tab.Screen name="Đã đọc" children={() => <ListVertical  data={listHistoryReaded }/>}/>
        <Tab.Screen name="Theo dõi" children={() => <ListVertical  data={listSubscribeBook}/>} />
        <Tab.Screen name="Tải xuống" children={() => <Forum/>} />
        </Tab.Navigator>
      ) : (
        <Animated.View ref={forumRef} onLayout={onLayout} style={styles.screen}>
            <Animated.View style={styles.header}>
                <Animated.View style={styles.logo}>
                    <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={logintowatch} />
                </Animated.View>  
                <TouchableOpacity onPress={()=> navigation.navigate(screenName.signinScreen,{screenNameBefore:screenName.bookcaseScreen, isGoBack:true})}>
                  <View  flexDirection={'row'}>
                  <Text>Đăng nhập để xem nội dung này </Text>   
                  <Text fontWeight={'bold'} color='#7319e0'>Login</Text>
                  </View>
                </TouchableOpacity>
                
              
            </Animated.View>  
        </Animated.View>
      )

    )
     
    
    
  
}