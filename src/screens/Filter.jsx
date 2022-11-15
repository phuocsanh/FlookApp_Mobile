import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../Store/Actions';
import ListFilterData from '../constants/ListFilterData';
import ListAccordion from '../components/Accordion'
import typography from '../constants/typography'
import actionTypes from '../Store/Actions/constants';
import screenName from '../constants/screenName';

const FilterScreen = ({ route }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation();
 


  // const refSort = useRef()

  const dispatch = useDispatch()
  const filterObj = useSelector(state => state.BookReducer.listFilter)
  const listAuthor = useSelector(state => state.BookReducer.listAuthor)
  const listGenre = useSelector(state => state.BookReducer.listGenre)
  const listAlowedAge = useSelector(state => state.BookReducer.listAllowedFilter)
  const listChapter = useSelector(state => state.BookReducer.listChapterFilter)
 
  const listStatus = useSelector(state => state.BookReducer.listStatusFilter)
  const listSort = useSelector(state => state.BookReducer.listSortFilter)

  const sortObj = useSelector(state => state.BookReducer.sortObj)


  // console.log("sortObj useSelector", sortObj)
  const [listFilter, setListFilter] = useState({ 
    author: [],
    genre: [],
    allowedage: listAlowedAge ? listAlowedAge : [],
    chapter: listChapter ? listChapter : [],
    status: listStatus ? listStatus : [],
    sort: listSort ? listSort : [],
  })

  const handleSetListFilter = (value) => {
    setListFilter(value)
  }



  const getFilterObj = () => {
    // console.log("goi get filter obj")
    const  newAuthor = [], newGenre = [], newStatus = [], newAllowedAge = [], newSort = [], newChapter=[]

    for (let value in listFilter.author) {
      if (listFilter.author[value].isSelected == true && listFilter.author[value].name !== "All") {
        newAuthor.push(listFilter.author[value]._id)
      }
      // else if (listFilter.author[value].isSelected == true && listFilter.author[value].name == "All") {
      //   newAuthor.push("All")
      // }
    }

    for (let value in listFilter.genre) {
      if (listFilter.genre[value].isSelected == true && listFilter.genre[value].name !== "All") {
        newGenre.push(listFilter.genre[value]._id)
       }
      //   else if (listFilter.genre[value].isSelected == true && listFilter.genre[value].name == "All") {
      //   newGenre.push("All")
      // }
    }

  

    for (let value in listFilter.status) {

      if (listFilter.status[value].isSelected == true) {
        newStatus.push(listFilter.status[value].status)
      }
    }

    for (let value in listFilter.allowedage) {

      if (listFilter.allowedage[value].isSelected == true) {
        newAllowedAge.push(listFilter.allowedage[value].allowed)
      }
    }
    // for (let value in listFilter.chapter) {

    //   if (listFilter.chapter[value].isSelected == true) {
    //     newChapter.push(listFilter.chapter[value].chapter)
    //   }
    // }
    
    for (let value in listFilter.sort) {
      if (listFilter.sort[value].isSelected == true) {
        sortObj ? newSort.push(sortObj) : newSort.push(listFilter.sort[value])
      }
    }
   
    console.log('filter obj',
    {
      author: newAuthor,
      genre: newGenre,
      status: newStatus,
      allowedAge: newAllowedAge,
      sort: newSort,
      
    } );
    
    return {
      author: newAuthor,
      genre: newGenre,
      status: newStatus,
      allowedAge: newAllowedAge,
      sort: newSort,
      
    }
  }
  const handleFilterBook = () => {
  console.log("🚀 ~ file: Filter.jsx ~ line 124 ~ handleFilterBook ~ handleFilterBook",filterObj)
      
    dispatch(Action.book.filterEbookChannel(filterObj))
    navigation.navigate(screenName.channelScreen)
  }

  useEffect(() => {
    dispatch(Action.book.findManyAuthorMobile())
    dispatch(Action.book.findGenre())
   
  }, [dispatch])
  useEffect(()=>{
    dispatch({type:actionTypes.setFilterFunctions, payload:{handleFilterBook,clearFilter }})
  },[])

  useEffect(() => {
    const listFilterObj = getFilterObj()
    dispatch({ type: actionTypes.setListFilter, payload: listFilterObj })
  }, [listFilter, sortObj])

  useEffect(() => {
    let authorArr = listAuthor.map((item) => {
      return { ...item, isSelected: false }
    })
    authorArr.splice(0, 0, { _id: "1", name: "All", isSelected: true })

    let genreArr = listGenre.map((item) => {
      return { ...item, isSelected: false }
    })
    genreArr.splice(0, 0, { _id: "1", name: "All", isSelected: true })

    handleSetListFilter({ ...listFilter, author: authorArr, genre: genreArr });
  }, [listAuthor, listGenre])

  const clearFilter = () => { 
    console.log("clear")
    let clearAuthor = listAuthor.map((item) => {
      return { ...item, isSelected: false }
    })
    clearAuthor.splice(0, 0, { _id: "1", name: "All", isSelected: true })

    let clearGenre = listGenre.map((item) => {
      return { ...item, isSelected: false }
    })
    clearGenre.splice(0, 0, { _id: "1", name: "All", isSelected: true })
    // console.log("listFilter.author", listFilter.author);
    const clearStatus = listFilter.status.map((value) => {
      return { ...value, isSelected: false }
    })
    const clearAllowed = listFilter.allowedage.map((value) => {
      return { ...value, isSelected: false }
    })
  
    handleSetListFilter({ ...listFilter, genre: clearGenre, author: clearAuthor, allowedage: clearAllowed, status: clearStatus })
  }


  return (
    <View style={{ flex: 1, marginTop:insets.top }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Text>Đóng</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { clearFilter() }}>
          <Text>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { handleFilterBook() }}>
          <Text>Lọc</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 1, borderColor: "#ededed" }}></View>

      <ScrollView>
       
          <>
            <ListAccordion title='Author' nameList='Tác giả' array={listFilter.author} onSetListFilter={handleSetListFilter} listFilterObj={listFilter} />
            <ListAccordion title='Genre'  nameList='Thể loại' array={listFilter.genre} onSetListFilter={handleSetListFilter} listFilterObj={listFilter} />
            <ListAccordion title='Status'  nameList='Trạng thái' array={listFilter.status} onSetListFilter={handleSetListFilter} listFilterObj={listFilter} />
            {/* <ListAccordion title='Chapter'  nameList='Số chương' array={listFilter.chapter} onSetListFilter={handleSetListFilter} listFilterObj={listFilter} /> */}
            <ListAccordion title='Allowed Age' nameList='Độ tuổi'array={listFilter.allowedage} onSetListFilter={handleSetListFilter} listFilterObj={listFilter} />
            <ListAccordion title='Sort'  nameList='Sắp xếp' array={listFilter.sort} sort={true} onSetListFilter={handleSetListFilter} listFilterObj={listFilter} onGetFilterObj={getFilterObj} />
          </>
        
       


      </ScrollView>
    </View>
  )
}

export default FilterScreen
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: 'white'
  }
})