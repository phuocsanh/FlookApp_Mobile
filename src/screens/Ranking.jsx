import React, { memo, useEffect, useState } from 'react';
import { useBooksState } from '../BookStore';
import { View, Pressable, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import screenName from '../constants/screenName';
// import Text from '../components/Text';
import mocks from '../mocks';

import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';

import { useDispatch, useSelector } from 'react-redux';
import Action from '../Store/Actions';
import ListVertical from '../components/ListVertical';

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

const menuHeader = [
  { id: 'hot', categoryName: 'Độ hot', icon: require('../anims/hot.json') },
  { id: 'view', categoryName: 'Lượt xem', icon: require('../anims/view.json') },
  { id: 'score', categoryName: 'Điểm đánh giá', icon: require('../anims/review-score.json') },
  { id: 'reader', categoryName: 'Lượt đọc', icon: require('../anims/readed.json') },
  { id: 'subscribers', categoryName: 'Lượt theo dõi', icon: require('../anims/subscribe.json') },
]

function RenderMenuHeader(props) {
  const [indexItem, setIndexItem] = useState(0)
  const { selectedMenu, handleSelectedMenu } = props
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();


  const renderItem = ({ item , index}) => {
    const styles = {
      lottie: {
        height: 40,
        opacity: dark ? 0.8 : 1,
      },
      categoryHeader: {
        marginRight: margin, flexDirection: 'row', alignItems: 'center',
      },
      categoryHeaderContent: {
        color: selectedMenu == item.id ? '#673AB7' : '#64676D'
      }
    }

   
    return (
      <TouchableOpacity style={styles.categoryHeader} onPress={()=>{handleSelectedMenu(item.id); setIndexItem(index)}}>
        <LottieViewAnimated autoPlay loop style={styles.lottie} source={item.icon} />
        <Text style={{color: index == indexItem ? '#673AB7' : '#64676D', fontWeight: index == indexItem ? '600' : '300' }}>{item.categoryName}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={menuHeader}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
      />
    </View>
  )
}





function RankingScreen({ navigation }) {
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const { books } = useBooksState();

  const arrayBookSearch = useSelector(state => state.BookReducer.arrayBookSearch)
  // console.log("🚀 ~ file: Ranking.jsx ~ line 188 ~ RankingScreen ~ arrayBookSearch", arrayBookSearch[0]?.genres)
  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);

  const [selectedMenu, setSelectedMenu] = React.useState('hot');

  const dispatch = useDispatch();

  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });


  const handleSelectedMenu = (item = 'hot') => {
    // console.log("🚀 ~ file: Ranking.jsx ~ line 208 ~ handleSelectedMenu ~ item", item)

    // setSelectedMenu(item);
    const data = {
      type: "search",
      sort: item
    }
    dispatch(Action.book.searchBook(data))
  }
  useEffect(() => {
    const data = {
      type: "search",
      sort: "hot"
    }
    dispatch(Action.book.searchBook(data))
  }, [])


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
      justifyContent: 'flex-end',
      backgroundColor: colors.background,
      height: interpolate(scrollY.value, [-HEADER, 0], [HEADER * 2, HEADER], 'clamp'),
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
      height: 300,
      opacity: dark ? 0.8 : 1,
    },
    lottieProps: useAnimatedProps(() => ({
      speed: 0.5,
      autoPlay: true,
    })),
    searchInput: useAnimatedStyle(() => ({
      marginTop: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [-50, 550], 'clamp'),
      marginHorizontal: margin / 2,
      paddingHorizontal: margin / 2,
      alignItems: 'center', justifyContent: 'center',
      marginBottom: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [-25, 6], 'clamp'),
      height: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [50, 38], 'clamp'),
      width: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [width - margin * 2, width - margin], 'clamp'),
    })),
    searchIcon: {
      width: 30,
      opacity: 0.3,
    },
    searchText: {
      height: 38,
      width: '100%',
      opacity: 0.25,
      lineHeight: 38,
      fontSize: 15,
    },
    scrollView: {
      paddingTop: HEADER,
    },
  };

  return (
    <Animated.View onLayout={onLayout} style={styles.screen}>
      <Animated.View style={styles.header}>
        <Animated.View style={styles.logo}>
          <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={require('../anims/statistics.json')} />
        </Animated.View>
        <Pressable>
          <SharedElement id="search">
            <Animated.View size={15} style={styles.searchInput}>
              <RenderMenuHeader selectedMenu={selectedMenu} handleSelectedMenu={handleSelectedMenu} />
            </Animated.View>
          </SharedElement>
        </Pressable>
      </Animated.View>

      <Animated.ScrollView contentContainerStyle={styles.scrollView} scrollEventThrottle={1} onScroll={scrollHandler}>
       <ListVertical data ={arrayBookSearch}/>
      </Animated.ScrollView>
    </Animated.View>
  );
}

export default memo(RankingScreen);
