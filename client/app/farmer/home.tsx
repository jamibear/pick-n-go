import { Alert, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import tw from "twrnc";

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
	const [stats, setStats] = useState({
		total_sales: 0,
		shipments: 0,
		total_products: 0,
	});

	// get the userId from supabse session
	const getData = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return user?.id;
	};

	const farmerSales = supabase.channel('farmer_sales')
		.on(
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'farmer_sales' },
			(payload) => {
				console.log('Change received!', payload)
			}
		)
		.subscribe()

	const getStats = async () => {
		const { data, error } = await supabase
			.from("farmer_sales")
			.select()
			.eq("farm_id", await getData());
		error ? Alert.alert(error.message) : setStats(data[0]);
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
		getStats();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
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
				<Text style={tw`font-bold text-4xl text-white`}>
					P{stats.total_sales}
				</Text>
				<Text style={{ fontSize: 21, color: "white" }}>in total sales</Text>
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
				<Text style={tw`font-bold text-4xl text-white`}>{stats.shipments}</Text>
				<Text style={{ fontSize: 21, color: "white" }}>products shipped</Text>
			</View>
			<View
				style={{
					padding: 21,
					marginHorizontal: 15,
					marginTop: 15,
					height: 200,
					backgroundColor: "#c9c969",
					borderRadius: 15,
				}}
			>
				<Text style={tw`font-bold text-4xl text-white`}>
					{stats.total_products}
				</Text>
				<Text style={{ fontSize: 21, color: "white" }}>products listed</Text>
			</View>
		</View>
	);
}
