/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Image, Alert, StatusBar, Pressable, StyleSheet, TouchableOpacity, FlatList, ScrollView,Share, TextInput
} from 'react-native';
import { Avatar } from "react-native-elements";
import appConfigs from '../configs/app'
import Animated, {
  interpolate, withTiming, runOnJS,
  useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme, useIsFocused } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons, MaterialIcons,Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing'
import { useDispatch, useSelector } from 'react-redux';
import ViewMoreTextComponent from '../components/ViewMoreTextComponent';
import Text from '../components/Text';
import ButtonComponent from '../components/Button';
import BookHeader from '../components/BookHeader';
import { useBooksState } from '../BookStore';
import { setModal } from '../components/StatusModal';
import ChatInput from '../components/InputChat';
import { Modal,Button } from 'native-base';
import Comment from './Comment';
import BottomSheet from '../components/BottomSheet';
import ListChapter from '../components/ListChapter';
import Action from '../Store/Actions';
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
import {getPersistAuth, handleToast} from '../functions/globalFunc'
import { AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';


// Default screen
function Details({ navigation, route }) {
  const dispatch = useDispatch()
  const {detailBook} = route.params  
  const [isShowModalRating, setIsShowModalRating] = useState(false)
  const [rating, setRating] = useState(0);
 
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // const detailBook = useSelector(state => state.AppReducer.detailBook)
  // useEffect(()=>{
  //   dispatch({type:actionTypes.setDetailBook, payload:book})
  // },[])
  
  // console.log("🚀 ~ file: Details.jsx ~ line 43 ~ Details ~ book", book)

  const { books: bookList } = useBooksState();
  const [related, setRelated] = useState([]);
  const [fullBook, setFullBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [textReview, setTextReview] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [showInput, setShowInput] = useState(false)
  const [commentIdOrReviewId, setCommentIdOrReviewId] = useState('')
  const [userIdComment, setUserIdComment] = useState('')
  const [commentForReview, setcommentForReview] = useState(false)
  const [message, setMessage] = useState('')

  const panRef = useRef();
  const refBtSheet = useRef();
  const inputRef = useRef(null);

  const detail_ref = useRef(true)
  const loaded = useSharedValue(0);
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const moved = useSharedValue(0);
  const closing = useSharedValue(0.9);
  const scrollY = useSharedValue(0);
  const {
    margin, width, dark, colors, normalize, status, ios,
  } = useTheme();
  const HEADER = normalize(width + status, 500) + margin;


const [image, setImage] = useState()

  const saveFile = async (fileUri) => {
    MediaLibrary.requestPermissionsAsync()
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        // console.log("🚀 ~ file: Details.jsx ~ line 72 ~ saveFile ~ asset", asset)

        const options = {
          mimeType: 'image/jpg',
          dialogTitle: 'Open file',
          UTI: 'com.adobe.jpg',
       };
        await Sharing.shareAsync(asset.uri,options)
       await MediaLibrary.createAlbumAsync("Download", asset, false)
       
  }

 
 const  downloadFile = async() =>{
 console.log("🚀 ~ file: Details.jsx ~ line 113 ~ downloadFile ~ downloadFile")
  
    const uri = detailBook?.images?.wallPaper?.url
    console.log("🚀 ~ file: Details.jsx ~ line 105 ~ downloadFile ~ uri", uri)
    let fileUri =  FileSystem.documentDirectory + "fook-image.jpg";
    console.log("🚀 ~ file: Details.jsx ~ line 107 ~ downloadFile ~ fileUri", fileUri)
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri); 
      })
      .catch(error => {
        console.error(error);
      })
}




  const [token, setToken] = useState('')
  const [click, setClick] = useState()
  const [isSubscribe, setIsSubscribe] = useState(false)
  const accessToken = useSelector(state => state.AuthReducer.accessToken)
  // console.log("🚀 ~ file: Details.jsx ~ line 142 ~ Details ~ accessToken", accessToken)
  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)

  const listReviewAndComment = useSelector(state => state.BookReducer.listReviewAndComment)
  // console.log("🚀 ~ file: Comment.jsx ~ line 50 ~ Comment ~ listReviewAndComment", listReviewAndComment)

  useEffect(() => {
    dispatch(Action.book.searchReview(detailBook._id))
    // return ()=>{
    //   scrollViewRef.current = false
    // }
  }, [])

  // console.log("🚀 ~ file: Details.jsx ~ line 67 ~ Details ~ userIsLogin", userIsLogin?.data?.subscribe?.ebooks)

  useEffect(() => {
      if(userIsLogin?.data?.subscribe?.ebooks.includes(detailBook._id)){
        setIsSubscribe(true) 
      }else{
        setIsSubscribe(false)
      }
    }
  , [userIsLogin,click])
  
 
  useEffect(() => {
      if(accessToken.length > 0 ){    
        console.log("🚀 ~ file: Details.jsx ~ line 157 ~ useEffect ~ accessToken.length>0", accessToken.length)
        setToken(accessToken)
      }
      else if(accessToken.length == 0){
        getPersistAuth().then((accessToken) => {
          if(accessToken){
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
  
  // Go back to previous screen
  const goBack = () => {
    navigation.goBack();
    Haptics.selectionAsync();
  };

  // open book lists sheet
  const openSheet = () => {
    Haptics.selectionAsync();
    setModal(detailBook);
  };

  const handleSubscricebleBook =()=>{

     if(token?.length == 0 ){
      handleToast("Bạn cần đăng nhập")
      return
    }
    dispatch(Action.auth.UpdateOneUserMoblie( {ebookId:detailBook._id}, token,'subscribe-ebooks'))
    setClick(!click)
  }

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler(({ contentOffset }) => {
    scrollY.value = contentOffset.y;
    if (contentOffset.y <= 0 && !enabled) {
      runOnJS(setEnabled)(true);
    }
    if (contentOffset.y > 0 && enabled) {
      runOnJS(setEnabled)(false);
    }
  });

  // Pan gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.moved = moved.value;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (e, ctx) => {
      moved.value = ctx.moved + Math.max(e.translationY, e.translationX);
      ctx.velocity = Math.max(e.velocityX, e.velocityY);
      y.value = ctx.startY + e.translationY;
      x.value = ctx.startX + e.translationX;

      // closing screen? do it!
      if ((moved.value >= 110 || ctx.velocity >= 3500)) {
        if (closing.value === 0.9) runOnJS(goBack)();
        closing.value = withTiming(0.5);
      }
    },
    onEnd: (e, ctx) => {
      if (moved.value < 75 && ctx.velocity < 750) {
        y.value = withTiming(0);
        x.value = withTiming(0);
        moved.value = withTiming(0);
      }
    },
  });

  // Load detailBook details


  // Screen anims
  const anims = {
    screen: useAnimatedStyle(() => ({
      flex: 1,
      opacity: withTiming(closing.value < 0.9 ? 0 : 1),
      overflow: 'hidden',
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: closing.value < 0.9 ? closing.value : interpolate(moved.value, [0, 75], [1, 0.9], 'clamp') },
      ],
      borderRadius: interpolate(moved.value, [0, 10], [0, 30], 'clamp'),
    })),
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    details: useAnimatedStyle(() => ({
      opacity: loaded.value,
      transform: [
        { translateY: interpolate(loaded.value, [0, 1], [20, 0], 'clamp') },
      ],
    })),
  };

  // Styles
  const styles = {
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,.25)',
    },
    closeIcon: {
      zIndex: 10,
      top: 40,
      right: margin,
      opacity: 0.75,
      color: colors.text,
      position: 'absolute',
    },
    scrollContainer: {
      paddingTop: HEADER,
      paddingBottom: status + 50,
    },
    detailsBox: {
      borderRadius: 10,
      flexDirection: 'row',
      alignItems:'center',
      marginHorizontal: margin,
      backgroundColor: colors.card,
    },
    detailsRow: {
      flex: 1,
      paddingVertical: margin / 2,
    },
    detailsRowRating: {
      flex: 0.7,
      paddingVertical: margin / 2,
      // backgroundColor:'red'
    },
    detailsRowPage: {
      flex: 0.7,
      paddingVertical: margin / 2,
      // backgroundColor:'red'
    },
    detailsRowBorder: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: dark ? '#ffffff22' : '#00000011',
    },
    subDetails: {
      fontSize: 15,
      textAlign: 'center',
      marginTop: margin / 4,
    },
    subDetailsRating: {
      fontSize: 15,
      textAlign: 'center',
      backgroundColor:"blue"
    },
    authorBox: {
      marginTop: margin,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: margin,
    },
    authorImage: {
      width: 65,
      height: 65,
      borderRadius: 65,
      marginRight: margin,
    },
    authorDetails: {
      marginTop: 5,
      opacity: 0.75,
      width: width - 120,
    },
    aboutdetailBook: {
      margin,
      lineHeight: 25,
      textAlign: 'justify',
    },
    addButton: {
      width: "60%",
      height: "80%",
      alignSelf: "flex-start",
      // right: 10,
      // bottom: 10,
      // borderRadius: 60,
      // position: 'absolute', 
      backgroundColor: '#7c09b5',
    },
    viewBottom: {
      // zIndex:100,
      backgroundColor: "#ebebeb",
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
      paddingHorizontal:15,
      width: '100%',
      justifyContent:'flex-end'
    },
  };
  const renderItemGenre = (value) => {
    const {
      item: { name }
    } = value
    return (
      <View style={{ flex: 1, height: "100%", marginRight: 15, }}>
        <View style={{ flex: 1, height: "100%", paddingHorizontal: 10, flexDirection: "row", justifyContent: "center", borderWidth: 1, borderColor: "#dedede", borderRadius: 50, alignItems: 'center', }}>
          <Text style={styles.text}>{name}</Text>
        </View>

      </View>
    )
  }

  // Find book in list
  // const item = bookList.find((b) => b.bookId === book.bookId);

  // Render book details

    const onShare = async () => {
      downloadFile()
    };
    const onFocusHandler = () => {
      inputRef.current && inputRef.current.focus();
    }
  
    const handleShowInput = (value,commentForReview, commentIdOrReviewId, userId) => {
    console.log("🚀 ~ file: Details.jsx ~ line 395 ~ handleShowInput ~ userId", userId)
    // console.log("🚀 ~ file: Details.jsx ~ line 373 ~ handleShowInput ~ handleShowInput", value)
    if(token?.length == 0 ){
      handleToast("Bạn cần đăng nhập để bình luận")
      return
    }
      onFocusHandler();
      // scrollViewRef.current.scrollToEnd({ animated: true })
      setShowInput(value)
      setcommentForReview(commentForReview)
      setCommentIdOrReviewId(commentIdOrReviewId)
      setUserIdComment(userId)
      
    }
   
    const onStarRatingPress = (rating) => {
      setRating(rating)
      // console.log('rating', rating);
    };

    const sendComment=()=>{
    // console.log("🚀 ~ file: Details.jsx ~ line 442 ~ sendComment ~ sendComment",)
      if(message.slice(" ").length == 0 ){
        return
      }
      let data ={
        ebookId:detailBook._id,
        content: message,
      }
      if(commentForReview){
        data={...data, reviewId:commentIdOrReviewId}
      }else{
        data={...data, commentId:commentIdOrReviewId}
      }
        
      console.log('data', data);
      dispatch(Action.book.addComment({...data, token:token,userIdComment:userIdComment}))

      setShowInput(false)

    }

    const addReview = ()=>{
    console.log("🚀 ~ file: Details.jsx ~ line 454 ~ addReview ~ addReview",{ ebooks:detailBook._id,
      rating:rating,
      content:textReview,
      token:token})

      // console.log("token add review", token);
      if(rating == 0) return
      dispatch(Action.book.addReview({
        ebooks:detailBook._id,
        rating:rating,
        content:textReview,
        token:token
       }))
       setRating(0)
    }

    return (
    <>
      <View style={styles.overlay} ref={detail_ref} />
      <PanGestureHandler
        ref={panRef}
        failOffsetY={-5}
        failOffsetX={-5}
        activeOffsetY={25}
        activeOffsetX={25}
        onHandlerStateChange={gestureHandler}
      >
        <Animated.View style={anims.screen}>
          {ios && <StatusBar hidden={useIsFocused()} animated />}
          <BookHeader scrollY={scrollY} book={detailBook} />
          <AntDesign size={27} name="close" onPress={goBack} style={styles.closeIcon} />

          <Animated.View style={anims.scrollView}>
            <AnimatedScrollView
              waitFor={enabled ? panRef : undefined}
              onScroll={scrollHandler}
              scrollEventThrottle={1}
              contentContainerStyle={styles.scrollContainer}
            >

              <View style={styles.detailsBox}>
                <View style={styles.detailsRowRating}>
                  <Text center size={13}>RATING</Text>
                  <Text bold style={styles.subDetails}>{detailBook?.avgScore}</Text>
                </View>
                {
                  token?.length > 0 &&   <Ionicons onPress={()=>{
                    if(token?.length == 0 ){
                      handleToast("Bạn cần đăng nhập")
                      return
                    }
                    setIsShowModalRating(true)}
                  } name='ios-pencil' size={25} style={{paddingRight:15}}/>
                }
              

                <View style={[styles.detailsRowPage, styles.detailsRowBorder]}>
                  <Text center size={13}>CHAPTERS</Text>
                  <Text bold style={styles.subDetails}>{detailBook?.sumPage}</Text>
                </View>
                <Pressable onPress={openSheet} style={styles.detailsRow}>
                  <Text center size={13}>STATUS</Text>
                  <Text bold  style={[styles.subDetails, {color: detailBook?.status =="Đang cập nhật" ? "#ff1f2a" : null}]} >{detailBook?.status}</Text>
                </Pressable>
              </View>

              <View style={{ paddingHorizontal: 20 }}>
                <ViewMoreTextComponent text={detailBook?.description} style={{ marginTop: 15 }} />
              </View>


              <View style={{ marginTop: 15, marginLeft: 10, paddingHorizontal: "3%", width: "100%", height: 30, }}>
                <FlatList
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                  data={detailBook?.genres}
                  renderItem={renderItemGenre}
                  numColumns={1}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {
                detailBook?.authors?.map((item, index) => {
                  return (
                    <View key={index} style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar containerStyle={{ marginBottom: 5 }} source={{ uri: item?.images ? item?.images : "https://res.cloudinary.com/dwnucvodc/image/upload/v1656738240/Flex-ticket/ImageUser/avatar-default_swe81x.png" }} size={60} rounded></Avatar>
                      <Text style={{ marginLeft: 15 }}>{item?.name}</Text>
                    </View>
                  )
                })
              }
              <View style={{marginTop:10}}>
                <Comment  token={token} ebookId={detailBook?._id} handleShowInput={handleShowInput} listReviewAndComment={listReviewAndComment} />
              </View>
  
            </AnimatedScrollView>
            { !showInput ? 
            <View style={styles.viewBottom}>
              <View style={{ flexDirection: "row", justifyContent: "space-around", width: "30%", height: "70%" }}>
                <TouchableOpacity testID='touch-share-detail' style={{ alignSelf: "flex-start", height: "120%" }} onPress={onShare}>
                  <AntDesign name='sharealt' color={'#adadad'} size={25} />
                </TouchableOpacity >
                {token?.length > 0 && 
                <TouchableOpacity testID='touch-add-favorite-detail' onPress={handleSubscricebleBook}>
                  <MaterialCommunityIcons color={isSubscribe ? "red" : "#adadad"} name={false ? 'heart-plus-outline' : "heart"} size={25} />
                </TouchableOpacity>
                }
              </View>

              <ButtonComponent testID="open-bottom-sheet-detail" onPress={() => refBtSheet.current.handleOpenBottomSheet()} style={styles.addButton}>
                <Text style={{ color: "white" }}>Đọc Truyện</Text>
              </ButtonComponent>
            </View> : <ChatInput message={message} setMessage={setMessage} sendComment={sendComment} onFocusHandler={onFocusHandler} inputRef={inputRef} handleShowInput={handleShowInput}  commentIdOrReviewId={commentIdOrReviewId}/>
            }


            {/* <AntDesign size={21} name={getIcon(item?.status)} style={styles.addIcon} /> */}

          </Animated.View>
         

          <BottomSheet height={appConfigs.FULL_HEIGHT * 0.95} ref={refBtSheet}>
              <View style={styles.topViewBtSheeet}>
                <MaterialIcons name='close' size={25} onPress={() => { refBtSheet.current.handleCloseBottomSheet() }} />
              </View> 
            <ListChapter ebookId={detailBook?._id} refBtSheet={refBtSheet}/>
          </BottomSheet>
        </Animated.View>
        
      </PanGestureHandler>
      <Modal isOpen={isShowModalRating} onClose={setIsShowModalRating} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Thêm đánh giá của bạn</Modal.Header>
          <View style={{width:'100%', alignItems:'center', marginTop:20}}> 
            <StarRating
            containerStyle={{width:'60%'}}
            starSize={25}
            halfStarEnabled={true}
            fullStarColor="#fad902"
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => onStarRatingPress(rating)}
            />
          </View>
          
          <Modal.Body>

            <TextInput style={{marginTop:5}} onChangeText={(text)=>setTextReview(text)} placeholder={'Nhập đánh giá'} />
            
          </Modal.Body>
          <Modal.Footer>
            
            {rating == 0 && <View justifyContent='center' marginRight={4}>
              <Text  color='red'>Vui lòng chọn số sao</Text>
              </View>}
            <Button.Group variant="ghost" space={2}>

            {/* <TouchableOpacity style={{height:'', justifyContent:'center'}} onPress={()=>{addReview(); setIsShowModalRating(false) }}>
              <Text>Gửi</Text>
            </TouchableOpacity> */}
             <Button onPress={() => {
             addReview(); setIsShowModalRating(false)
            }} colorScheme="primary">
                Gửi
              </Button>

              <Button onPress={() => {
              setIsShowModalRating(!isShowModalRating);
            }} colorScheme="secondary">
                Đóng
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    

    </>
  );
}

export default React.memo(Details);
