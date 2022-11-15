import { FlatList, Image, Pressable, Text, View, NativeBaseProvider, } from 'native-base'
import { useTheme } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { Avatar } from 'react-native-paper'
import { Animated, TouchableOpacity } from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useRef, useState, useEffect } from 'react'
import mocks from '../mocks'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import ChatInput from '../components/InputChat';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { colorApp } from '../configs/app';
import BottomSheet from '../components/BottomSheet';
import { displayDate, handleToast } from '../functions/globalFunc';
import { getPersistAuth } from '../functions/globalFunc'
import appConfigs from '../configs/app'

import Action from '../Store/Actions';

const DetailChapter = ({ route }) => {
  const { chapId,ebookId } = route.params
  // console.log("🚀 ~ file: DetailChapter.jsx ~ line 15 ~ DetailChapter ~ chapId", chapId)
  const { dark, width, height, colors, margin, navbar, normalize, ios } = useTheme();
  const [showComment, setShowComment] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')

  const refBtSheet = useRef();



  const [like, setLike] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const inputRef = useRef(null);
  const detailChapter_ref = useRef(true)

  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  // console.log("🚀 ~ file: Details.jsx ~ line 142 ~ Details ~ accessToken", accessToken)
  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)
  console.log("🚀 ~ file: DetailChapter.jsx ~ line 47 ~ DetailChapter ~ userIsLogin", userIsLogin?.data?._id)


  useEffect(() => {
    if (accessToken.length > 0) {
      // console.log("🚀 ~ file: DetailChapter.jsx ~ line 51 ~ useEffect ~ accessToken.length > 0")

      setToken(accessToken)
    }
    else if (accessToken.length == 0) {
      // console.log("🚀 ~ file: DetailChapter.jsx ~ line 56 ~ useEffect ~ accessToken.length == 0")

      getPersistAuth().then((accessToken) => {
        if (accessToken) {
          setToken(accessToken)
          // console.log("🚀 ~ file: Details.jsx ~ line 163 ~ getPersistAuth ~ accessToken", accessToken)
          dispatch(Action.auth.FindOneUser(accessToken.toString()))
          return
        }
        setToken('')

      }).catch()


    }
    // console.log("🚀 ~ file: Details.jsx ~ line 139 ~ Details ~ token", token)

  }, [accessToken.length])




  const sendComment = () => {
    // console.log("🚀 ~ file: Details.jsx ~ line 442 ~ sendComment ~ sendComment",)

    let data = {
      chapterId: chapId,
      content: message,
    }
    // console.log('data', data);
    dispatch(Action.book.addCommentChapter({ ...data, token: token }))
  }


  const handleShowComment = (index) => () => {
    setShowComment(!showComment)
  }
  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  }
  const handleShowInput = (value) => {
    // console.log("🚀 ~ file: DetailChapter.jsx ~ line 54 ~ handleShowInput ~ handleShowInput")
    // console.log("🚀 ~ file: DetailChapter.jsx ~ line 94 ~ handleShowInput ~ token", token)

    if (token?.length == 0) {
      handleToast("Bạn cần đăng nhập để bình luận")
      return
    }
    onFocusHandler();
    setShowInput(value)
  }
  const handleLike = (reviewIdOrCommentId) => {
    if(token.length == 0){
      handleToast("Bạn cần đăng nhập")
      refBtSheet.current.handleCloseBottomSheet()
      return
    }
    dispatch(Action.book.likeComment({commentId:reviewIdOrCommentId, token:token,chapId:chapId}))
  }

  const detailOneChapter = useSelector(state => state.BookReducer.detailOneChapter)
  // console.log("🚀 ~ file: DetailChapter.jsx ~ line 118 ~ DetailChapter ~ detailOneChapter", detailOneChapter[0]?.comments[0]?.likes)
  // console.log("🚀 ~ file: DetailChapter.jsx ~ line 119 ~ DetailChapter ~ detailOneChapter", detailOneChapter[0]?.comments[0])
  const listCommentChapter = useSelector(state => state.BookReducer.listCommentChapter)
  // console.log("🚀 ~ file: DetailChapter.jsx ~ line 121 ~ DetailChapter ~ listCommentChapter", listCommentChapter)
 
  useEffect(() => {
    dispatch(Action.book.findOneChapter(chapId))

  }, [])

  const renderComment = ({ item, index }) => {
    // console.log('item comment', item);
    return (

      <View style={{ paddingHorizontal: 20, flex: 1, width: "100%", borderRadius: 30 ,}} key={index}>
        {/* <Text>{item?._id}</Text> */}
        <List.Item
          title={item?.userId?.displayName}
          description={item?.content.length >= 60 ? `${item?.content.slice(0,60)}...` : item?.content }
          descriptionNumberOfLines={10}
          descriptionStyle={{ fontSize: 13 }}
          left={() => <Avatar.Image style={{ margin: 5 }} size={30} source={{ uri: item?.userId?.images?.avatar?.url }} />}
        />

        <View style={{ flexDirection: 'row', height: 30, paddingLeft: '20%' }}>
          <Text style={{ height: '100%', width: '60%' }} size={11}>{displayDate(item?.createAt)}</Text>

          <TouchableOpacity onPress={() => handleLike(item?._id)}>
            <Text style={{ height: '100%', width: 50, marginRight: margin / 2, color: item?.likes?.includes(userIsLogin?.data?._id) ? colorApp.primaryPurple : null, fontWeight: item?.likes?.includes(userIsLogin?.data?._id) ? 'bold' : null }} size={11}>Thích
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', flexDirection: 'row', borderRadius: 10, paddingHorizontal: 6 }}>
            <Text size={11} style={{ height: 30, width: 25, marginRight: 5, color: colorApp.primaryPurple }}>{item?.likes.length}</Text>
            <AntDesign size={18} style={{marginTop:-8}} name='like1' color={colorApp.primaryPurple} />
          </View>
        </View>
      </View>

    )

  }

  return (
    <NativeBaseProvider flex={1} ref={detailChapter_ref}>
         {/* <View style={{ flex:1,width:'100%', backgroundColor:'blue',width: width}}> */}
      <FlatList
        data={detailOneChapter[0]?.images}
        keyExtractor={(item) => item?._id}
        renderItem={({ item, index }) => (
       
              <Image alt='image-chapter' key={index} source={{ uri: item?.url }} style={{ width: width, height: height - margin, }} resizeMode='contain'  />
        
        
        )}
      />
        {/* </View> */}


      {showInput ? <ChatInput token={token} message={message} setMessage={setMessage} sendComment={sendComment} handleShowInput={handleShowInput} inputRef={inputRef} /> :
        (
          <ActionButton buttonColor={colorApp.primaryPurple}>

            <ActionButton.Item buttonColor='#ff30e0' title={detailOneChapter[0]?.likes.includes(userIsLogin?.data?._id) ? "Bỏ thích" : "Thích"} onPress={() => {dispatch(Action.book.likeChapter({token:token, chapId:chapId, ebookId:ebookId})) }}>
              <AntDesign name="like1" style={{
                fontSize: 20,
                height: 22,
                color: 'white',
              }} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#db02f5' title="Xem bình luận" onPress={() => { refBtSheet.current.handleOpenBottomSheet(); dispatch(Action.book.searchCommentChapter(chapId)) }}>
              <Icon name="ios-chatbubbles-sharp" style={{
                fontSize: 20,
                height: 22,
                color: 'white',
              }} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#c002d6' title="Viết bình luận" onPress={() => handleShowInput(true)}>
              <Icon name="md-create" style={{
                fontSize: 20,
                height: 22,
                color: 'white'
              }} />
            </ActionButton.Item>
          </ActionButton>
        )
      }

      <BottomSheet height={appConfigs.FULL_HEIGHT * 0.7} ref={refBtSheet}>
        <View style={{
          flexDirection: 'row',
          width: "100%",
          justifyContent: "flex-end",
          // backgroundColor: '#7c09b5',
        }}>
          <MaterialIcons name='close' style={{ marginRight: 20 }} size={25} onPress={() => { refBtSheet.current.handleCloseBottomSheet() }} />


        </View>
        <View style={{ width: '100%', height: '100%' }}>
          {listCommentChapter.length == 0 ? 
          <Text style={{paddingHorizontal:20}}>Chưa có bình luận nào</Text>
          :
           <FlatList
           data={listCommentChapter}
           //  horizontal={true}
           showsHorizontalScrollIndicator={false}
           renderItem={renderComment}
         />
        }
         
        </View>

      </BottomSheet>
    </NativeBaseProvider>
  )
}
export default DetailChapter


