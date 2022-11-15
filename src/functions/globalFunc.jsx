import axios from 'axios'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfigs from '../configs/app';
import { PixelRatio, Platform } from 'react-native';
import moment from "moment";




export const formatDate =(dateTime)=>{
  var d = new Date(dateTime);

var date = d.getDate();
var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
var year = d.getFullYear();
var newDate = date + "/" + month + "/" + year;
return newDate
}
export const getPlatform = () => {
  return Platform.OS;
};
export const isAndroid = () => {
  return Platform.OS === 'android';
};
export const scaleFont = size => size * PixelRatio.getFontScale();

export const scaleSizeWidth = size => {
  return (AppConfigs.FULL_WIDTH * size) / AppConfigs.DEFAULT_WIDTH;
};

export const scaleSizeHeight = size => {
  return (AppConfigs.FULL_HEIGHT * size) / AppConfigs.DEFAULT_HEIGHT;
};

export const getPersistAuth = async function () {
  try {
    const jsonValue = await AsyncStorage.getItem('@PERSIST_AUTH');
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
  } catch (error) {
    console.log('error', error); 
  }
};

export const setPersisAuth = async item => {
  try {
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem('@PERSIST_AUTH', jsonValue);
  } catch (error) {
    console.log('error', error);
  }
};

export const removePersistAuth = async () => {
  console.log("remove PERSIST_AUTH");
  try {
    await AsyncStorage.removeItem('@PERSIST_AUTH');
    return true;
  }
  catch (exception) {
    return false;
  }
}

export const handleToast = (string, type) => {
  Toast.show({
    type: type || 'info',
    text1: string || 'toast'
  });  
  setTimeout(() => {
    Toast.hide();
  }, 3000);
}

export const getGreeting = () => {
  const hours = (new Date()).getHours();
  if (hours < 12) {
    return 'Good Morning';
  }
  if (hours >= 12 && hours <= 17) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
};

export const requestAPI = async (request, header = {}) => {
  let method = request.method || 'GET';
  let baseURL = request.api;
  let headers = Object.assign(
    {Accept: 'application/json', 'Content-Type': 'application/json'},
    header,
  );
  if (request.token) {
    headers = Object.assign(headers, {
      Authorization: request.token,
    });
  }
  const configs = {
    method: method,
    url: baseURL,
    headers: headers,
    timeout: 60000,
    withCredentials: true,
    validateStatus: status => status >= 200 && status < 600,
  };
  if (
    (method == 'POST' || method == 'DELETE' || method == 'PUT') &&
    request.body
  ) {
    configs['data'] = request.body;
  }
  
  try {
    // console.log('config', configs);
    let response = await axios(configs);
    // console.log('response utils', response);
    const data = response.data;
    const message = response.data.message
    const codeNumber = response.status ? response.status : 0;
    if(request.type === 'LOGIN_APP' && response.status === 200){
      
    }
    if (codeNumber === 401) {
      throw 'UNAUTHORIZED_OR_TOKEN_EXPIRED';
    }
    if (Array.isArray(data)) {
      return { data, message, statusCode: codeNumber,};
    }
    return {
      ...data, 
      message,
      statusCode: codeNumber,
    };
  }catch (error){
    console.log(error)
  }
};

export function displayDate(value){
  let date = new Date(value);
  let today = new Date();
  
  if(date.getDate() === today.getDate()){
      if(moment(today).diff(moment(date), 'seconds') < 60){
          return moment(today).diff(moment(date), 'seconds').toString() + " giây trước";
      }
      else if(moment(today).diff(moment(date), 'minutes') < 60){
          return moment(today).diff(moment(date), 'minutes').toString() + " phút trước";
      } else{
          return moment(today).diff(moment(date), 'hours').toString() + " giờ trước";
      }
  }
   else {
       return moment(date).format("DD/MM/YYYY HH:mm:ss");
  }
}






