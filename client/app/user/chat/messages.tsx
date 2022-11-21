import { supabase } from "../../../lib/supabase";
import { View, Text, Alert } from "react-native";
import { GetUserId } from "../../../lib/helpers"
import { useEffect, useState } from 'react'

export default function Messages() {
	const [userMessages, setUserMessages] = useState([{
		from_id: "",
		to_id: "",
		message: "",
		created_at: ""
	}])

	const getUserMessages = async () => {
		const { data, error } = await supabase.from('chat').select('*').contains('connection', [await GetUserId()])
		if (error) Alert.alert(error.message)
		setUserMessages(data)
	}

	useEffect(() => {
		getUserMessages()
	}, [])

	return (
		<View>
			<Text>Messages</Text>
			<Text>{userMessages[0].from_id && JSON.stringify(userMessages)}</Text>

		</View>
	);
}
