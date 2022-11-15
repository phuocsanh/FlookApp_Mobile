import { Text, View, Image, Input, KeyboardAvoidingView } from 'native-base'
import React, { useRef, useState,useEffect } from 'react'
import { ImageBackground, TouchableOpacity, StyleSheet, Platform, Pressable, TextInput } from 'react-native';
import { Avatar } from "react-native-elements";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome, Feather, MaterialIcons, Ionicons,AntDesign } from '@expo/vector-icons';
import { formatDate } from '../functions/globalFunc';
import { Camera } from 'expo-camera';
import BottomSheet from '../components/BottomSheet';
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { RadioButton } from 'react-native-paper';
import appConfigs from '../configs/app';
import TextField from '../components/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../Store/Actions';
import { getPersistAuth } from '../functions/globalFunc';
import FormData from 'form-data';
// import RNFS from 'react-native-fs';

// import cloudinary from '../configs/cloudnary';


const UpdateProfile = ({ route }) => {
  // console.log('cloudinary', cloudinary)
  const { userInfo } = route?.params
  const insets = useSafeAreaInsets()
  const [startCamera, setStartCamera] = useState(false);
  const [token, setToken] = useState('');
  const [checked, setChecked] = React.useState(userInfo?.data?.gender);
  const [deviceImage, setDeviceImage] = useState('')
  const [imageFile, setImageFile] = useState()
  const [textName, setTextName] = useState(userInfo?.data?.displayName)
  const [textPhone, setTextPhone] = useState(userInfo?.data?.phoneNumber)
  const { control, resetField, handleSubmit, formState: { errors } } = useForm();
  const refBtSheet = useRef()
  const dispatch = useDispatch()


  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)
  const isUpdateUser = useSelector(state => state.AuthReducer.isUpdateUser)
  useEffect(() => {
    getPersistAuth().then((accessToken) => { 
      dispatch(Action.auth.FindOneUser(accessToken))
      }).catch()   
}, [ ])
  useEffect(() => {
    if (accessToken.length > 0) {
      // console.log("🚀 ~ file: BuycoinPaypal.jsx ~ line 52 ~ useEffect ~ accessToken > 0", accessToken)
  
      setToken(accessToken)
    }
    if (accessToken.length === 0) {
      // console.log("🚀 ~ file: BuycoinPaypal.jsx ~ line 57 ~ useEffect ~ accessToken == 0", accessToken)
      getPersistAuth().then(token => { setToken(token) }).catch()
    }
    // console.log("token", token)
  
   
  }, [accessToken])

  // console.log("🚀 ~ file: UpdateProfile.jsx ~ line 8 ~ UpdateProfile ~ userInfo", userInfo)

  let camera = null;
  const onStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
      refBtSheet.current.handleCloseBottomSheet()
    } else {
      // console.log("Camera not allow");
    }
  };
  const onTakePhoto = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ quanlity: 0.2 });
    console.log("🚀 ~ file: UpdateProfile.jsx ~ line 38 ~ onTakePhoto ~ photo", photo)
    setDeviceImage(photo.uri)
    setImageFile(photo)
 

    setStartCamera(false);
    refBtSheet.current.handleOpenBottomSheet()
    // const url = await onUploadImg(photo);
    // setImages([...images, url]);
  };
  const onOpenImagePicker = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted == false) {
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      quanlity: 0.2,
    });
    console.log("🚀 ~ file: UpdateProfile.jsx ~ line 86 ~ onOpenImagePicker ~ pickerResult", pickerResult)
    setImageFile(pickerResult)
  

    // console.log("🚀 ~ file: UpdateProfile.jsx ~ line 52 ~ onOpenImagePicker ~ pickerResult", pickerResult)
    setDeviceImage(pickerResult.uri)
    if (pickerResult.cancelled === true) {
      return;
    }
    // const url = await onUploadImg(pickerResult);
    // setImages([...images, url]);
    refBtSheet.current.handleOpenBottomSheet()
    setStartCamera(false);
  };

  const closeCamera = () => {
    setStartCamera(false)
    refBtSheet.current.handleOpenBottomSheet()
  }

  const onSubmit = (data) => {
  console.log("🚀 ~ file: UpdateProfile.jsx ~ line 133 ~ onSubmit ~ onSubmit", data)

    const formData = new FormData();

    let file = {
      uri: deviceImage, 
      type: 'multipart/form-data', 
      name: 'image.png'
    };
    deviceImage.length > 0 && formData.append('images',file );
      formData.append('displayName', data.displayName)
      formData.append('gender', checked)
      formData.append('phoneNumber', data.phoneNumber)
    dispatch(Action.auth.UpdateOneUser( token,formData))  
   
      refBtSheet.current.handleCloseBottomSheet()
    
    // setFocus('displayName')
   
  }

  const handleUpdateUser =()=>{
    console.log('data', textName, textPhone);
    const formData = new FormData();

    let file = {
      uri: deviceImage, 
      type: 'multipart/form-data', 
      name: 'image.png'
    };
    deviceImage.length > 0 && formData.append('images',file );
      formData.append('displayName', textName)
      formData.append('gender', checked)
      formData.append('phoneNumber', textPhone)
    dispatch(Action.auth.UpdateOneUser( token,formData))  
   
      refBtSheet.current.handleCloseBottomSheet()
  }
  
 
  return (
    <View flex={1} marginTop={insets.top}  >
      <>
        <View borderBottomRightRadius={30} borderBottomLeftRadius={30}>
          <View flexDirection={'column'} alignItems='center' paddingY={3}  marginTop={10}>
            <Pressable testID='press-avatar'  onPress={()=>refBtSheet.current.handleOpenBottomSheet()}>
            <Avatar  rounded size={120} source={{ uri: userIsLogin?.data?.images?.avatar?.url }} />
            </Pressable>
            <View  >
              <Text color={'#64018f'} fontWeight={'bold'} fontSize={30}> {userIsLogin?.data?.displayName}</Text>
              <View flexDirection={'row'} marginLeft={2} >
                <Image source={require('../images/gender.png')} />
                <Text color={'#64018f'} > {userIsLogin?.data?.gender ? 'Nam' : 'Nữ'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View borderBottomWidth={1} borderBottomColor='#cfcccc' width={'100%'} height={1}></View>

        <View marginTop={5} paddingLeft={5} paddingRight={5}>

          <View flexDirection={'row'} alignItems='center' paddingY={2}>
            <MaterialCommunityIcons name='email-multiple-outline' size={25} color={"#64018f"} />
            <Text marginLeft={3} fontWeight={'light'} fontSize={20} >{`${userInfo?.data?.email}`}</Text>
          </View>
          <View flexDirection={'row'} alignItems='center' paddingY={2}>
            <FontAwesome color={'#64018f'} name='user-o' size={25} />
            <Text  marginLeft={3} fontWeight={'light'} fontSize={20} >{`${userInfo?.data?.username}`}</Text>
          </View>
          <TouchableOpacity testID='touch-phoneNumber' style={{flexDirection:'row', paddingVertical:4}} onPress={()=>refBtSheet.current.handleOpenBottomSheet()}>
            <Feather color={'#64018f'} name='phone' size={25} />
            <Text marginLeft={3} fontWeight={'light'} fontSize={20} >{`${userIsLogin?.data?.phoneNumber}`}</Text>
            <AntDesign  name ='right' size={30} style={{marginLeft:10}}/>
          </TouchableOpacity>

          <TouchableOpacity testID='touch-displayName' style={{flexDirection:'row' , alignItems:'center'}} onPress={()=>refBtSheet.current.handleOpenBottomSheet()}>
            <Text  fontWeight={'light'} fontSize={20} paddingY={2}>{`Tên hiển thị: ${userIsLogin?.data?.displayName}`}</Text>
            <AntDesign  name ='right' size={30}  style={{marginLeft:10}}/>
          </TouchableOpacity>
         
          <Text  fontWeight={'light'} fontSize={20} paddingY={2}>{`Ngày đăng ký: ${formatDate(userIsLogin?.data?.createAt)}`}</Text>

        </View>
        <View marginTop={10} flex={1} flexDirection={'row'} justifyContent='center'>
          {/* <TouchableOpacity testID='touch-open-modal' style={{ width: appConfigs.FULL_WIDTH * 0.7, backgroundColor: '#64018f', height: 40, justifyContent: 'center', borderRadius: 20 }}
            onPress={() => refBtSheet.current.handleOpenBottomSheet()}>
            <Text textAlign={'center'} fontSize={20} color='white'>Change Info</Text>
          </TouchableOpacity> */}
        </View>

        <BottomSheet height={appConfigs.FULL_HEIGHT * 0.7} ref={refBtSheet}>
          <View style={styles.topViewBtSheeet}>
            <MaterialIcons testID='close-bottom-sheet' name='close' size={25} onPress={() => { refBtSheet.current.handleCloseBottomSheet() }} />
          </View>
          <View alignItems='center' paddingX={30} height={'100%'} flexDirection='column'>
            <Avatar rounded={true} onPress={onStartCamera} size={100} source={{ uri: deviceImage ? deviceImage : userIsLogin?.data?.images?.avatar?.url }} />


            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} marginTop={10}  style={{marginBottom:40}}>
              <View style={styles.viewInput}>
                <View style={{ padding:5, width:'100%', borderBottomWidth:1}}>
                <TextInput  style={{fontSize:20}} onChangeText={(t)=>{setTextName(t)}} value={textName}/>

                </View>
              </View>
              <View style={styles.viewInput}>
              
                <View  style={{ padding:5, width:'100%', borderBottomWidth:1}}>
                  <TextInput style={{fontSize:20}}  keyboardType='numeric' onChangeText={(t)=>{setTextPhone(t)}} value={textPhone}/>
                </View>

              </View>
              <View paddingX={20} flexDirection={'row'}>
                <View flexDirection={'row'} alignItems="center">
                <RadioButton testID='radio-gender-male'
                  status={ checked ? 'checked' : 'unchecked' }
                  onPress={() => setChecked(true)}
                />
                <Text>Nam</Text>
                </View>
                <View flexDirection={'row'} alignItems="center" marginLeft={5} >
                <RadioButton testID='radio-gender-female'
                    status={ !checked  ? 'checked' : 'unchecked' }
                    onPress={() => setChecked(false)}
                  />
                <Text>Nữ</Text>
                </View>
               
              </View>
              

            </KeyboardAvoidingView>
              <TouchableOpacity testID='sunmit-change-user-info' onPress={()=>{handleUpdateUser()}} style={{width:appConfigs.FULL_WIDTH*0.5 , height:40, backgroundColor:"#6d03a6", justifyContent:'center', borderRadius:30}} >
                  <Text textAlign={'center'} color='white' fontSize={20}>Change</Text>
                </TouchableOpacity>
          </View>


        </BottomSheet>
      </>

      {
        startCamera &&
        <Camera
          ref={(r) => {
            camera = r;
          }}
          style={[styles.cameraStyle]}
        >
          <View style={styles.containerViewCamera}>
            <TouchableOpacity onPress={() => closeCamera()}>
              <Ionicons name='close-circle-outline' size={35} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.containerViewCamera}>
            <TouchableOpacity onPress={onTakePhoto}>
              <Ionicons name='ios-camera-outline' size={35} color='white' />
            </TouchableOpacity>
          </View>
          <View style={styles.containerViewCamera}>
            <TouchableOpacity onPress={onOpenImagePicker}>
              <MaterialIcons name='photo-library' size={35} color='white' />
            </TouchableOpacity>
          </View>
        </Camera>
      }


    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  cameraStyle: {
    flex: 1,
    width: appConfigs.FULL_WIDTH,
    height: '100%',
    flexDirection: "row",
    alignItems: "flex-end",
    position: 'absolute',
    zIndex: 10,

  },
  viewInput: {
    // backgroundColor:'red',
    width:appConfigs.FULL_WIDTH * 0.7,
    paddingTop:20,
    paddingBottom:20,
    alignSelf: 'center',
    flexDirection: 'row',

  },
  containerViewCamera: {
    flex: 1,
    paddingTop: "3%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 60,
    backgroundColor: "black",
  },
  containerPressCamera: {
    backgroundColor: "#f7b125",
    width: "25%",
    height: "70%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPressCameraTake: {
    width: "40%",
    height: "70%",
    borderRadius: 90,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPressTakePhoto: {
    width: "40%",
    height: "70%",
    borderRadius: 90,
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewBottom: {
    // zIndex:100,
    backgroundColor: "#d1d1d1",
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    height: 60,
    // right: margin,
    bottom: 0,

    position: 'relative',
    // backgroundColor: colors.button,
  },
  addIcon: {
    top: 3,
  },
  topViewBtSheeet: {
    flexDirection: "row",
    paddingHorizontal: 15,
    width: '100%',
    justifyContent: 'flex-end'
  },
})