import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView,SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { set, useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import appConfigs from '../configs/app';
import screenName from '../constants/screenName';
import Button from '../components/Button';
import IconShare from '../components/IconShare';
import TextField from '../components/TextField';
import Action from '../Store/Actions';
import AwesomeAlert from 'react-native-awesome-alerts';

import Loading from '../components/Loading';
import actionTypes from '../Store/Actions/constants'

const ForgotPass = () => {
  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  const { title, viewInput, viewIcon, forgotpassword } = styles
  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
  const [showAlert,setShowAlert] = useState(false)
  const [messageAlert,setMessageAlert] = useState(false)
  const dispatch = useDispatch()
  const ref_forgotpass = useRef(true)
  const userForgotPass = useSelector(state => state.AuthReducer.forgot)
  console.log("🚀 ~ file: ForgotPass.jsx ~ line 30 ~ ForgotPass ~ userForgotPass", userForgotPass)

  const onSubmit = (data) => {
    console.log("data", data.email)
    setLoading(true)
    dispatch(Action.auth.ForgotPass({email:data.email }))
  }

  useEffect(() => {
    if(userForgotPass?.statusCode ===200 && userForgotPass?.success){
      setLoading(false)
      setMessageAlert('Vui lòng kiểm tra email của bạn để lấy mật khẩu mới.')
      setShowAlert(true)
    }else if(userForgotPass?.statusCode === 400 ){
      setLoading(false)
      setMessageAlert('Email này không tồn tại trong hệ thống.')
      setShowAlert(true)
    }    

    setTimeout(()=>{
      setLoading(false)
    }, 6000)
    return ()=>{
      ref_forgotpass.current = false
    }
  }, [userForgotPass?.statusCode])

  const closeAlert = ()=>{
    dispatch({type:actionTypes.setForgotNull})
    setShowAlert(false)
  }
  return (
    <SafeAreaView ref={ref_forgotpass} style={{flex:1}}>
      <TouchableOpacity testID='touch-goback-forgotpass' onPress={() => navigation.goBack()}>
        <AntDesign  style={{ paddingTop: 50, paddingLeft: 20 }} name='arrowleft' size={30} color='#000'  />
      </TouchableOpacity>
   
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title1}>PLEASE ENTER EMAIL</Text>
          <Text style={title}>TO GET PASSWORD</Text>
          <View style={viewInput}>
            <TextField
              control={control}
              errorType={errors?.email?.type}
              rules={{ required: true, minLength: 5 , pattern:regex}}
              leftIcon={{ size: 20, color: 'gray', name: 'shield-account' }}
              placeholder='Enter your email'
              field='email'
              label='Email'
            />
          </View>
          
          <View style={{padding:24}}>
            <Button testID='submit-forgotpass' textStyle={{color:'white'}} onPress={handleSubmit(onSubmit)}>Get New Password</Button>
          </View>
          <View style={viewInput}>
            <Text>Go to sign in</Text>
            <Text testID='text-goto-login-forgotpass' style={forgotpassword} onPress={() => navigation.navigate(screenName.signinScreen)}>Sign in now</Text>
          </View>
          <IconShare style={viewIcon} />
          
        </KeyboardAvoidingView>
      </View>
      <AwesomeAlert
            // alertContainerStyle={{width:"100%", height:"100%"}}
            contentStyle={{ width: 250 }}
            show={showAlert}
            showProgress={false}
            title="Thông báo"
            message={messageAlert}
            // closeOnTouchOutside={true}
            // closeOnHardwareBackPress={false}
            // showCancelButton={true}
            showConfirmButton={true}
            // cancelText="Cancel"
            confirmButtonColor="#32a7f0"
            onConfirmPressed={() => closeAlert()}
            // onCancelPressed={() => closeAlert()}
          />
      {loading && <Loading/>}

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingHorizontal:20,
    paddingVertical:2,
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
  }
});

export default ForgotPass
