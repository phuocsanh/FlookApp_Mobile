import React, { useEffect, useState } from 'react';
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
import Loading from '../components/Loading';
import actionTypes from '../Store/Actions/constants';

import AwesomeAlert from 'react-native-awesome-alerts';
import {getPersistAuth} from '../functions/globalFunc'


const ChangePass = ({ previousScreen = screenName.homeScreen }) => {
  // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
 let regex= new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$')
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newpassword, setNewpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [messageAlert, setMessageAlert] = useState('')

  const { title, viewInput, viewIcon, forgotpassword, inputContainerStyle } = styles
  const { control,resetField, handleSubmit, formState: { errors } } = useForm();

  const [token, setToken] = useState('')
  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  let userChangepass = useSelector(state => state.AuthReducer.change)
  console.log("🚀 ~ file: ChangePass.jsx ~ line 31 ~ ChangePass ~ userChangepass", userChangepass)
  // console.log("🚀 ~ file: ChangePass.jsx ~ line 30 ~ ChangePass ~ userData", userData?.data?.accessToken)


  const navigation = useNavigation();

  const dispatch = useDispatch()

  const onSubmit = (data) => {
  console.log("🚀 ~ file: ChangePass.jsx ~ line 38 ~ onSubmit ~ data", data)
    
    if(data.password_New !== data.password_NewConfirm ){
      setMessageAlert("Mật khẩu xác nhận không khớp")
      setShowAlert(true)
      return
    }
    
    setLoading(true)
    const result = {
      data:data,
      token:token
    }
    dispatch(Action.auth.ChangePass(result))
    // setUserName(data.username)

  }

  
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

      // console.log('token.length', token.length);
}, [accessToken.length  ])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} testID='touch_goback_login'>
      <AntDesign style={{ paddingTop: 50, paddingLeft: 20 }} name='arrowleft' size={30} color='#000'  />
      </TouchableOpacity>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title1}>CHANGE</Text>
          <Text style={title}>PASSWORD</Text>
          <View style={viewInput}>
            <TextField
              control={control}
              rules={{ required: true, minLength: 8 }}
              errorType={errors?.password?.type}
              leftIcon={{ size: 20, color: 'gray', name: 'lock' }}
              secureTextEntry
              placeholder='Enter your new password'
              field='password'
              label='Old Password'
            />
          </View> 
          
          <View style={viewInput}>
            <TextField
              control={control}
              rules={{ required: true, minLength: 8 }}
              errorType={errors?.password_New?.type}
              leftIcon={{ size: 20, color: 'gray', name: 'lock' }}
              secureTextEntry
              placeholder='Enter your new password'
              field='password_New'
              label='New Password'
            />
          </View>
          <View style={viewInput}>
            <TextField
              control={control}
              rules={{ required: true, minLength: 8, }}
              errorType={errors?.password_NewConfirm?.type}
              leftIcon={{ size: 20, color: 'gray', name: 'lock' }}
              secureTextEntry
              placeholder='Confirm password'
              field='password_NewConfirm'
              label='Confirm Password'
            />
          </View>
         

          <View style={{ padding: 24 }}>
            <Button testID="submit-changepass" onPress={handleSubmit(onSubmit)} textStyle={{ color: 'white' }}>Change Pass</Button>
          </View>

          <IconShare style={viewIcon} />
        </KeyboardAvoidingView>
      </View>
      

      <AwesomeAlert
        // alertContainerStyle={{width:"80%", height:"20%"}}
        contentStyle={{ width: 250 }}
        show={showAlert}
        showProgress={false}
        // title="Thông báo"
        message={messageAlert}
        // closeOnTouchOutside={true}
        // closeOnHardwareBackPress={false}
        showCancelButton={true}
        // showConfirmButton={true}
        cancelText="Cancel"
        // confirmButtonColor="#32a7f0"
        onCancelPressed={() => closeAlert()}
      />
    </SafeAreaView>

  );
};

export default ChangePass

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
    paddingVertical: 5,
    paddingHorizontal:30,
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