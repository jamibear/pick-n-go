import { useState } from "react";
import { Text, FlatList, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { categories } from "./constants";

const CategorySelector = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleClick = (ctg) => {
		if (selectedCategories.includes(ctg.category)) {
			setSelectedCategories(
				selectedCategories.filter((c) => c !== ctg.category)
			);
		} else {
			setSelectedCategories([...selectedCategories, ctg.category]);
		}
	};

	return (
		<View>
			<FlatList
				data={categories}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {

				<TouchableOpacity
					style={
						selectedCategories.includes(item.category)
							? tw`bg-green-500 p-3 text-white rounded-full`
							: tw`border-green-500 border-[1px] rounded-full`
					}
					onPress={() => handleClick(item)}
				>
					<Text>{item.category}</Text>
				</TouchableOpacity>
			}}

		/>
		</View>
	);
};

export default CategorySelector;
