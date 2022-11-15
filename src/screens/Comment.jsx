import React, { useState, useRef, Fragment, useEffect } from 'react';
import { Pressable, View, ScrollView, Keyboard, FlatList, TouchableOpacity } from 'react-native'
import { List } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { AirbnbRating } from 'react-native-ratings';
import { Makiko } from 'react-native-textinput-effects';
import {colorApp} from '../configs/app'
import { displayDate, handleToast } from '../functions/globalFunc';

import Text from '../components/Text';
import Action from '../Store/Actions';

export default function Comment({ ebookId ,handleShowInput,listReviewAndComment, token}) {
  console.log("🚀 ~ file: Comment.jsx ~ line 16 ~ Comment ~ listReviewAndComment", listReviewAndComment)
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const dispatch = useDispatch()
 
  
  const [showCommentReview, setShowCommentReview] = useState(false)
  const [autoScroll, setAutoScroll] = useState()
  const [showComment, setShowComment] = useState(false)

  const scrollViewRef = useRef();

  const userIsLogin = useSelector(state => state.AuthReducer.userIsLogin)


  const ratingCompleted = rating => {
    console.log("Rating is: " + rating)
  }
  const handleShowCommentReview = (index) => () => {
    setShowCommentReview(!showCommentReview)
  }
  const handleShowComment = (index) => () => {
    setShowComment(!showComment)
  }

  const handleLike = (likeReviewInhandle, reviewIdOrCommentId, userId, liked) => {
    if(userIsLogin)
    if(token?.length == 0 ){
      handleToast("Bạn chưa đăng nhập")
      return
    }
    if(likeReviewInhandle){
      // console.log("like review")
    dispatch(Action.book.likeReview({reviewId:reviewIdOrCommentId, token:token, ebookId:ebookId, userId:userId, liked:liked}))
    }else{
      // console.log("like comment")
    dispatch(Action.book.likeComment({commentId:reviewIdOrCommentId, token:token, ebookId:ebookId, userId:userId, liked:liked}))
    }
  }


  const redenItemReview =({item, index})=>{
  // console.log("🚀 ~ file: Comment.jsx ~ line 60 ~ redenItemReview ~ itemcomments", item.comments.length)

    const renderComment =({item,index})=>{
      // console.log("itemComment", item);
      const renderCommentChild =({item,index})=>{
        return (
       
            <Pressable style={{ marginLeft: margin * 3.5 }} key={index}>
              <List.Item
                title={item?.userId[0]?.displayName}
                description={item?.content}
                descriptionNumberOfLines={3}
                descriptionStyle={{ fontSize: 13 }}
                left={() => <Avatar.Image style={{ margin: 10 }} size={30} source={{ uri: item?.userId[0]?.images }} />}
              />
              <View style={{ flexDirection: 'row', marginLeft: margin * 3.5, marginBottom: margin / 2 }}>
                <Text style={{ marginRight: margin }} size={11}>{displayDate(item?.createAt)}</Text>
                
                <TouchableOpacity onPress={()=>handleLike(false, item?._id, item?.userId[0]?._id,item?.likes.includes(userIsLogin?.data?._id) )}>
                <Text style={{ marginRight: margin / 2,color: item?.likes.includes(userIsLogin?.data?._id) ? colorApp.primaryPurple : null, fontWeight:  item?.likes.includes(userIsLogin?.data?._id)  ? 'bold' : null}} size={11} >Thích</Text>
                </TouchableOpacity>
               
                  <View style={{ alignItems:'center', flexDirection: 'row', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <Text size={11} style={{ marginRight: 5, color:colorApp.primaryPurple }}>{item?.likes.length}</Text>
                    <AntDesign size={10} name='like1' color={colorApp.primaryPurple}  />
                  </View>
             
              </View>
            </Pressable>
          
        )

      }

      return (     
          <Fragment>
            <Pressable style={{ marginLeft: margin * 2 }} key={index}>
              <List.Item
                title={item?.userId[0]?.displayName }
                description={item?.content}
                descriptionNumberOfLines={3}
                descriptionStyle={{ fontSize: 13 }}
                left={() => <Avatar.Image style={{ margin: 10 }} size={30} source={{ uri: item?.userId[0]?.images }} />}
              />
              <View style={{ flexDirection: 'row', marginLeft: margin * 3.5, marginBottom: margin / 2 }}>
                <Text style={{ marginRight: margin }} size={11}>{displayDate(item?.createAt)}</Text>
                <TouchableOpacity onPress={()=>handleShowInput(true, false, item._id, item.userId[0]?._id )}>
                <Text style={{ marginRight: margin }} size={11} >Trả lời</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleLike(false, item?._id, item?.userId[0]?._id , item?.likes.includes(userIsLogin?.data?._id))}>
                <Text style={{ marginRight: margin / 2, color: item?.likes.includes(userIsLogin?.data?._id) ? colorApp.primaryPurple : null, fontWeight: item?.likes.includes(userIsLogin?.data?._id)  ? 'bold' : null}} size={11} >Thích</Text>
                </TouchableOpacity>
              
                  <View style={{ alignItems:'center',flexDirection: 'row', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <Text size={10} style={{ marginRight: 5, color:colorApp.primaryPurple }}>{item?.likes.length}</Text>
                    <AntDesign size={10} name='like1' color={colorApp.primaryPurple} />
                  </View>
             
              </View>
    
              {!showComment && (
                <View style={{ flexDirection: 'row', marginLeft: margin * 3.5, marginBottom: margin / 2 }}>
                  <MaterialCommunityIcons name='arrow-right-bottom' size={15} />
                  <Text style={{ marginLeft: margin / 2 }} size={11} onPress={handleShowComment(index)}>Xem tất cả</Text>
                </View>
              )}
            </Pressable>
                <FlatList
                data={item?.commentsChild}
                renderItem={renderCommentChild}
                numColumns={1}
                showsHorizontalScrollIndicator={false}
                />
          </Fragment>
        
      )
    }

    return(
    <View key={index}>
    <Pressable>
      <List.Item
        title={item?.users[0]?.displayName ? item?.users[0]?.displayName : ""}
        description={item?.content}
        descriptionNumberOfLines={3}
        descriptionStyle={{ fontSize: 13 }}
        left={() => <Avatar.Image style={{ margin: 10 }} size={30} source={{ uri: item?.users[0]?.images }} />}
        right={() => <AirbnbRating
          ratingContainerStyle={{ position: 'absolute', top: -15, right: 0 }}
          count={5}
          reviews={[]}
          reviewSize={0}
          defaultRating={item?.rating}
          onFinishRating={ratingCompleted}
          size={12}
        />}
      />
      <View style={{ flexDirection: 'row', marginLeft: margin * 3.5, marginBottom: margin / 2 }}>
        <Text style={{ marginRight: margin }} size={11}>{displayDate(item?.createAt)}</Text>
        <Text style={{ marginRight: margin }} size={11} onPress={()=>handleShowInput(true, true,item._id,item.users[0]?._id )}>Trả lời</Text>
        <TouchableOpacity onPress={()=>handleLike(true, item?._id,item?.users[0]?._id, item?.likes.includes(userIsLogin?.data?._id))}>
        <Text style={{ marginRight: margin / 2, color:item?.likes.includes(userIsLogin?.data?._id) ? colorApp.primaryPurple : null, fontWeight:  item?.likes.includes(userIsLogin?.data?._id)  ? 'bold' : null }} size={11} >Thích</Text>
        </TouchableOpacity>
       
          <View style={{ alignItems:'center',flexDirection: 'row', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 6, backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <Text size={10} style={{ marginRight: 5, color:colorApp.primaryPurple }}>{item?.likes.length}</Text>
            <AntDesign size={10} name='like1' color={colorApp.primaryPurple} />
          </View>
      
      </View>


      {!showCommentReview && (
        <View style={{ flexDirection: 'row', marginLeft: margin * 3.5, marginBottom: margin / 2 }}>
          <MaterialCommunityIcons name='arrow-right-bottom' size={15} />
          <Text style={{ marginLeft: margin / 2 }} size={12} onPress={handleShowCommentReview(index)}>Xem tất cả</Text>
        </View>
      )}
    </Pressable>
        
        <FlatList
        data={item?.comments ? item?.comments : [] }
        renderItem={renderComment}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        />

   
  </View>
    )

  }

  return (
    <View style={{ flex: 1 }} ref={scrollViewRef}
    // onContentSizeChange={autoScroll}
    >

      {
        listReviewAndComment.length > 0 ? 
        <View>
          <FlatList
          data={listReviewAndComment }
          renderItem={redenItemReview}
          numColumns={1}
          //  horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
        
        </View> : <></>
        
      }
    
    </View>
  )
}