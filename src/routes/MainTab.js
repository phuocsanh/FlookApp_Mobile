import React,{useEffect, useState} from 'react';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from 'react-native-vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from 'react-native'
import screenName from "../constants/screenName";
import { getPersistAuth } from '../functions/globalFunc';
import { useDispatch, useSelector } from 'react-redux';
// import TopTab from '../Components/TopTab'
// import ForumScreen from '../Screens/ForumScreen/ForumScreen'
// import ComicScreen from "../Screens/Comic";
// import NovelScreen from "../Screens/Novel";
// import ShortStoryScreen from "../Screens/ShortStory";
// import ChatStoryScreen from "../Screens/ChatStory";
// import RankingScreen from "../Screens/Ranking";
// import WriteStoryScreen from "../Screens/WriteStory/WriteStoryScreen";
// import FollowScreen from "../Screens/Follow/FollowScreen";
// import PointMeScreen from "../Screens/PointMe/PointMeScreen";
// import Detail from "../Screens/Detail";
// import StoreDetailScreen from "../Screens/Detail/StoreDetailScreen";

import Home from "../screens/Home";
import Notify from '../screens/Notify'
import Profile from '../screens/Account'
import Forum from '../screens/Forum';
import BookCase from '../screens/BookCase';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native';
import Action from '../Store/Actions';
// const arrayHomeTab = [
//   { _id: "1", screenName:screenName.pointMeScreen, title:'Điểm của tôi', component:PointMeScreen, }, 
//   { _id: "2", screenName:screenName.newsFeedScreen, title:'Bảng tin', component:ShortStoryScreen },
//   { _id: "3", screenName:screenName.forumScreen, title:'Cộng đồng', component:ForumScreen },
//   { _id: "4", screenName:screenName.writeStoryScreen, title:'Viết truyện', component:WriteStoryScreen },
//   { _id: "5", screenName:screenName.followScreen, title:'Đang theo dõi', component:FollowScreen },
// ]

// const arrayCategoryTab = [
//   { _id: "1", screenName:screenName.comicScreen, title:'Truyện tranh', component:ComicScreen }, 
//   { _id: "2", screenName:screenName.novelScreen, title:'Tiểu thuyết', component:NovelScreen },
//   { _id: "3", screenName:screenName.shortStoryScreen, title:'Truyện ngắn', component:ShortStoryScreen },
//   { _id: "4", screenName:screenName.chatStoryScreen, title:'Truyện chat', component:ChatStoryScreen },
//   { _id: "5", screenName:screenName.movieScreen, title:'Phim', component:ChatStoryScreen },
// ]

export default function MainTab(props, accessibilityState) {
  const BottomTab = createBottomTabNavigator();
  const navigation = useNavigation();
  const SafeAreaInsets = useSafeAreaInsets()
  const dispatch = useDispatch()
  const [numNoti, setNumNoti] = useState(0)
  const focused = accessibilityState.selected;
  const [token, setToken] = useState('')


  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  // console.log("🚀 ~ file: Details.jsx ~ line 142 ~ Details ~ accessToken", accessToken)
  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)
  const listNotify = useSelector(state => state.AuthReducer.listNotify)
  // console.log("🚀 ~ file: MainTab.js ~ line 62 ~ MainTab ~ listNotify", listNotify)

  


  

  const tabBarOptions = {
    activeTintColor: '#673AB7',
    inactiveTintColor: 'gray'
  }
  
  const countNotifi =()=>{
    const listNotifi = listNotify?.data?.notify?.filter((item, idex)=>{
      return item.seen === false
    })
    setNumNoti(listNotifi?.length)
  }

  useEffect(() => {
    if (accessToken.length > 0) {
      // console.log("🚀 ~ file: DetailChapter.jsx ~ line 51 ~ useEffect ~ accessToken.length > 0")
      setToken(accessToken)
      dispatch(Action.auth.GetNotify(accessToken))
    }
    else if (accessToken.length == 0) {
      // console.log("🚀 ~ file: DetailChapter.jsx ~ line 56 ~ useEffect ~ accessToken.length == 0")
      getPersistAuth().then((accessToken) => {
        if (accessToken) {
          setToken(accessToken)
          // console.log("🚀 ~ file: Details.jsx ~ line 163 ~ getPersistAuth ~ accessToken", accessToken
          dispatch(Action.auth.GetNotify(accessToken))
          return
        }
        setToken('')
      }).catch()
    }
    // console.log("🚀 ~ file: Details.jsx ~ line 139 ~ Details ~ token", token)
  }, [accessToken.length])

  useEffect(()=>{
    countNotifi()
  },[listNotify])

  useEffect(()=>{
    if(token.length > 0){
      setInterval(() => {

        dispatch(Action.auth.GetNotify(token))
      }, 30000);
    }
  },[dispatch])
  
  const showNotify = (name, iconName, size, color) => {
    if (name == screenName.notifyScreen) {
      return <View style={{ position: 'relative'}}>
        <View style={{ 
      top: -7,
    
      margin: 'auto',
      position: 'absolute',
     
      right: 0,
      justifyContent: "flex-end",
     
         zIndex:10}}>
          <Text style={{color:'red', fontWeight:'900'}}>{numNoti > 0 ? numNoti : ""}</Text>
        </View>
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      </View>
    } else {
      return <MaterialCommunityIcons name={iconName} size={size} color={color} />
    }

  }
  const screenOptions = ({ route }) => (

    {
      headerShown: true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName
        switch (route.name) {
          case screenName.homeScreen:
            iconName = focused ? 'home' : 'home-outline'; break;
          case screenName.bookcaseScreen:
            iconName = focused ? 'bookshelf' : 'bookshelf'; break;
          case screenName.forumScreen:
            iconName = focused ? 'human-capacity-increase' : 'human-greeting-proximity'; break;
          case screenName.notifyScreen:
            iconName = focused ? 'bell-circle' : 'bell-outline'; break;
          case screenName.profileScreen:
            iconName = focused ? 'account-circle' : 'account-circle-outline'; break;
          default: break;
        }
        return showNotify(route.name, iconName, size, color)
      },
    })

  const handlePress = () => {
    navigation.navigate(screenName.channelScreen)
  }

  return (
    <BottomTab.Navigator initialRouteName={screenName.homeScreen} screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      {/* <BottomTab.Screen name={screenName.newsFeedScreen} options={{title : 'Trang chủ'}} children={() => (
        <View style={{flex: 1}}>
          <TopTab arrayCategory={arrayHomeTab}
            Icon1={<MaterialCommunityIcons name={'home'} size={20} color={'red'} />}
            Icon2={<MaterialCommunityIcons name={'home'} size={20} color={'red'} />}
          />
        </View>
      )}/> */}
      {/* <BottomTab.Screen name={screenName.home} options={{title: 'Danh mục', headerShown: false}} children={() => (
        <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
          <TopTab arrayCategory={arrayCategoryTab} onPressicon1={() => navigation.navigate('model')} onPressicon2={handlePress}
            Icon1={<FontAwesome name='edit' size={20} color={'#673AB7'} />}
            Icon2={<Ionicons name='ios-options-outline' size={20} color={'#673AB7'} />}
          />
        </SafeAreaView>
      )}/> */}
      <BottomTab.Screen name={screenName.homeScreen} options={{ title: 'Trang chủ', headerShown: false }} component={Home} />
      <BottomTab.Screen name={screenName.bookcaseScreen} options={{ title: 'Tủ sách' }} component={BookCase} />
      <BottomTab.Screen name={screenName.forumScreen}
        options=
        {{
          title: 'Diễn đàn',
          headerLeft: () =>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate(screenName.homeScreen)}>
              <MaterialIcons name='keyboard-backspace' size={20} />
            </TouchableOpacity>
        }}
        component={Forum} />
      <BottomTab.Screen name={screenName.notifyScreen} options={{ title: 'Thông báo' }} component={Notify} />

      <BottomTab.Screen name={screenName.profileScreen} options={{ title: 'Cá nhân', headerShown: false }} component={Profile} />
    </BottomTab.Navigator>
  );
};