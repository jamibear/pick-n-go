import { useEffect, useRef, useState } from "react";
import {
	Platform,
	Text,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	TextInput,
	Alert,
	TouchableOpacity,
	FlatList,
} from "react-native";
import ChatHeader from "../../components/chat/ChatHeader";
import { Ionicons } from "@expo/vector-icons";
import { GetUserId } from "../../lib/helpers";
import { supabase } from "../../lib/supabase";

export default function Page({ route }) {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			from_id: "",
			to_id: "",
			message: "",
			created_at: "",
		},
	]);

	const sendMessage = async () => {
		const { data, error } = await supabase.from("chat").insert([
			{
				from_id: await GetUserId(),
				to_id: route.params.id,
				message: message,
				connection: [await GetUserId(), route.params.id],
			},
		]);
		if (error) Alert.alert(error.message);
	};

	const getMessages = async () => {
		const { data, error } = await supabase
			.from("chat")
			.select("*")
			.containedBy("connection", [await GetUserId(), route.params.id]);
		setMessages(data);
	};

	useEffect(() => {
		getMessages();
	}, [messages]);

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={100}
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={styles.container}
		>
			<ChatHeader id={route.params.id} />
			<FlatList
				contentContainerStyle={{ paddingTop: 77 }}
				inverted
				data={[...messages].reverse()}
				renderItem={({ item }) => (
					<View>
						<Text
							style={{
								backgroundColor: "white",
								padding: 9,
								maxWidth: 215,
								margin: 6,
								alignSelf:
									item.from_id === route.params.id ? "flex-start" : "flex-end",
								fontSize: 17,
								borderRadius: 9,
							}}
						>
							{item.message}
						</Text>
					</View>
				)}
			/>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					height: 70,
					backgroundColor: "#aaffaa",
					position: "absolute",
					alignContent: "center",
					justifyContent: "center",
					bottom: 0,
				}}
			>
				<TextInput
					editable
					placeholder="send a message"
					style={{
						flex: 1,
						backgroundColor: "white",
						padding: 6,
						paddingHorizontal: 12,
						margin: 9,
						color: "black",
						borderRadius: 30,
					}}
					onChangeText={(text) => setMessage(text)}
				/>
				<TouchableOpacity
					onPress={sendMessage}
					style={{ marginRight: 9, alignSelf: "center" }}
				>
					<Ionicons name="send" size={35} color="#306030" />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#c0eec0",
	},
	inner: {
		padding: 24,
		flex: 1,
		justifyContent: "space-around",
	},
	header: {
		fontSize: 36,
		marginBottom: 48,
	},
	textInput: {
		height: 40,
		borderColor: "#000000",
		borderBottomWidth: 1,
		marginBottom: 36,
	},
	btnContainer: {
		backgroundColor: "white",
		marginTop: 12,
	},
});
