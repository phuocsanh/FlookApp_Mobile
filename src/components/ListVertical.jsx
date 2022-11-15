import React, { memo, useRef, useState,useEffect } from 'react'
import { FlatList, Image, Text, View } from 'native-base'

import { Button, ListItem } from "@rneui/themed";
import { useNavigation, useTheme } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Foundation, Ionicons } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import { MaterialIcons } from 'react-native-vector-icons'
const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);
import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';
const loading = require('../anims/loading.json');
const filter = require('../anims/filter.json');
import screenName from '../constants/screenName';
import Loading from './Loading';


const ListVertical = (props) => {

  const { data, edit, icon, screenNameBefore, } = props
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const navigation = useNavigation();
 
  
  const handleOpenGirdOrList = () => {
    setOpenGirdOrList(!openGridorList)
  }
  const handleOpenFilter = () => {
    navigation.navigate(screenName.filterScreen, { screenNameBefore: "Channel" })
  }
  const MoveDetail = () => (item) => {
    Haptics.selectionAsync();
    navigation.navigate(screenName.detailScreen, { book: item })
  }

  

  const renderItemBook = ({ item, index }) => {
    const renderHidenButton = reset => (
      <Button
        title="Delete"
        onPress={() => reset()}
        icon={{ name: 'delete', color: 'white' }}
        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
      />
    )
    return (

      <View flex={1} key={index} >
        <ListItem.Swipeable rightContent={!edit ? null : renderHidenButton}>
          <ListItem.Content>
            <View flex={1} flexDirection='row'>
              <TouchableOpacity testID='touch-image-go-to-detail' onPress={()=> navigation.push(screenName.detailScreen, {detailBook: item})}>
                <Image alt='img' width={100} height={150} borderRadius={10} source={{ uri: item.images.wallPaper.url }} resizeMode="cover" />
              </TouchableOpacity>
              <View flex={1} marginLeft={margin}>
                <TouchableOpacity>
                  <Text fontWeight={'bold'} paddingRight={margin}>{item?.title?.length <= 40 ? item?.title : `${item?.title?.slice(0, 40)}...`}</Text>
                  <Text >{item.authors?.map(item => item.name)}</Text>
                </TouchableOpacity>

                {/* Book Info */}
                <View flexDirection='row' marginTop={2} alignItems='center'>
                  <Foundation name='page-multiple' size={15} />
                  <Text marginRight={margin} marginLeft={margin / 5}>{item.sumPage}</Text>
                  <Ionicons name='ios-glasses-outline' size={20} />
                  <Text marginRight={margin} marginLeft={margin / 5}>{item.readers}</Text>
                </View>

                {/* Genre */}
                <View width='100%' height={30} marginTop={2}>
                  <FlatList
                    height='80%'
                    width='100%'
                    data={item?.genres}
                    // renderItem={({item}) => <Chip model='outlined' style={{marginRight:margin/5,justifyContent:"center", alignItems:'center',}}>{item.name}</Chip>}

                    renderItem={({ item }) =>
                      <View style={{ marginRight: margin / 2, justifyContent: "center", alignItems: 'center', borderRadius: 15, backgroundColor: "#ededed", paddingHorizontal: 2 }}>
                        <Text style={{ paddingHorizontal: 5 }} >{item.name}

                        </Text>
                      </View>
                    }
                    numColumns={1}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
          </ListItem.Content>

        </ListItem.Swipeable>
        {/* Bookmark Button */}
        <TouchableOpacity style={{ position: 'absolute', top: 5, right: 15 }}>
          <Ionicons name='ios-bookmarks-outline' size={20} />
        </TouchableOpacity>
        {/* <View borderBottomWidth={1} borderBottomColor={'#e0e0e0'}></View> */}
      </View>

    )
  }


  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);

  const forumRef = useRef(true)
 
  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
  };

  // all the styles
  const styles = {
    screen: useAnimatedStyle(() => ({
      flex: 1,
      opacity: loaded.value,
      backgroundColor: colors.card,
    })),
    header: useAnimatedStyle(() => ({
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingTop: navbar,
      position: 'absolute',
      alignItems: 'center',
      // justifyContent: 'flex-end',
      backgroundColor: 'white',
      height: '60%',
      elevation: ios ? undefined : interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [0, 10], 'clamp'),
      shadowOpacity: ios ? interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [0, 0.75], 'clamp') : undefined,
      transform: [
        { translateY: interpolate(scrollY.value, [0, HEADER - navbar], [0, -HEADER + navbar], 'clamp') },
      ],
    })),
    logo: useAnimatedStyle(() => ({
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [1, 0], 'clamp'),
      transform: [
        { translateY: interpolate(scrollY.value, [-HEADER, 0], [-HEADER / 2, 0], 'clamp') },
      ],
    })),
    lottie: {
      top: 5,

      height: '100%',
      opacity: dark ? 0.8 : 1,
    },
    lottieProps: useAnimatedProps(() => ({
      speed: 0.5,
      autoPlay: true,
    })),

  };


  return (
    <View flex={1}>
      {/* {
        screenNameBefore === screenName.channelScreen && (
          <View style={styles.container}>
            <View style={styles.childrenView}>
              <Text>{"3 book "}</Text>

            </View>
            <View style={styles.childrenView1}>
              
              <TouchableOpacity onPress={() => handleOpenFilter()}>
                <MaterialIcons size={35} name="filter-list" color={'gray'} />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
       */}
      {
        data?.length > 0 ?
          <FlatList
            data={data}
            renderItem={renderItemBook}
            keyExtractor={item => `${item.id}`}
            showsVerticalScrollIndicator={false}
          /> : 
          (
            <View flex={1}>
            <Animated.View ref={forumRef} onLayout={onLayout} style={styles.screen}>
              <Animated.View style={styles.header}>
                <Animated.View style={styles.logo}>
                  <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={screenNameBefore == screenName.channelScreen ? filter : filter} />
                </Animated.View>
              </Animated.View>
            </Animated.View>
            </View>
           )
      } 

    </View>
  )
}

export default memo(ListVertical)


const styles = StyleSheet.create({
  viewItem: {
    height: 200,
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  Img: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 10
  },

  container: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    paddingHorizontal: "5%",
    borderBottomWidth: 0.2,
    // backgroundColor:"red",
    borderBottomColor: "rgba(0, 0, 0, 0.1)"
  },
  childrenView: {
    flex: 1,
    justifyContent: "center"
  },
  childrenView1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  touchableOpacity: {
    marginRight: "10%"
  },

})
