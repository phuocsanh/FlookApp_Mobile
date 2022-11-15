import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Animated, { interpolate, Extrapolate, withTiming, useSharedValue, useAnimatedScrollHandler, useAnimatedStyle } from 'react-native-reanimated';
import SearchBook from './SearchBook';
const logintowatch = require('../anims/logintowatch.json');

const BookListHorizontal = ({ books }) => {

    const [bookList, setBookList] = useState([])
    const scrollY = useSharedValue(0);
    const loaded = useSharedValue(0);
    const {
        colors, height, margin, status, navbar,
    } = useTheme();
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    const onLayout = () => {
        loaded.value = withTiming(1);
    };

    const anims = {
        scrollView: useAnimatedStyle(() => ({
            opacity: interpolate(loaded.value, [0, 1], [0, 1], Extrapolate.CLAMP),
            transform: [
                { translateY: interpolate(loaded.value, [0, 1], [50, 0], Extrapolate.CLAMP) },
            ],
        })),
    };
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background,

        },
        placeholderBox: {
            alignItems: 'center',
            marginTop: "40%",
            justifyContent: 'center',
        },
        placeholderImg: {
            opacity: 0.95,
            height: height / 3.5,
            marginBottom: margin,
        },
        placeholderText: {
            fontSize: 15,
            paddingHorizontal: margin * 3,
        },
        scrollContainer: {
            flex: 1,

            padding: margin,
        },
        viewInput: {
            padding: 12,
            alignSelf: 'center',
            flexDirection: 'row',
            
            
          },
          gotoLogin: {
            color: 'purple',
            paddingLeft: 5,
            marginLeft:10,
            textDecorationLine: 'underline',
            flexDirection:"row",
            alignSelf:'flex-end'
          },
    });

    const PlaceHolder = () => (
        <View style={styles.placeholderBox}>
            <LottieView
                autoPlay
                loop={false}
                speed={0.8}
                source={logintowatch}
                style={styles.placeholderImg}
            />
            <View center style={styles.placeholderText}>
                <View style={styles.viewInput}>
                <Text >Bạn cần đăng nhập để xem lịch sử   
                    <Text>{'   '}</Text>
                    <Text style={styles.gotoLogin} onPress={{}}>Login</Text>
                </Text>
                
            </View>
            </View>
        </View>)

    return (
        <View onLayout={onLayout} style={styles.screen}>
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={1}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}
                style={anims.scrollView}
            >
                {!books.length && <PlaceHolder />}
                {books.map((book) => (
                    <Pressable
                        key={book.bookId}
                        onPress={() => bookDetails(book)}
                        onLongPress={() => editStatus(book)}
                    >
                        <SearchBook book={book} bookList={bookList} />
                    </Pressable>
                ))}
            </Animated.ScrollView>
        </View>
    )
}

export default BookListHorizontal

const styles = StyleSheet.create({})