import React, { useEffect, useState ,useRef} from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import appConfigs from '../configs/app';
import screenName from '../constants/screenName';
import IconShare from '../components/IconShare';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Action from '../Store/Actions';
import Spinner from "react-native-loading-spinner-overlay/lib";

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

const Login = ({ route }) => {
  const {screenNameBefore , isGoBack =false} = route?.params
  const isLoading = useSelector(state => state.AppReducer.isLoading)

  const { title, viewInput, viewIcon, forgotpassword, inputContainerStyle } = styles
  const { control,resetField, handleSubmit, formState: { errors } } = useForm();
  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState();
  
  const notificationListener = useRef();
  const responseListener = useRef();
  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)
  // console.log("🚀 ~ file: Login.jsx ~ line 38 ~ Login ~ userIsLogin", userIsLogin)


  const navigation = useNavigation();

  const dispatch = useDispatch()
  useEffect(()=>{
    if(userIsLogin?.message === "Get Data Successfully" ){
      isGoBack  && navigation.navigate(screenNameBefore)
    }
    if(userIsLogin?.message === "Get Data Successfully" && !isGoBack ){
      navigation.navigate(screenName.profileScreen)
    }
  }, [userIsLogin?.message])

  const onSubmit = (data) => {
    resetField("username")
    resetField("password")
    dispatch(Action.auth.Login(data,expoPushToken))
    setFocus('username')
  }

  // NOTIFY
  useEffect(() => {
    (() => registerForPushNotificationsAsync())()
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    // console.log('expoPushToken',expoPushToken);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const registerForPushNotificationsAsync = async () => {

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      setExpoPushToken(token)

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
    // let token = (await Notifications.getExpoPushTokenAsync()).data;
    // if (token) { setExpoPushToken(token) }


  }


  console.log("expoPushToken Login", expoPushToken);

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
    console.log('result', result.data.data.deviceToken);
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

  
//END NOTIFI


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} testID='touch-goback-login'>
      <AntDesign style={{ paddingTop: 50, paddingLeft: 20 }} name='arrowleft' size={30} color='#000'  />
      </TouchableOpacity>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title1}>PLEASE LOGIN</Text>
          <Text style={title}>TO USE THE SERVICE</Text>
          <View style={viewInput}>
            <TextField
              control={control}
              errorType={errors?.username?.type}
              rules={{ required: true, minLength: 4 }}
              leftIcon={{ size: 20, color: 'gray', name: 'shield-account' }}
              placeholder='Enter your username'
              field='username'
              label='UserName'
            />
          </View>
          <View style={viewInput}>
            <TextField
              control={control}
              rules={{ required: true, minLength: 8 }}
              errorType={errors?.password?.type}
              leftIcon={{ size: 20, color: 'gray', name: 'lock' }}
              secureTextEntry
              placeholder='Enter your password'
              field='password'
              label='Password'
            />
          </View>
          <View style={viewInput}>
            <Text>Forgot password ?</Text>
            <Text testID='text-goto-fogotpass' style={forgotpassword} onPress={()=>navigation.navigate(screenName.forgotPassScreen)}>Click here to get password</Text>
          </View>

          <View style={{ padding: 24 }}>
            <Button testID="submit-login" onPress={handleSubmit(onSubmit)} textStyle={{ color: 'white' }}>Login</Button>
          </View>

          <View style={viewInput}>
            <Text>Don't have an account ?</Text>
            <Text testID='text-goto-register' style={forgotpassword} onPress={() => navigation.navigate(screenName.signupScreen)}>Sign up now</Text>
          </View>
          <IconShare style={viewIcon} />
        </KeyboardAvoidingView>
      </View>
          <Spinner visible={isLoading} color="#ebebeb"/>
     
      
    </SafeAreaView>

  );
};

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title1: {
    fontSize: 20,
    marginBottom: appConfigs.DEFAULT_HEIGHT / 100,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'purple'
  },
  title: {
    fontSize: 30,
    lineHeight: 35,
    marginBottom: appConfigs.DEFAULT_HEIGHT / 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  viewInput: {
    padding: 12,
    alignSelf: 'center',
    flexDirection: 'row',

  },
  viewIcon: {
    paddingTop: 5, paddingBottom: 5,
    paddingLeft: 70, paddingRight: 70,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  forgotpassword: {
    color: 'purple',
    paddingLeft: 5,
    textDecorationLine: 'underline',
  },
  inputContainerStyle: {
    width: "100%",
    height: '100%'
  },
  loading: {
    flex: 1,
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
});