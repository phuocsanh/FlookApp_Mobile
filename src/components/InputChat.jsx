import React, { useState, useEffect, useRef, memo } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform,
	TouchableOpacity,
	Keyboard,
} from "react-native";

import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { setContext } from "redux-saga/effects";
// import EmojiPicker from "./emojis/EmojiPicker";

// import { useKeyboard } from "@react-native-community/hooks";

// import { theme } from "../../theme";
import { useDispatch } from "react-redux";
import Action from "../Store/Actions";

const ChatInput = ({ebookId,setMessage, message, reply, closeReply, isLeft, username, onFocusHandler, inputRef, handleShowInput, sendComment}) => {
	// const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const height = useSharedValue(70);
	const [keyboardOffset, setKeyboardOffset] = useState(0);
	const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
	const onKeyboardHide = () => setKeyboardOffset(0);
	const keyboardDidShowListener = useRef();
	const keyboardDidHideListener = useRef();
	const dispatch = useDispatch()

	useEffect(() => {
		keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
		keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

		return () => {
			keyboardDidShowListener.current.remove();
			keyboardDidHideListener.current.remove();
		};
	}, []);

	useEffect(() => {
		if (showEmojiPicker) {
			height.value = withTiming(400);
		} else {
			height.value = reply ? withSpring(130) : withSpring(70);
		}
	}, [showEmojiPicker]);

	useEffect(() => {
		if (reply) {
			height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
		} else {
			height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
		}
	}, [reply]);

	const heightAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: height.value
		}
	})

	
	return (
		<Animated.View style={[styles.container, heightAnimatedStyle]}>
			{reply ? (
				<View style={styles.replyContainer}>
					<TouchableOpacity
						onPress={closeReply}
						style={styles.closeReply}
					>
						<Icon name="close" color="#000" size={20} />
					</TouchableOpacity>
					<Text style={styles.title}>
						Response to {isLeft ? username : "Me"}
					</Text>
					<Text style={styles.reply}>{reply}</Text>
				</View>
			) : null}
			<View style={styles.innerContainer}>
				<View style={styles.inputAndMicrophone}>
					<TouchableOpacity
						style={styles.emoticonButton}
						onPress={() => setShowEmojiPicker((value) => !value)}
					>
						<Icon
							name={
								showEmojiPicker ? "close" : "emoticon-outline"
							}
							size={23}
							color={'#9f9f9f'}
						/>
					</TouchableOpacity>
					<TextInput
			
						multiline
						placeholder={"Type something..."}
						style={[styles.input, { position: 'relative', width: '100%', bottom: keyboardOffset }]}
						value={message}
						autoFocus={true}
						onFocus={onFocusHandler}
						ref={inputRef}
						onSubmitEditing={Keyboard.dismiss}
						onChangeText={(text) => setMessage(text)}
					/>
					<TouchableOpacity style={styles.rightIconButtonStyle}>
						<Icon
							name="paperclip"
							size={23}
							color={'#9f9f9f'}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.rightIconButtonStyle} onPress={() => handleShowInput(false,false)}>
						<Icon
							name="close"
							size={23}
							color={'#9f9f9f'}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.sendButton}
				onPress={()=>{sendComment()
				setMessage('')}}
				>
					<Icon
						name={"send"}
						size={23}
						color={'#FFF'}
					/>
				</TouchableOpacity>
			</View>
			{/* <EmojiPicker /> */}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {

		justifyContent: "center",
		backgroundColor: '#FFF',
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: '#f0f0f0',
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: '#000',
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",

	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	},
	swipeToCancelView: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 30,
	},
	swipeText: {
		color: '#9f9f9f',
		fontSize: 15,
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	recordingActive: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
	},
	recordingTime: {
		color: '#9f9f9f',
		fontSize: 20,
		marginLeft: 5,
	},
	microphoneAndLock: {
		alignItems: "center",
		justifyContent: "flex-end",
	},
	lockView: {
		backgroundColor: "#eee",
		width: 60,
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: 130,
		paddingTop: 20,
	},
	sendButton: {
		backgroundColor: '#003153',
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ChatInput;
