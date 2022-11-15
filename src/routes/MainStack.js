import React, { memo } from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';


import { Ionicons } from 'react-native-vector-icons';
import { Text } from 'react-native';
import screenName from '../constants/screenName';
import MainTab from './MainTab';

// import ForumScreen from '../screens/ForumScreen/ForumScreen';
// import NotifyScreen from '../screens/Notification/NotifyScreen';

// import RankingScreen from '../screens/Ranking';
import ChannelScreen from '../screens/Channel';
// import PointMeScreen from '../screens/PointMe/PointMeScreen';
// import DailyScreen from '../screens/Daily/DailyScreen';

// import ComicScreen from '../screens/Comic';
import FilterScreen from '../screens/Filter';
import CommentScreen from '../screens/Comment';

// import AboutScreen from '../screens/About/AboutScreen';
// import ChapterScreen from '../screens/Chapter/ChapterScreen';
// import CommentScreen from '../screens/Comment/CommentScreen';
// import DailyAttendanceScreen from '../screens/DailyAttendance/DailyAttendanceScreen';
// import DownloadScreen from '../screens/Download/DownloadScreen';
// import FollowScreen from '../screens/Follow/FollowScreen';
// import ForumTabScreen from '../screens/ForumTab/ForumTabScreen';
// import GameScreen from '../screens/Game/GameScreen';
// import HistoryScreen from '../screens/History/HistoryScreen';
// import NovelScreen from '../screens/Novel';
// import ShortStoryScreen from '../screens/ShortStory';
// import StoryChatScreen from '../screens/ChatStory';
// import WriteStoryScreen from '../screens/WriteStory/WriteStoryScreen';

import Splash from '../screens/Splash';
import Search from '../screens/Search';
import Details from '../screens/Details';

import Action from '../Store/Actions';

import Login from '../screens/Login'
import Register from '../screens/Register'
import UpdateProfile from '../screens/UpdateProfile';

import BuyCoin from '../screens/BuyCoin';
import Payment from '../screens/Payment';
import ForgotPass from '../screens/ForgotPass';
import ChangePass from '../screens/ChangePass';
import Ranking from '../screens/Ranking';
import DetailChapter from '../screens/DetailChapter';
import BuycoinPaypal from '../screens/BuycoinPaypal';


const MainStackNavigator = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation();
  const MainStack = createNativeStackNavigator();
  // const MainStack = createSharedElementStackNavigator();


  const listFilter = useSelector(state => state.BookReducer.listFilter)


  const handlePressGoback = {
    headerLeft: () => <Ionicons size={25} name="md-chevron-back" color="gray" onPress={() => navigation.goBack()} />,
  };

  const handlePressSearch = {
    headerRight: () => <Ionicons size={25} name="ios-search-sharp" color="gray" onPress={() => navigation.navigate(screenName.filterScreen)} />,
  };
  
  const fadeScreen = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });


  const sharedElementsDetails = (route, otherRoute) => {
    if ([screenName.homeScreen, screenName.searchScreen].includes(otherRoute.name)) {
      return [route.params.book._id];
    }
    return [];
  }

  const sharedElementsSearch = (_, otherRoute) => (otherRoute.name === screenName.homeScreen ? [{
    id: 'search',
    animation: 'fade',
    resize: 'clip',
    align: 'left-top',
  }] : [])

  const clearFilterFunc = useSelector(state=> state.AppReducer.funcClearFilter)
  const filterFunc = useSelector(state=> state.AppReducer.funcFilter)
  const bookTransition = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  const searchTranstion = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };



  const options = {
    navigator: {
      headerShown: false, 
      cardOverlayEnabled: true, 
      unmountInactiveRoutes:true,
      cardStyle: { backgroundColor: 'transparent' }
    },
    detailBook: {
      gestureEnabled: false,
      cardStyleInterpolator: fadeScreen,
      transitionSpec: {
        open: bookTransition,
        close: bookTransition,
      },
    },
    search:{
      cardStyleInterpolator: fadeScreen,
      transitionSpec: {
        open: searchTranstion,
        close: searchTranstion,
      },
    },
    channel: {
      headerShown:true,
      title: '',
      ...handlePressGoback,
      ...handlePressSearch,
      headerStyle: { 
        backgroundColor: '#fff', 
        elevation: 0, 
        borderBottomWidth: 0, 
        shadowColor: 'transparent', 
        shadowOpacity: 0, 
        height: 0 
      },
    },
    filter: {
      // headerShown:true,
      headerTitleAlign: 'center',
    
      headerTitle: (props) => <Text style={{fontWeight:'500'}} onPress={() => {clearFilterFunc()}}>Clear</Text>,

      // ...handlePressGoback,
      headerRight: () => <Text style={{fontWeight:'500'}} onPress={() => {filterFunc()}}>Refine</Text>,
    },
    buyCoin: {
      headerShown:true,
      title: 'Nạp Coin',
      ...handlePressGoback,
      
      
      
    }
  }

  return (
    <MainStack.Navigator initialRouteName={screenName.mainTabNavigator} screenOptions={options.navigator} detachInactivescreens={false}>
      <MainStack.Screen name={screenName.splashScreen} component={Splash} />
      <MainStack.Screen name={screenName.mainTabNavigator} component={MainTab} options={{headerShown: false}}/>
      <MainStack.Screen name={screenName.searchScreen} component={Search} options={options.search} sharedElements={sharedElementsSearch}/>
      <MainStack.Screen name={screenName.detailScreen} component={Details} options={options.detailBook} sharedElements={sharedElementsDetails}/>
      
      <MainStack.Screen name={screenName.rankingScreen} component={Ranking} options={{headerShown:false}}/>
      <MainStack.Screen name={screenName.signinScreen} component={Login} options={{headerShown: false}}/>
      <MainStack.Screen name={screenName.updateProfile} component={UpdateProfile} options={{headerShown: false}}/>
      <MainStack.Screen name={screenName.signupScreen} component={Register} options={{headerShown: false}}/>
      <MainStack.Screen name={screenName.forgotPassScreen} component={ForgotPass} options={{headerShown: false}}/>
      <MainStack.Screen name={screenName.changePassScreen} component={ChangePass} options={{headerShown: false}}/>
    

     
      <MainStack.Screen name={"Payment"} component={Payment} options={{headerShown: false}}/>
    
      <MainStack.Screen name={screenName.channelScreen} component={ChannelScreen} options={options.channel} />
      <MainStack.Screen name={screenName.filterScreen} component={FilterScreen}  options={{headerShown: false}} />
      {/* <MainStack.Screen name={screenName.buyCoinScreen} component={BuyCoin}  options={options.buyCoin}/> */}
      <MainStack.Screen name={screenName.buyCoinScreen} component={BuycoinPaypal}  options={options.buyCoin}/>
      <MainStack.Screen name={screenName.commentScreen} component={CommentScreen}/>
      <MainStack.Screen name={screenName.detailChapter} component={DetailChapter}/>


      {/* <MainStack.Screen name={screenName.forumScreen} component={ForumScreen}/>
      <MainStack.Screen name={screenName.notifyScreen} component={NotifyScreen} />
      <MainStack.Screen name={screenName.profileScreen} component={ProfileScreen} options={{headerShown: false}}/>
      <MainStack.Screen name={screenName.comicScreen} component={ComicScreen} />
      <MainStack.Screen name={screenName.rankingScreen} component={RankingScreen} />
     
      <MainStack.Screen name={screenName.pointMeScreen} component={PointMeScreen} />
      <MainStack.Screen name={screenName.dailyScreen} component={DailyScreen} />
    
      <MainStack.Screen name={screenName.aboutScreen} component={AboutScreen} />
      <MainStack.Screen name={screenName.chapterScreen} component={ChapterScreen} />
      <MainStack.Screen name={screenName.commentScreen} component={CommentScreen} />
      <MainStack.Screen name={screenName.dailyAttendanceScreen} component={DailyAttendanceScreen} />
      <MainStack.Screen name={screenName.downloadScreen} component={DownloadScreen} />
      <MainStack.Screen name={screenName.followScreen} component={FollowScreen} />
      <MainStack.Screen name={screenName.forumTabScreen} component={ForumTabScreen} />
      <MainStack.Screen name={screenName.gameScreen} component={GameScreen} />
      <MainStack.Screen name={screenName.historyScreen} component={HistoryScreen} />
      <MainStack.Screen name={screenName.novelScreen} component={NovelScreen} />
      <MainStack.Screen name={screenName.shortStoryScreen} component={ShortStoryScreen} />
      <MainStack.Screen name={screenName.chatStoryScreen} component={StoryChatScreen} />
      <MainStack.Screen name={screenName.writeStoryScreen} component={WriteStoryScreen} /> */}
    </MainStack.Navigator>
  );
}

export default memo(MainStackNavigator)