import { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, Text } from "react-native";
import { supabase } from "../../../lib/supabase";
import { Product } from "typings";
import ProductEditView from "../../../components/ProductEditView";

export default function ProductInfo({ route }) {
	const [item, setItem] = useState<Product[]>([
		{
			id: "",
			title: "",
			description: "",
			price: 0,
			variant: "",
			sold: 0,
			img_url: "",
			created_at: "",
		},
	]);

	const getData = async () => {
		const { data } = await supabase
			.from("products")
			.select("*")
			.eq("id", route.params.id);
		setItem(data!);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<FlatList
			data={item}
			renderItem={({ item }) => (
				<ProductEditView
					id={item.id}
					title={item.title}
					desc={item.description}
					price={item.price}
					variant={item.variant}
					img={item.img_url}
				/>
			)}
		/>
	);
}
