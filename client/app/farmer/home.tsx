import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Page() {
	const [user, setUser] = useState({
		full_name: "",
		avatar_url: "",
		id: "",
		username: "",
		bio: "",
		website: "",
		user_role: "",
		updated_at: "",
	});
	// get the userId from supabse session
	const getData = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return user?.id;
	};

	// get the user account info by id
	const getUser = async () => {
		const { data } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", await getData());
		setUser(data![0]);
	};

	useEffect(() => {
		getUser();
	}, []);
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View
				style={{
					marginHorizontal: 15,
					marginTop: 15,
				}}
			>
				<Text style={{ fontWeight: "bold", fontSize: 21 }}>
					Welcome, {user.username}
				</Text>
			</View>
			<View
				style={{
					padding: 21,
					marginHorizontal: 15,
					marginTop: 15,
					height: 200,
					backgroundColor: "#6969c9",
					borderRadius: 15,
				}}
			>
				<Text style={{ fontWeight: "bold", fontSize: 21, color: "white" }}>
					P0 in total sales
				</Text>
			</View>
			<View
				style={{
					padding: 21,
					marginHorizontal: 15,
					marginTop: 15,
					height: 200,
					backgroundColor: "#69c969",
					borderRadius: 15,
				}}
			>
				<Text style={{ fontWeight: "bold", fontSize: 21, color: "white" }}>
					0 products shipped
				</Text>
			</View>
		</View>
	);
}
