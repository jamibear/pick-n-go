import { useLink } from "expo-router";
import { Image, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

type Category = {
  icon: string;
  category: string;
};

export default function CategoryCard({ icon, category }: Category) {
  const link = useLink();

  return (
    <TouchableOpacity
      onPress={() =>
        link.push({
          pathname: "user/category/[category]",
          params: { category: category },
        })
      }
      style={tw`w-1/5 my-3 flex items-center`}
    >
      <View style={tw`m-1 bg-gray-200 rounded-full`}>
        <Image
          source={icon ? { uri: icon } : null}
          style={tw`w-15 h-15 rounded-full`}
        />
      </View>
      <Text style={tw`text-[10px] font-bold text-gray-500 text-center`}>
        {category}
      </Text>
    </TouchableOpacity>
  );
}
