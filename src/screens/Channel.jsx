import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import screenName from '../constants/screenName';
import TopTap from '../components/TopTab'
import FlatGird from '../components/FlatGird';
import ListVertical from '../components/ListVertical';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from 'react-native-vector-icons'
import { useEffect, useState } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Action from '../Store/Actions';
import Forum from './Forum';



export default function ChannelScreen() {
  const dispatch = useDispatch()
  const listBookAfterFilter = useSelector(state => state.BookReducer.listBookAfterFilter)
  useEffect(()=>{
    dispatch(Action.book.filterEbookChannel({
    allowedAge:  [],
    author:  [],
    genre:  [],
    status:  [],
    sort:  []
    }))

  },[])
  
  const listTopTab2 = [
    { _id: "1", screenName: screenName.comicScreen, title: 'Truyện tranh', component: () => <ListVertical screenNameBefore={screenName.channelScreen} data={listBookAfterFilter }/> },
    { _id: "2", screenName: screenName.novelScreen, title: 'Tiểu thuyết', component: () => <Forum/>  },
    { _id: "3", screenName: screenName.chatStoryScreen, title: 'Truyện chat', component: () => <Forum/>  }
  
  ]

  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TopTap arrayCategory={listTopTab2} />
    
    </SafeAreaView>
  )
}

