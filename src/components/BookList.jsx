import React from 'react';
import {
  View, StyleSheet, FlatList, Pressable, TouchableOpacity,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useTheme, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Text from './Text';
import Book from './Book';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// horizontal flatlist of books
function BookList({ books, title, tokenUser, screen }) {
  
 
  const { width, margin, colors } = useTheme();
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);

  // handle horizontal scroll
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollX.value = contentOffset.x;
    },
  });

  // go to search screen
  const searchScreen = () => {
    navigation.push('BookSearch');
  };

  // all styles
  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.card,
      paddingTop: (title === 'Reading' ? margin : 0),
    },
    heading: {
      paddingTop: margin,
      paddingHorizontal: margin,
      flexDirection: 'row',
      justifyContent: 'space-between',
    
    },
    listContainer: {
      padding: margin,
    },
    emptyContainer: {
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: width - margin * 2,
      paddingVertical: 10,
      backgroundColor: colors.background,
    },
    emptyText: {
      padding: margin,
    },
  });

  // empty list placeholder
  const EmptyList = () => (
    <Pressable onPress={searchScreen} style={styles.emptyContainer}>
      <AntDesign color={colors.text} size={27} name="book" />
      
      <Text size={16} center style={styles.emptyText}>
        {  tokenUser  === '' && 'Bạn cần đăng nhập để xem nội dung này' }
      </Text>
    </Pressable>
  );

  // render book list
  return (
    <View style={styles.list}>
      <View style={styles.heading}>
        <View style={{borderLeftColor: '#673AB7',borderLeftWidth: 5, paddingLeft: 5}}>
        <Text size={17} bold>{title}</Text>
        </View>
        {
          screen &&  <TouchableOpacity testID='touch-see-more' onPress={()=> screen && navigation.navigate(screen)}>
          <Text size={14}>see more</Text>
          </TouchableOpacity>
        }
     
      </View>
      { books.length > 0 &&
       <AnimatedFlatList
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={books}
        keyExtractor={(i) => i._id}
        renderItem={({ item, index }) => (
        
          <Pressable testID='choose-book'>
            <Book book={item} index={index} scrollX={scrollX} />
          </Pressable>
        )}
        ListEmptyComponent={<EmptyList />}
      /> }
      
    </View>
  );
}

export default React.memo(BookList);
