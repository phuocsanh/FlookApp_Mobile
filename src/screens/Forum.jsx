import React, { memo, useEffect, useState, useRef } from 'react';
import { useBooksState } from '../BookStore';
import { View, Pressable, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { getGreeting } from '../functions/globalFunc';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Text from '../components/Text';
import BookList from '../components/BookList';

import { StoryGenreData } from '../constants/storyGenreData';
import mocks from '../mocks';
import axios from 'axios';

import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

const developing = require('../anims/developing.json');
const welcome = require('../anims/welcome.json');
const welcome1 = require('../anims/welcome1.json');

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import screenName from '../constants/screenName';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../Store/Actions/constants';
import Action from '../Store/Actions';






function Forum({ navigation }) {
    const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
    const HEADER = normalize(300, 400);
    const scrollY = useSharedValue(0);
    const loaded = useSharedValue(0);

    const forumRef = useRef(true)
    // useEffect(() => {
    //     return ()=>{
    //         console.log("end");
    //         forumRef.current = false
    //     }
    // }, [])
      
    // fade in screen, slowly if light mode is on
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
            height:'70%',
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
        <Animated.View ref={forumRef} onLayout={onLayout} style={styles.screen}>
            <Animated.View style={styles.header}>
                <Animated.View style={styles.logo}>
                    <LottieViewAnimated style={styles.lottie} animatedProps={styles.lottieProps} source={developing} />
                </Animated.View>  
                <Text>DEVELOPING...</Text>
            </Animated.View>  
        </Animated.View>
    );
}

// export default memo(Home);
export default Forum;
