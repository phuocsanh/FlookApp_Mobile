import React, { memo, useEffect, useState, useRef } from 'react';
import { useBooksState } from '../BookStore';
import { View, Pressable, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar } from "react-native-elements";


import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Text from '../components/Text';
import BookList from '../components/BookList';
import mocks from '../mocks';
import axios from 'axios';


import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);
const welcome1 = require('../anims/welcome1.json');

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import screenName from '../constants/screenName';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../Store/Actions';
import { getPersistAuth, handleToast } from '../functions/globalFunc'



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});




function Home({ navigation }) {
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  const { books } = useBooksState();
  const dispath = useDispatch();
  const [tokenUser, setTokenUser] = useState("");



  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //  NOTIFYCATION


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }



  async function registerForPushNotificationsAsync() {
    console.log("🚀 ~ file: Home.jsx ~ line 62 ~ registerForPushNotificationsAsync ~ registerForPushNotificationsAsync",)

    let token;
    console.log("token0");

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("token1");
    dispath(Action.auth.UpdateOneUserMoblie({deviceToken:token}, tokenUser, 'deviceToken'))

    if (Device.isDevice) {
      console.log("🚀 ~ file: Home.jsx ~ line 66 ~ registerForPushNotificationsAsync ~ Device", Device)

      // const { status: existingStatus } = await Notifications.getPermissionsAsync();
      // let finalStatus = existingStatus;
      // if (existingStatus !== 'granted') {
      //   const { status } = await Notifications.requestPermissionsAsync();
      //   finalStatus = status;
      //   console.log("🚀 ~ file: Home.jsx ~ line 71 ~ registerForPushNotificationsAsync ~ status", status)
      // }
      // if (finalStatus !== 'granted') {
      //   alert('Failed to get push token for push notification!');
      //   return;
      // }



    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }


  // console.log("expoPushToken", expoPushToken);

  const send = async (token) => {

    const result = await axios.post('http://192.168.11.17:8000/api/comment-management/add-comment?type=review', {
      reviewId: "62d379ee2b51867ad738a76c",
      content: "comment hay"
    },
      {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: `${token}`
        }
      }
    )
    // console.log('result', result.data.data.deviceToken);
    const deviceToken = result.data.data.deviceToken
    const message = {
      to: deviceToken,
      sound: 'default',
      title: 'hi',
      body: 'hehehe',
      data: { data: 'go to' }
    }
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  // END NOTIFYCATION

  // fade in screen, slowly if light mode is on
  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
  };

  // scrollview handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });

  // go to search screen
  const searchBooks = () => {
    Haptics.selectionAsync();
    navigation.push(screenName.searchScreen, { bookList: books });
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
      justifyContent: 'flex-end',
      backgroundColor: colors.background,
      height: interpolate(scrollY.value, [-HEADER, 0], [HEADER * 2, HEADER], 'clamp'),
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
    menu: useAnimatedStyle(() => ({
      marginBottom: margin / 2,
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [0, 1]),
    })),
    more: useAnimatedStyle(() => ({
      marginBottom: margin / 2,
      flexDirection: 'row',
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [0, 1]),
    })),
    welcomeText: useAnimatedStyle(() => ({
      marginBottom: margin / 2,
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [1, 0]),
    })),
    searchInput: useAnimatedStyle(() => ({
      borderRadius: 25,
      marginHorizontal: 20,
      paddingHorizontal: margin,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderColor: colors.background,
      marginBottom: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [-25, 6], 'clamp'),
      height: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [50, 38], 'clamp'),
      width: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [width - margin * 2, width - margin], 'clamp'),
      borderWidth: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [1, 0], 'clamp'),
    })),
    searchIcon: {
      width: 30,
      opacity: 0.3,
    },
    searchText: {
      height: 38,
      width: '100%',
      opacity: 0.25,
      lineHeight: 38,
      fontSize: 15,
    },
    scrollView: {
      paddingTop: HEADER,
    },
    flatStyle: {
      width: "100%",
      height: "100%",
      // backgroundColor: "red",
    },
    viewFlatlist: {
      flex: 1,
      paddingHorizontal: margin,
    },
    Img: {
      width: "100%", height: "100%", resizeMode: "cover", borderRadius: 5
    },
    viewItem: {
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
      width: "33.33%",
      // backgroundColor: "blue",
      marginBottom: 5
    },
    textTitle: {
      width: '100%',
      fontSize: 12,
      textAlign: 'center',
      // backgroundColor: "blue"
    },
    heading: {
      paddingTop: margin,
      marginBottom: 20,
      // paddingHorizontal: margin,
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
  };



  const listHistoryReaded = useSelector(state => state.BookReducer.listHistoryReaded)
  const listSubscribeBook = useSelector(state => state.BookReducer.listSubscribeBook)
  const listCompletedeBook = useSelector(state => state.BookReducer.listCompletedBook)
  const listNewBook = useSelector(state => state.BookReducer.listNewBook)
  const listHotBook = useSelector(state => state.BookReducer.listHotBook)
  const listBookGenre = useSelector(state => state.BookReducer.listBookGenre)

  // console.log("🚀 ~ file: Home.jsx ~ line 294 ~ Home ~ listNewBook", listNewBook)

  // console.log("🚀 ~ file: Home.jsx ~ line 292 ~ Home ~ listBookCategory", listBookGenre)
  // const getData = async()=>{
  //   const userData = await AsyncStorage.getItem('userData')
  //   console.log("🚀 ~ file: Home.jsx ~ line 297 ~ Home ~ userToken", userData.accessToken)
  // }

  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  // console.log("🚀 ~ file: Home.jsx ~ line 303 ~ Home ~ accessToken",accessToken )

  useEffect(() => {
    if (accessToken.length > 0) {
      
      setTokenUser(accessToken)
      dispath(Action.book.findHistoryReaded(accessToken))
      dispath(Action.book.findSubscribeBook(accessToken))
      return
    }
    if (accessToken.length == 0) {
      // console.log("Home else is running")
      getPersistAuth().then((accessToken) => {
        // console.log("🚀 ~ file: Home.jsx ~ line 305 ~ getPersistAuth ~ accessToken", accessToken)
        setTokenUser(accessToken)
        dispath(Action.book.findHistoryReaded(accessToken))
        dispath(Action.book.findSubscribeBook(accessToken))
        return
      }).catch()
    }
    setTokenUser('')

    // console.log('token user', tokenUser)

    registerForPushNotificationsAsync().then(token => console.log('token'));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [accessToken.length, dispath])

  useEffect(() => {
    dispath(Action.book.findCompletedBook())
    dispath(Action.book.findNewBook())
    dispath(Action.book.findHotBook())
    dispath(Action.book.findBookGenre())


  }, [])




  const renderItem = (value) => {
    const {
      item: { name, image }
    } = value
    // console.log(value)


    return (
      <View style={styles.viewItem} >
        <Avatar containerStyle={{ marginBottom: 5 }} source={{ uri: image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_9hFRn87ggCMlIe4ekdWMJsS7QyhnygFaw&usqp=CAU" }} size={90} rounded></Avatar>
        <Text style={styles.textTitle}>{name ? name : name?.length < 30 ? name : `${name?.slice(0, 30)}...`}</Text>
      </View>
    )

  }

  return (
    <Animated.View onLayout={onLayout} style={styles.screen}>
      <Animated.View style={styles.header}>
        <Animated.View style={styles.logo}>
          <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={welcome1} />
        </Animated.View>

        <Pressable onPress={searchBooks}>
          <SharedElement id="search">
            <Animated.View size={15} style={styles.searchInput}>
              <View style={styles.searchIcon}>
                <AntDesign color={colors.text} name="search1" size={15} />
              </View>
              <Text style={styles.searchText}>Find your next book...</Text>
            </Animated.View>
          </SharedElement>
        </Pressable>
      </Animated.View>



      <Animated.ScrollView contentContainerStyle={styles.scrollView} scrollEventThrottle={1} onScroll={scrollHandler}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: margin * 2, marginBottom: margin }}>
          <TouchableOpacity testID='touch-bxh-home' style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate(screenName.rankingScreen)} >
            <Image style={{ width: 48, height: 48, marginBottom: margin / 3 }} source={require('../resources/Images/iconRaking.png')} />
            <Text size={12}>BXH</Text>
          </TouchableOpacity>
          <TouchableOpacity testID='touch-danhmuc-home' style={{ alignItems: 'center' }} onPress={() => navigation.navigate(screenName.channelScreen)}>
            <Image style={{ width: 48, height: 48, marginBottom: margin / 3 }} source={require('../resources/Images/IconCategory.png')} />
            <Text size={12}>Danh mục</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleToast('Chức năng đang phát triển')} testID='touch-point-home' style={{ alignItems: 'center' }}>
            <Image style={{ width: 48, height: 48, marginBottom: margin / 3 }} source={require('../resources/Images/IconPoint.png')} />
            <Text size={12}>Điểm Của Tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>handleToast('Chức năng đang phát triển')}  testID='touch-subscrible-home' style={{ alignItems: 'center' }}>
            <Image style={{ width: 48, height: 48, marginBottom: margin / 3 }} source={require('../resources/Images/iconDiaLy.png')} />
            <Text size={12}>Theo dõi</Text>
          </TouchableOpacity>
        </View>

        <BookList books={listHotBook ? listHotBook : mocks.listBook} title="BXH Hot" />
        <BookList books={listNewBook ? listNewBook : mocks.listBook} title="Anime Mới" />
        <BookList books={listCompletedeBook ? listCompletedeBook : mocks.listBook} title="Completed"
        />
        {
          tokenUser?.length > 0 && <>
          {
            listHistoryReaded.length > 0 &&  <BookList books={listHistoryReaded ? listHistoryReaded : mocks.listBook} title="📚 Lịch sử đọc" tokenUser={tokenUser} screen={screenName.bookcaseScreen} />
             
          }
          {
            listSubscribeBook.length > 0 && <BookList books={listSubscribeBook ? listSubscribeBook : mocks.listBook} title="Subscribe"
             tokenUser={tokenUser} screen={screenName.bookcaseScreen} />
          }
            
          </>
        }


        <View style={styles.viewFlatlist}>
          <View style={styles.heading}>
            <View style={{
              borderLeftColor: '#673AB7',
              borderLeftWidth: 5, paddingLeft: 5
            }}>
              <Text size={17} bold>{'Thể loại'}</Text>
            </View>

            {/* <Text size={14}>see more</Text> */}
          </View>
          <FlatList
            style={styles.flatStyle}
            data={listBookGenre.slice(0, 6)}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.ScrollView>
    </Animated.View>
  );
}

// export default memo(Home);
export default Home;
