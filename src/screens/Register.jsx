import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView,SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
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

const Register = () => {
  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  const { title, viewInput, viewIcon, forgotpassword } = styles
  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const ref_register = useRef(true)
  const userRegister = useSelector(state => state.AuthReducer.register)
  // console.log("🚀 ~ file: Register.jsx ~ line 25 ~ Register ~ userRegister", userRegister)

  const onSubmit = (data) => {
    // console.log("data", data.email)
    dispatch(Action.auth.Register({email:data.email }))
  }

  useEffect(() => {
   
    return ()=>{
      ref_register.current = false
    }
  }, [])

 
  return (
    <SafeAreaView ref={ref_register} style={{flex:1}}>
      <TouchableOpacity testID='touch-goback-register' onPress={() => navigation.goBack()}>
        <AntDesign  style={{ paddingTop: 50, paddingLeft: 20 }} name='arrowleft' size={30} color='#000'  />
      </TouchableOpacity>
   
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.title1}>REGISTER</Text>
          <Text style={title}>YOUR ACCOUNT</Text>
          <View style={viewInput}>
            <TextField
              control={control}
              errorType={errors?.email?.type}
              rules={{ required: true, minLength: 5 ,pattern:regex}}
              leftIcon={{ size: 20, color: 'gray', name: 'shield-account' }}
              placeholder='Enter your email'
              field='email'
              label='Email'
            />
          </View>
          
          <View style={{padding:24}}>
            <Button testID='submit-register' textStyle={{color:'white'}} onPress={handleSubmit(onSubmit)}>Register</Button>
          </View>
          <View style={viewInput}>
            <Text>Go to sign in</Text>
            <Text testID='text-goto-login-register' style={forgotpassword} onPress={() => navigation.navigate(screenName.signupScreen)}>Sign in now</Text>
          </View>
          <IconShare style={viewIcon} />
          
        </KeyboardAvoidingView>
      </View>
    
    

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

export default Register
