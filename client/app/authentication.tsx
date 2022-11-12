import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ActivityIndicator, Text, View } from "react-native";
import Onboarding from "../components/Onboarding";
import { useLink } from "expo-router";

export default function Authentication({ navigation }) {
	const link = useLink();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState([
		{
			full_name: "",
			avatar_url: "",
			id: "",
			username: "",
			bio: "",
			website: "",
			user_role: "",
			updated_at: "",
		},
	]);
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
		setUser(data!);
		setLoading(false);
	};

	useEffect(() => {
		getData();
		getUser();
	}, []);

	const UserIsAuth = () => {
		if (!user[0].user_role || !user[0].username) {
			return <Onboarding />
		}
		return (
			<>
			{ navigation.push(user[0].user_role) }
			</>
		)
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
			}}
		>
			{loading ? (
				<ActivityIndicator size="large" color="#00ff00" />
			) : (
				<UserIsAuth />
			)}
		</View>
	);
}


//
// {user[0].username || user[0].user_role
//  		? navigation.push(user[0].user_role)
///			: !loading && <Onboarding /> }
