import { useEffect, useState } from 'react'
import { Checkbox, List } from 'react-native-paper';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, } from "react-native";
import typography from '../constants/typography'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { useDispatch } from 'react-redux';
import actionTypes from '../Store/Actions/constants';


const ListAccor = (props) => {

  const { title, array, listFilterObj, onSetListFilter, sort , nameList} = props
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState();
  const [isClickSortByDateASC, setisClickSortByDateASC] = useState(true);
  const [isClickSortByNameASC, setisClickSortNameASC] = useState(true);
  const [isClickSortByViewASC, setisClickSortByViewASC] = useState(true);
  const [objSort, setObjSort] = useState()

  useEffect(() => {

    if (sort) {
      dispatch({ type: actionTypes.setSortObj, payload: objSort })
    }

  }, [objSort])



  const handClickSortItem = (item) => {
    // console.log("item name", item.title)
    if (item.name === 'Tên') {
      // console.log('Sort by name')
      setisClickSortNameASC(!isClickSortByNameASC)
      if (isClickSortByNameASC) {
        setObjSort({ title: "name", type: -1 })

      }
      else setObjSort({ title: "name", type: 1 })
    }
    if (item.name === 'Ngày') {
      // console.log('Sort by date')

      setisClickSortByDateASC(!isClickSortByDateASC)
      if (isClickSortByDateASC) {
        setObjSort({ title: "date", type: -1 })
      }
      else setObjSort({ title: "date", type: 1})
    }
    if (item.name === 'Lượt xem') {
      // console.log('Sort by view')

      setisClickSortByViewASC(!isClickSortByViewASC)
      if (isClickSortByViewASC) {
        setObjSort({ title: "view", type: -1 })
      }
      else setObjSort({ title: "view", type: 1 })

    }
   
  }


  const renderIconSort = (item) => {
    if (item.name === "Tên") {
      // console.log("isSelect ", item.isSelected)
      return (
        item.isSelected ?
          isClickSortByNameASC ? <MaterialCommunityIcons onPress={() => item.isSelected && handClickSortItem(item)} name="sort-ascending" size={25} /> : <MaterialCommunityIcons onPress={() => item.isSelected && handClickSortItem(item)} name="sort-descending" size={25} />
          : <MaterialCommunityIcons name="sort-ascending" size={25} />
      )
    }
    else if (item.name === "Ngày") {
      return (<>{
        item.isSelected ?
          isClickSortByDateASC ? <MaterialCommunityIcons onPress={() => item.isSelected && handClickSortItem(item)} name="sort-ascending" size={25} /> : <MaterialCommunityIcons onPress={() => item.isSelected && handClickSortItem(item)} name="sort-descending" size={25} />
          : <MaterialCommunityIcons name="sort-ascending" size={25} />

      }
      </>
      )
    } else if (item.name === "Lượt xem") {
      return (<>{
        item.isSelected ?
          isClickSortByViewASC ? <MaterialCommunityIcons onPress={() => item.isSelected && handClickSortItem(item)} name="sort-ascending" size={25} /> : <MaterialCommunityIcons onPress={() => item.isSelected && handClickSortItem(item)} name="sort-descending" size={25} />
          : <MaterialCommunityIcons name="sort-ascending" size={25} />

      }
      </>
      )
    }
  }

  const handlePress = title => () => {
    setExpanded(title === expanded ? null : title);
  }

  const handelClickItem = (id, isClicked, arr, type) => {
    let newArr = []
    if (title === "Author" || title === "Genre") {
      newArr = arr.map((value) => {
        if (id == value._id) {
          return { ...value, isSelected: isClicked }
        }
        return value
      })

      if (!props.sort) {
        if (id !== "1") {
          newArr[0].isSelected = false
        } else {
          newArr[0].isSelected = true
          for (let index = 1; index < newArr.length; index++) {
            newArr[index].isSelected = false
          }
        }
      }
    } else {
      setObjSort(null)
      let arrFilter, arrTam = []
      arrFilter = arr.map((value) => {
        if (id == value._id) {
          return { ...value, isSelected: isClicked }
        }
        return value
      })
      arrTam = arrFilter.map((value) => {
        if (id !== value._id) {
          return { ...value, isSelected: false }
        }
        return value
      })
      newArr = arrTam
    }


    if (type === title) {
      let propsName = type.toLowerCase()
      let newProps = propsName.split(" ").join("");
      onSetListFilter({ ...listFilterObj, [newProps]: newArr })
    }



  }

  return (
    <List.Accordion
      title={nameList}
      titleStyle={{ fontWeight: typography.fontWeights.semibold.toString() }}
      left={props => { title && <List.Icon {...props} /> }}
      style={styles.Accordion}
      expanded={expanded === title ? true : false}
      onPress={handlePress(title)}
    >
      {
        array.map((item) => {
          return (
            <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 17 }}>
              <TouchableOpacity key={item._id} style={styles.TouchableOpacity} onPress={() => handelClickItem(item._id, !item.isSelected, array, title)}>
                <View style={styles.ViewInTouchableOpacity}>
                  <Checkbox status={item.isSelected ? 'checked' : "unchecked"} color="#c4c4c4" />
                  <List.Item title={item.name} style={{ width: "100%" }} />
                </View>
              </TouchableOpacity>
              {props.sort &&
                renderIconSort(item)
              }
            </View>
          )
        })
      }
    </List.Accordion>
  )
}

export default ListAccor

const styles = StyleSheet.create({
  Accordion: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    height: 60,
    fontWeight: typography.fontWeights.extrabold.toString(),
    justifyContent: "center"
  },
  TouchableOpacity: {
    flex: 1, marginStart: -40
  },
  ViewInTouchableOpacity: {
    flex: 1, borderBottomWidth: 1, borderBottomColor: "#ebebeb", flexDirection: "row", alignItems: "center"
  },
})