import { FlatList, Image, Pressable, Text, View } from 'native-base'
import { useTheme } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { Avatar } from 'react-native-paper'
import { AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons'
import { useDispatch,useSelector } from 'react-redux';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import mocks from '../mocks'
import ChatInput from '../components/InputChat';
import ActionButton from 'react-native-action-button';
import Action from '../Store/Actions';

export const DetailChapter = ({route}) => {
  const {chapId} = route.params
  const dispatch = useDispatch()
  const { dark, width, height, colors, margin, navbar, normalize, ios } = useTheme();
  const [showComment, setShowComment] = useState(false)
  const [showInput, setShowInput] = useState(false)

  const [like, setLike] = useState(false)

  const inputRef = useRef(null);
  const detailOneChapter = useSelector(state => state.book.detailOneChapter)
  const handleShowComment = (index) => () => {
    setShowComment(!showComment)
  }
  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  }
  const handleShowInput = (index) => () => {
    onFocusHandler();
    setShowInput(true)
  }
  const handleLike = () => {
    setLike(!like)
  }

  useEffect(() => {
    dispatch(Action.book.searchOneChapter(chapId))
  }, [])
  
  return (
    <View flex={1}>
      <FlatList 
        data={detailOneChapter}
        renderItem={({item, index}) => (
          
          <Image source={{ uri: item.url}} style={{width: width, height:height}} resizeMode='contain'/>
        )}
        
        ListFooterComponent={()=> (
          <FlatList 
            data={mocks.detailChap[0].images}
            renderItem={({item, index}) => (
              
              <View></View>
            )}
          />
        )}
      />
      {showInput ? <ChatInput inputRef={inputRef}/> : <ActionButton
        style={{ right: -5, bottom: -5 }}
        buttonColor="#673AB7"
        onPress={handleShowInput()}
        renderIcon={() => <MaterialCommunityIcons name="feather" size={25} color="white" />}
      />}
    </View>
  )
}
