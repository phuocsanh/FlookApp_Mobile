import React, { useEffect, useState ,useRef} from 'react';
import { Alert,Text, View, Dimensions, Image,Modal, TouchableOpacity ,SafeAreaView,ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { domain } from '../configs/api';
import { requestAPI } from '../functions/globalFunc'
import actionTypes from '../Store/Actions/constants';
import Action from '../Store/Actions';
import { getPersistAuth } from '../functions/globalFunc';

const {width,height} = Dimensions.get('screen');

export default function Payment({route}) {
  const { coinPrice,coin } = route.params;
const navigation = useNavigation()
const insets = useSafeAreaInsets()

  const [linkPay, setLinkPay] = useState(null)
  const [script, setScript] = useState()
  const [loadingPay, setLoadingPay] = useState(true)
  const [payCancel, setPayCancel] = useState(false)
  const [paySuccess, setPaySuccsess] =useState(false)
  const isMounted = useRef(true);
  // const [accessToken, setAccessToken] = useState('')
  const accessTokenNew = useSelector(state => state.AuthReducer.accessToken)

  // console.log("🚀 ~ file: Payment.jsx ~ line 27 ~ Payment ~ accessToken", accessToken)
  const link = useSelector(state => state.AuthReducer.linkPayment)
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   getLink()
   
    
  //   // return () => {
  //   //   isMounted.current = false;
  //   // };     
  // },[])

  useEffect(()=>{
    const data={
      coinPrice, 
      coin
    }
    dispatch(Action.auth.Payment(data))
  },[])

  const goBack =()=>{
    navigation.goBack()
  }


  // const getLink = async()=>{
  //   // const link = await axios.get(`${domain}/api/payment-management/payment?coinPrice=${coinPrice}&coin=${coin}`,{},
  //   // {headers:{
  //   //   Accept: 'application/json', 
  //   //   'Content-Type': 'application/json',
  //   //   Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTUzNzBmOGViNzFiMWU1NDQ2YzEzMCIsImlhdCI6MTY1OTE5MTEzMCwiZXhwIjoxNjU5MjM0MzMwfQ.t_BnCwbEZgKMLFhGZj98eqtJfpBXwhxplm2raY7pNM8"
  //   // }}
  //   // )

  //   const request = {
  //     method: 'GET',
  //     api:`${domain}/api/payment-management/payment?coinPrice=${coinPrice}&coin=${coin}`,
  //     token: accessToken
  //   }
  //   const link = await requestAPI(request)
  //   // console.log('link', link.data)
  //   // return response

  //   setLinkPay(link.data)
  // }
  // console.log('linkPay', linkPay);

  const stateChng = (navState) => {
  // console.log("🚀 ~ file: Payment.jsx ~ line 59 ~ stateChng ~ navState", navState)
  
   const { url, title} = navState ; 
   console.log("🚀 ~ file: Payment.jsx ~ line 69 ~ stateChng ~ navState", navState)
   
  
  //  console.log("title",title); 
    if (title =="Log in to your PayPal account" || title =="PayPal Checkout" ||title == "Đăng nhập vào tài khoản PayPal của bạn"){
      setLoadingPay(false)  
    }
   if(url.includes('pay-success') ){
    console.log("🚀 ~ file: Payment.jsx ~ line 89 ~ stateChng ~ pay-success")
    // dispatch(Action.auth.FindOneUser(accessTokenNew.toString()))
    // setPaySuccsess(true)
   }
   if (url.includes('pay-cancel') ) {
    console.log("🚀 ~ file: Payment.jsx ~ line 94 ~ stateChng ~ pay-cancel")
    setPaySuccsess(false)
  }
  }

  const createAlertSuccsess = () =>
    Alert.alert('Thông báo', 'Thanh toán thành công!', [
     
      { text: 'OK', onPress: () => goBack() },
    ]);

  const createAlertCancel = () =>
    Alert.alert('Thông báo', 'Thanh toán thất bại!', [
     
      { text: 'OK', onPress: () => goBack() },
    ]);

  return (
    <SafeAreaView

    ref={isMounted }
     style={{flex:1, position:'relative', marginTop:insets.top }}> 
     {loadingPay && <ActivityIndicator style={{width:"100%", height:"100%", position:'absolute', zIndex:1, top:0, left:0, right:0,bottom:0, justifyContent:'center', alignItems:'center'}} color={"#ebebeb"} size={'large'} />} 
    
    <WebView 
    style={{flex:1}}
     startInLoadingState={true}
     onNavigationStateChange={stateChng}
     javaScriptEnabled = {true}
     renderLoading={() => <Loading />}
     source={{uri: link}} />
    {/* {
      paySuccess ? createAlertSuccsess() : payCancel && createAlertCancel()
    }   */}
    {
          <AwesomeAlert
          
          show={paySuccess}
          showProgress={false}
          title="Thông báo"
          contentStyle={{width:"70%"}}
          message= {paySuccess ? "Thanh toán thành công" : "Thanh toán chưa thành công" }
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}      
          confirmText="Yes"
          confirmButtonColor="#32a7f0"       
          onConfirmPressed={() => {
            setPaySuccsess(false)
            goBack()
          }}
        />
    }
     </SafeAreaView>
    
  );
}

const Loading = () => {
  return(
    <View style={{height:height,width:width,justifyContent:'center',alignItems:'center'}}>
        <Image 
        source={require('../../assets/paypal.png')}
        style={{width:250,height:100,resizeMode:'contain'}}
        />
    </View>
  )
}
