import React, { Fragment, useEffect, useState,useRef, useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { List, Appbar } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { AntDesign  } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch, useSelector } from 'react-redux';
import { Button, HStack, Text, Modal, VStack, FlatList, NativeBaseProvider  } from 'native-base';
import Action from '../Store/Actions';
import { formatDate } from '../functions/globalFunc';
import appConfigs from '../configs/app';
import screenName from '../constants/screenName';
import {getPersistAuth} from '../functions/globalFunc'


import { set } from 'react-native-reanimated';


function OpenChap({modalVisible, setModalVisible, item, user,accessToken,dispatch, refBtSheet}) {
  // console.log("user one chapter", user)
  // console.log("user one accessToken", accessToken)
  
  const navigation = useNavigation()
  const openChapOrBuyCoin =()=> {

    if(user?.data?.coin - 10 < 0){
      navigation.push(screenName.buyCoinScreen)
      refBtSheet.current.handleCloseBottomSheet()
      return
    }
    const data={
      coin:user?.data?.coin - 10,
      chapterId:item?._id
    }

    // console.log("🚀 ~ file: ListChapter.jsx ~ line 36 ~ openChapOrBuyCoin ~ data", data)
   
    dispatch(Action.auth.UpdateOneUserMoblie(data, accessToken,'history-bought'))
    navigation.navigate(screenName.detailChapter,{chapId:item._id})
    refBtSheet.current.handleCloseBottomSheet()
    

  }
  return (
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Mở chương</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Hiện đang có</Text>
              <Text color="blueGray.400">{user?.data?.coin}</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">{`Mở chương ${item?.name}`}</Text>
              <Text color="red.500">$10</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Coin còn lại</Text>
              <Text color="green.500">{user?.data?.coin - 10 }</Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={openChapOrBuyCoin}>Mở</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}





const ListChapter = ({ebookId, refBtSheet}) => {
    // const margin =20;
  const dispatch = useDispatch() 
  const navigation = useNavigation()
  const listChapter_ref = useRef(true)
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [chapter, setChapter] = useState()
  const [accessTokenUser, setAccessTokenUser] = useState('')
  const [sortByASC, setSortByASC] = useState(true)
  const [listSort, setListSort] = useState([])
  const styles = StyleSheet.create({
    lottie: {
      alignSelf: 'center',
      marginRight: margin / 2,
      width: 15,
      height: 15,
    },
  })
  // console.log("🚀 ~ file: ListChapter.jsx ~ line 56 ~ ListChapter ~ listChapter", listChapter)
  const countChapter = useSelector(state => state.BookReducer.countChapter)
  
  // console.log("accessTokenListChapter", accessTokenUser);
  
  const userIsLogin = useSelector(state=> state.AuthReducer.userIsLogin)
  let listChapter  = useSelector(state => state.BookReducer.listChapter)
  // console.log("🚀 ~ file: ListChapter.jsx ~ line 105 ~ ListChapter ~ listChapter", listChapter)
  // console.log("🚀 ~ file: ListChapter.jsx ~ line 75 ~ ListChapter ~ listChapter", listChapter)
 
  
  // let  newListChapter =listChapter.map((item, index)=>{return {...item,name: parseInt(item.name.slice(7))}})
  // let include = userIsLogin
  // console.log("🚀 ~ file: ListChapter.jsx ~ line 99 ~ ListChapter ~ include", include)

  // console.log("🚀 ~ file: ListChapter.jsx ~ line 80 ~ newListChapter ~ newListChapter", newListChapter)


  
  useEffect(() => { 
      dispatch(Action.book.searchChapter({ebookId:ebookId, orderby:"1"}))
      getPersistAuth().then((accessToken) => { 
        setAccessTokenUser(accessToken ? accessToken : '')
        dispatch(Action.auth.FindOneUser(accessToken))
        }).catch()
        // console.log("accessTokenUser 120", accessTokenUser)
      
  }, [])

  

  const setSort =(sortByASC)=>{
    setSortByASC(!sortByASC)
      if(sortByASC){
      // console.log("🚀 ~ file: ListChapter.jsx ~ line 130 ~ setSort ~ sortByASC", sortByASC)
        setListSort(listChapter.sort((a, b) => b.name - a.name))
        
      }else{
      // console.log("🚀 ~ file: ListChapter.jsx ~ line 137 ~ setSort ~ sortByASC", sortByASC)

        setListSort(listChapter.sort((a, b) => a.name - b.name))
      }
  }
  useEffect(()=>{
    setSort(true);
  },[listChapter])

  function openChapter (item,index) {
    if(item?.name >=6){   

      if(accessTokenUser?.length === 0){
        // console.log('vao day')
        setShowAlert(true) 
        return
      }
      setChapter(item)
      if(userIsLogin?.data?.history?.bought.includes(item._id)){
        navigation.navigate(screenName.detailChapter,{chapId:item._id, ebookId:ebookId})
        refBtSheet.current.handleCloseBottomSheet()
        return
      }
      setModalVisible(true)  
      return
    }
      refBtSheet.current.handleCloseBottomSheet()
      navigation.navigate(screenName.detailChapter,{chapId:item._id, ebookId:ebookId})
  }

  function goToLogin (){
    refBtSheet.current.handleCloseBottomSheet()
    navigation.navigate(screenName.signinScreen, {screenNameBefore:screenName.detailScreen, isGoBack:true})
  }

  function rederItemChapter ({item,index}){
    return (
      <List.Item style={{borderBottomWidth: 0.3, borderBottomColor: 'rgba(0,0,0,0.3)',}}
      title={`Chương ${item?.name.toString()}`}
      right={()=> (
       item?.name <= 5 ? 
         <></>
         :
          userIsLogin?.data?.history?.bought.includes(item._id) ? 
           <></> : <HStack alignItems="center">
                  <Text style={{marginRight:margin/5}} color="orange.300">$10</Text>
                <Image style={styles.lottie} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1027/1027961.png'}}/>
                </HStack>
      ) }
      description={()=> (
        <HStack alignItems="center">
          <Text style={{marginRight:margin, fontSize: 10}}>{formatDate(item?.createAt)}</Text>
          <AntDesign size={10} style={{marginRight:margin/5}} name='eyeo'/>
          <Text style={{marginRight:margin, fontSize: 10}}>{item?.views}</Text>
          <AntDesign size={10} style={{marginRight:margin/5}} name='like2'/>
          <Text style={{marginRight:margin, fontSize: 10}}>{item?.likes}</Text>
          <AntDesign size={10} style={{marginRight:margin/5}} name='message1'/>
          <Text style={{marginRight:margin, fontSize: 10}}>{item?.comments}</Text>
        </HStack>
      )}
      onPress={() =>openChapter(item)}
    />
    )
  }
  return (
    <NativeBaseProvider ref={listChapter_ref}  style={{ flex: 1}}>
      <Appbar.Header statusBarHeight={0} style={{backgroundColor: 'transparent'}}>
        <Appbar.Content title={`Cập nhật đến chương ${listChapter.length}`}/>
        <Appbar.Action  testID = 'sort-by' onPress={()=>{
          setSort(sortByASC)
        }} style={{margin:0, marginRight:10}} icon= { sortByASC ? 'sort-ascending' : 'sort-descending'} size={25}/>
      </Appbar.Header>

      <FlatList
        data={listSort }
        // data={  listSort }
        renderItem={rederItemChapter}
      />
      <OpenChap modalVisible={modalVisible} setModalVisible={setModalVisible} item={chapter} user={userIsLogin} accessToken={accessTokenUser}  dispatch={dispatch} refBtSheet={refBtSheet}/>
      <AwesomeAlert
        contentStyle={{ width: appConfigs.FULL_WIDTH * 0.7 }}
        show={showAlert}
        showProgress={false}
        message={"Bạn cần đăng nhập để đọc chương này!"}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText='Login'
        confirmButtonColor="#32a7f0"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={()=> goToLogin()}
      />
    </NativeBaseProvider>
  )
}


export default ListChapter