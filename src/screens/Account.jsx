import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Image, } from 'react-native'
import { FontAwesome, Ionicons, MaterialCommunityIcons, EvilIcons } from 'react-native-vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AwesomeAlert from 'react-native-awesome-alerts';
import {getPersistAuth, handleToast} from '../functions/globalFunc'


import React, { useState, useRef,useEffect } from 'react'

import ImageVip from '../resources/Images/vipProfile.png'
import ActionButton from 'react-native-action-button';
// import BottomSheet from '../../Components/BottomSheet';
// import typography from '../../Constants/Typography';
import Text from '../components/Text'
import screenName from '../constants/screenName'
import { useSelector, useDispatch } from 'react-redux'
import Action from '../Store/Actions';
import { removePersistAuth } from '../functions/globalFunc';
import actionTypes from '../Store/Actions/constants';

const listItemBanThao = [
  { title: "Xin Việc", iconName: "md-reader-outline" }, 
  { title: "Ghi âm", iconName: "mic-outline" }, 
  { title: "Dịch truyện", iconName: "md-language-outline" }, 
  { title: "Lồng tiếng", iconName: "mic-circle-outline" }, 
]

const listItem1 = [
  { iconType: Ionicons, title: "Đăng kí hội viên", name: "ios-people-outline", },
  { iconType: MaterialCommunityIcons, title: "Nạp tiền", name: "star-circle-outline" },
  { iconType: MaterialCommunityIcons, title: "Phiếu đọc truyện của tôi", name: "newspaper" }
]

const listItem2 = [
  { iconType: MaterialCommunityIcons, title: "Giới thiệu bạn bè", name: "account-tie-voice-outline" },
  { iconType: MaterialCommunityIcons, title: "Phản hồi ý kiến", name: "application-edit-outline" },
  { iconType: MaterialCommunityIcons, title: "Giới thiệu chúng tôi", name: "script-text-outline" }
]
const listItem3 = [
  { iconType: MaterialCommunityIcons, title: "Đăng kí", name: "key-outline" },
  { iconType: MaterialCommunityIcons, title: "Đổi mật khẩu", name: "onepassword" },
  { iconType: MaterialCommunityIcons, title: "Quên mật khẩu", name: "information-outline" },
  { iconType: MaterialCommunityIcons, title: "Đăng xuất", name: "logout-variant" },

]
const Profile = () => {
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.AuthReducer.userIsLogin)
  const [showAlert,setShowAlert] = useState(false)

  const [token, setToken] = useState('')
  const accessToken = useSelector(state => state.AuthReducer.accessToken)
 
  useEffect(() => {
      if(accessToken.length > 0 ){
      console.log("🚀 ~ file: Account.jsx ~ line 57 ~ useEffect ~ accessToken", accessToken)
        
        setToken(accessToken)
      }
      else if(accessToken.length == 0){
      console.log("🚀 ~ file: Account.jsx ~ line 62 ~ useEffect ~ accessToken", accessToken)
        getPersistAuth().then((accessToken) => { 
        dispatch(Action.auth.FindOneUser(accessToken.toString()))
        setToken(accessToken)
        return
        }).catch()  
        setToken('')
      }

        console.log('token.length', token.length);
  }, [accessToken.length  ])

function logout(){
  console.log('Logout')
  removePersistAuth()
  dispatch({type:actionTypes.clearToken})
  dispatch({type:actionTypes.clearUserIsLogin})
  dispatch({type:actionTypes.clearBookReduder})
}
const showToast =()=>{
  handleToast('Chức năng đang phát triển')
}
  
  const navigation = useNavigation();
  const renderItem1 = (item) => {
    return (item.map((data, index) => {
      return (
        <TouchableOpacity testID='touch-render-1' key={index} delayPressIn={50} onPress={() => {
         switch (index) {
          case 0:
            showToast()
          break;
          case 1:
              userData?.data ? navigation.navigate(screenName.buyCoinScreen) : setShowAlert(true)
            break;
            case 2:
              showToast()
            break;
         
          default:
            break;
         }
        }} style={styles.listItem}>
          <data.iconType name={data.name} size={20} color={'gray'} />
          <Text size={14} bold style={{ marginLeft: "5%", width: "auto"}}>{data.title}</Text>
        </TouchableOpacity>
      )
    }))
  }

  const renderItem2 = (item) => {
    return (item.map((data, index) => {
      return (
        <TouchableOpacity testID='touch-render-2' key={index} delayPressIn={50} onPress={() => {
         switch (index) {
          case 0:
            showToast()
          break;
          case 1:
            showToast()
            break;
          case 2:
              showToast()
            break;
         
          default:
            break;
         }
        }} style={styles.listItem}>
          <data.iconType name={data.name} size={20} color={'gray'} />
          <Text size={14} bold style={{ marginLeft: "5%", width: "auto"}}>{data.title}</Text>
        </TouchableOpacity>
      )
    }))
  }

  const renderItem3 = (item) => {
    return (item.map((data, index) => {
      return (
          !userData?.data && index === 1   ? <></> : 
          !userData?.data && index === 3 ? <></> :
          (
            <TouchableOpacity testID='touch-render-3' key={index} delayPressIn={50} onPress={() => {
              switch (index) {
               case 0:
                 navigation.navigate(screenName.signupScreen)
                 break;
               case 1:
                    navigation.navigate(screenName.changePassScreen) 
                 break;
               case 2:
                 navigation.navigate(screenName.forgotPassScreen)
                  break;
               case 3:
                  logout()
                  break;
                 break;
               default:
                 break;
              }
             }} style={styles.listItem}>
               <data.iconType name={data.name} size={20} color={'gray'} />
               <Text size={14} bold style={{ marginLeft: "5%", width: "auto"}}>{data.title}</Text>
             </TouchableOpacity>
          ) 
        
      
      )
    }))
  }


  const handlePressAvatar = () => {
    if(!userData?.data){
      navigation.navigate(screenName.signinScreen, {screenNameBefore: screenName.profileScreen, isGoBack:false})
    } else {
      // console.log('vào đây');
      navigation.navigate(screenName.updateProfile,{userInfo:userData})
    }
  }

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff",marginTop:insets.top }}>

      <ScrollView style={{ flex: 1, }}>

        <View style={styles.containerhead} >


          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <TouchableOpacity onPress={handlePressAvatar}>

                <Image style={styles.image} source={{ uri: accessToken.length > 0  || accessToken.length == 0 && token.length > 0 ?  userData?.data?.images?.avatar?.url :  "https://res.cloudinary.com/dwnucvodc/image/upload/v1656738240/Flex-ticket/ImageUser/avatar-default_swe81x.png" }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressAvatar} style={styles.viewTextInfo}>
                {userData?.data ?
                  (<View style={{ flex: 1, justifyContent:"center" }}>
                    <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>{userData?.data?.displayName}</Text>
                    {/* <View style={styles.textVip}>
                      <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Vip</Text>
                    </View> */}
                  </View>) : (<Text size={17} bold>Bấm để đăng nhập</Text>)
                }
              </TouchableOpacity>
              <View style={styles.benifit}>
                {
                  userData?.data ? 
                  (<>
                     <Ionicons name="md-calendar-outline" size={15} color="white" />              
                   <Text style={{ fontSize: 10, color: "white" }}>Điểm danh</Text>
                   </>) : (
                     <Text onPress={()=>navigation.navigate(screenName.signupScreen)} style={{ fontSize: 10, color: "white" }}>Đăng kí</Text>
                   )
                }   
              </View>
            </View>

            <View style={styles.point}>
              <View style={styles.pontItem}>               
                  <Text>{userData?.data?.coin ? userData?.data?.coin : 0 }</Text>                
                <Text style={{ color: 'gray' }}>Coin của tôi</Text>
              </View>
              <View style={styles.pontItem}>                
                  <Text>0</Text>               
                <Text style={{ color: 'gray' }}>Điểm của tôi</Text>
              </View>
              <View style={styles.pontItem}>              
                  <Text>0</Text>
                <Text style={{ color: 'gray' }}>Phiếu</Text>
              </View>
            </View>
          </View>

          <View style={styles.topupVip} >
            <Image source={ImageVip} style={{ height: '100%', width: '100%' }} resizeMode='contain'/>
          </View>
          <Text size={16} bold>Gửi bản thảo</Text>
          <View style={styles.banthaoContainer}>
            {
              listItemBanThao.map((item, index) => {
                return <View key={index} style={styles.ItemBanThao} onPress={()=>showToast()}>
                  <Ionicons color="#673AB7" name={item.iconName} size={25} />
                  <Text size={12} bold style={{ marginTop: "10%" }}>{item.title}</Text>
                </View>
              })
            }
          </View>
        </View>
        <View style={{width:"100%", borderBottomWidth:2,borderBottomColor:"#e0e0e0"}}></View>
        <View style={styles.containerChucnang}>
          {renderItem1(listItem1)}
        </View>
        <View style={{width:"100%", borderBottomWidth:2,borderBottomColor:"#e0e0e0"}}></View>
        <View style={[styles.containerChucnang, { height: 200 }]}>
          {renderItem2(listItem2)}
        </View>
        <View style={{width:"100%", borderBottomWidth:2,borderBottomColor:"#e0e0e0"}}></View>
        <View style={[styles.containerChucnang, { height: 250 }]}>
          {renderItem3(listItem3)}
        </View>


      </ScrollView>
{
  token.length > 0 &&  <ActionButton       
  style={{ right: -5, bottom: -5 }}
  buttonColor="#673AB7"
  onPress={() => { navigation.navigate(screenName.updateProfile,{userInfo:userData}) }}
  renderIcon={() => <MaterialCommunityIcons name="feather" size={25} color="white" />
  }
/>
}
     

<AwesomeAlert
    // alertContainerStyle={{width:"80%", height:"20%"}}
    show={showAlert}
    // showProgress={false}
    title="Thông báo"
    message= {`Bạn cần đăng nhập để nạp tiền` }
    // closeOnTouchOutside={true}
    // closeOnHardwareBackPress={false}
    showCancelButton={true}
    // showConfirmButton={true}
    cancelText="Cancel"
    confirmButtonColor="#32a7f0" 
    onCancelPressed={() => setShowAlert(false)} 
  />
      {/* <BottomSheet ref={childRef} height={350}>
        <View style={styles.viewBottomSheet}>
          <View style={styles.closeBottomSheet}>
            <TouchableOpacity onPress={handleClose}>
              <EvilIcons name="close-o" size={40} color="#737375" />
            </TouchableOpacity>
          </View>


          <View style={{ width: "auto", height: 80, justifyContent: "center" }}>
            <Image style={styles.imageBottomSheet} source={{ uri: "https://i.pinimg.com/736x/e9/d6/aa/e9d6aad1ac43fdea81afe2f40caae49a.jpg" }} />
          </View>

          <TouchableOpacity style={styles.touchBottom}>
            <View style={styles.viewTouch}>
              <Image style={{ height: 30, width: 30, resizeMode: "contain" }} source={require('../Assets/Images/logoface.png')} />
              <Text> Đăng nhập bằng Facebook</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity style={styles.touchBottom}>
            <View style={styles.viewTouch}>
              <Image style={{ height: 30, width: 30, resizeMode: "contain" }} source={require('../Assets/Images/logoGoogle.png')} />
              <Text> Đăng nhập bằng Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchBottom}>
            <View style={styles.viewTouch}>
              <Image style={{ height: 30, width: 30, resizeMode: "contain" }} source={require('../Assets/Images/logoface.png')} />
              <Text> Đăng nhập bằng</Text>
            </View>
          </TouchableOpacity>

        </View>

      </BottomSheet> */}

    </SafeAreaView>
  )
}




const styles = StyleSheet.create({

  containerhead: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  head: {
    width: "100%",
    flexDirection: "row",
    height: 40,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  viewTouchTop: {
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "green",
    width: "20%",
    flexDirection: "row",
    height: 35,
    paddingHorizontal: 5,
  },
  infoContainer: {
    width: "100%",
    // backgroundColor: "green",
    height: 150,
  },
  info: {
    flexDirection: "row",
    flex: 2,
    width: "100%",
    // backgroundColor: "white",

    alignItems: "center"
  },
  point: {
    flex: 1,
    width: "100%",
    // backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pontItem: {
    // backgroundColor: "red",
    flex: 1,
    alignItems: "center"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
    resizeMode: "cover"
  },
  viewTextInfo: {
    flex: 2,
    width: "50%",
    // backgroundColor: "red",
    height: "50%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: "3%"
  },
  textVip: {
    backgroundColor: "#51a1ed",
    borderRadius: 50,
    alignItems: "center",
    width: 40,
  },

  benifit: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#673AB7",
    height: 35,
    borderRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  topupVip: {
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: "3%"
    // backgroundColor: "red"

  },
  topupLinearGradient: {
    width: "100%",
    margin: 0,
    height: 50,
    borderRadius: 5,
    // backgroundColor: "red"
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: "2%",
    paddingRight: "2%"
  },
  banthaoContainer: {
    width: "100%",
    // paddingHorizontal: "3%",
    paddingVertical: 15,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: 'space-between',

  },
  ItemBanThao: {
    width: "20%",
    height: 80,
    alignItems: "center",
    paddingHorizontal: "1%"
  },
  containerChucnang: {
    marginTop: 10,
    width: "100%",
    height: 200,
    backgroundColor: "white",
    paddingHorizontal: "5%"

  },
  listItem: {
    flexDirection: "row",
    width: "auto",

    alignItems: "center",
    paddingVertical: "5%",
    // backgroundColor: "green"
  },
  viewBottomSheet: {
    flex: 1,
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: "#f2f0f0"
  },
  imageBottomSheet: {
    width: 60,
    height: 60,
    borderRadius: 100,
    paddingVertical: 20,
    backgroundColor: "red"
  },
  touchBottom: {
    justifyContent: "center",
    height: 55,
    width: "65%",

    // backgroundColor: "green",
  },
  viewTouch: {
    height: "80%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    paddingLeft: "2%",
    borderRadius: 20
  },
  closeBottomSheet: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: "red",
    paddingTop: 10,
    paddingEnd: 5,
  }
})

export default Profile
