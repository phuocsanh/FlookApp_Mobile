import React,{useEffect,useState, useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight, 
  Image,
  FlatList
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getPersistAuth } from '../functions/globalFunc';
import { useDispatch, useSelector } from 'react-redux';
import { displayDate } from '../functions/globalFunc';
import { SwipeListView } from 'react-native-swipe-list-view';
import Action from '../Store/Actions';
import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';
const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);
const notification = require('../anims/no-notification.json');
import LottieView from 'lottie-react-native';

const Notify = () => {

  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
};
const notifiRef = useRef(true)

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
      height:'70%',
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
  root: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal:20,
    marginTop:20
  },
  containerRenderItem: {
    flexDirection: 'row',
    paddingLeft:20,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems: 'flex-start',
    paddingVertical:5,
    borderBottomWidth:1,
    borderBottomColor:'#c2c2c2'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 1,
    flexDirection: 'column',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 0.3,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1E90FF"
  },

  //---------------\
    list: {
      color: '#FFF',
    },
    btnText: {
      color: '#FFF',
      height:'100%',
     marginTop:'70%'
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: 'lightcoral',
    
      justifyContent: 'center',
      
    },
    rowBack: {
      alignItems: 'center',
      minHeight:100,
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 5,
     
    },
    actionButton: {
      alignItems: 'center',
      bottom: 0,
      height:120,
      position: 'absolute',
      top: 0,
      width: 75,
    
    },
   
    deleteBtn: {
      backgroundColor: '#ff5757',
      right: 0,
     justifyContent:'center',
     alignItems:'center'
    },
 

};


  const dispatch = useDispatch()
  

  const [token, setToken] = useState('')
  const [listNotifySort, setListNotifySort] = useState([])
  
  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  // console.log("🚀 ~ file: Details.jsx ~ line 142 ~ Details ~ accessToken", accessToken)
let listNotify = []
  listNotify = useSelector(state => state.AuthReducer.listNotify)
  // console.log("🚀 ~ file: Notify.jsx ~ line 39 ~ Notify ~ listNotify", listNotify)

  useEffect(()=>{
    const listSort = listNotify?.data?.notify?.sort(function(a, b) {
      return b.createAt - a.createAt;
      
  });
  // console.log(' listNotify?.data?.notify.length',  listNotify?.data?.notify.length)
  setListNotifySort(listSort)
  },[listNotify])
  // console.log("🚀 ~ file: Notify.jsx ~ line 38 ~ Notify ~ listNotify", listNotify)
  // console.log("🚀 ~ file: DetailChapter.jsx ~ line 47 ~ DetailChapter ~ userIsLogin", userIsLogin?.data)
// const [listSeenNotify, setListSeenNotify] = useState([])

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


  const tabBarOptions = {
    activeTintColor: '#673AB7',
    inactiveTintColor: 'gray'
  }
  

const setDate =(date)=>{
  let newDate = new Date(Number(date)) 
  return displayDate(newDate)
}

const deleteItem = ( data) => {
 
dispatch(Action.auth.UpdateNotify({type:'pull', id:data.item._id, token:token}))
 
};
const onItemOpen = rowKey => {
  console.log('This row opened', rowKey);
};

const renderHiddenItem = (data, rowMap) => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={[styles.actionButton, styles.deleteBtn]}
      onPress={() => deleteItem(data)}
    >
      <Text style={styles.btnText}>Delete</Text>
    </TouchableOpacity>
  </View>
);


const renderItem = (item, index) => {
   
    return(
 
  <TouchableOpacity onPress={()=>{dispatch(Action.auth.UpdateNotify({type:'seen', id:item.item._id, token:token}))}} style={[styles.containerRenderItem, !item.item.seen  ? {backgroundColor:'#e0e0e0'}  : {backgroundColor:'white'} ]}>
           <Image source={{uri:'https://res.cloudinary.com/dwnucvodc/image/upload/v1661616271/Flex-ticket/ImageUser/j1b2ruja7hmy496ih5nt.jpg'}} style={styles.avatar}/>
           <View style={styles.content}>
             <View>
               <View style={styles.text}>
                 <Text style={styles.name}>{item.item.idUser.displayName}</Text>
                 <Text>{item.item.content}</Text>
               </View>
               <Text style={styles.timeAgo}>
                {setDate(item.item.createAt)}
               </Text>
             </View>
            
           </View>
      </TouchableOpacity>
      
);}
const [listData, setListData] = useState(
  Array(25).fill('').map((_, i) => ({ key: `${i}`, text: `Item ${++i}` }))
);

  return (


    <View style={{flex:1,marginTop:10,backgroundColor:'white'}}>
      { 
      
      listNotifySort?.length == 0   || !listNotifySort ? 
        (
       
          <Animated.View ref={notifiRef} onLayout={onLayout} style={styles.screen}>
          <Animated.View style={styles.header}>
              <Animated.View style={styles.logo}>
                  <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={notification} />
              </Animated.View>  
              <Text style={{fontSize:20}}>Chưa có thông báo</Text>
          </Animated.View>  
        </Animated.View>
          
        
         ) : (

        <SwipeListView
        data={listNotifySort}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onItemOpen}
      /> )
      } 
       
    </View>
  );
}

export default Notify

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal:20,
    marginTop:20
  },
  containerRenderItem: {
    flexDirection: 'row',
    paddingLeft:20,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems: 'flex-start',
    paddingVertical:5,
    borderBottomWidth:1,
    borderBottomColor:'#c2c2c2'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 1,
    flexDirection: 'column',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 0.3,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1E90FF"
  },

  //---------------\
    list: {
      color: '#FFF',
    },
    btnText: {
      color: '#FFF',
      height:'100%',
     marginTop:'70%'
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: 'lightcoral',
    
      justifyContent: 'center',
      
    },
    rowBack: {
      alignItems: 'center',
     
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 5,
     
    },
    actionButton: {
      alignItems: 'center',
      bottom: 0,

      position: 'absolute',
      top: 0,
      width: 75,
    
    },
   
    deleteBtn: {
      backgroundColor: '#ff5757',
      right: 0,
     justifyContent:'center',
     alignItems:'center'
    },
 
}); 