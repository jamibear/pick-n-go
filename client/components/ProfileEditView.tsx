import { Alert, SafeAreaView, Text, View } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/base";
import { supabase } from "../lib/supabase"

export default function ProfileEditView({
	id,
	avatar,
	fullname,
	username,
	bio,
}) {
	const [loading, setLoading] = useState(false);
	const [newName, setNewName] = useState(fullname);
	const [newUsername, setNewUsername] = useState(username);
	const [newBio, setNewBio] = useState(bio);

	const saveChanges = async () => {
		setLoading(true)
		const { error } = await supabase.from('profiles').update({
			full_name: newName,
			username: newUsername,
			bio: newBio,
		}).eq('id', id)
		error ? Alert.alert(error.message) : Alert.alert("Updated changes successfully")
		setLoading(false)
	}

	return (
		<SafeAreaView>
			<Input
				label="Full Name"
				onChangeText={(text) => setNewName(text)}
				value={newName}
				autoCapitalize={"none"}
			/>
			<Input
				label="@username"
				onChangeText={(text) => setNewUsername(text)}
				value={newUsername}
				autoCapitalize={"none"}
			/>
			<Input
				label="Bio"
				onChangeText={(text) => setNewBio(text)}
				value={newBio}
				autoCapitalize={"none"}
			/>
			<Button
				title={"SAVE CHANGES"}
				containerStyle={{
					width: 200,
					marginHorizontal: 50,
					marginVertical: 10,
				}}
				loading={loading}
				onPress={saveChanges}
			/>
		</SafeAreaView>
	);
}
