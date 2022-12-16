import { View, FlatList, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Product } from "../../typings";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { categories } from "../../constants";
import tw from "twrnc";

export default function Page() {
  const [items, setItems] = useState<Product[]>([
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
    const { data } = await supabase.from("products").select("*");
    setItems(data!);
  };

  useEffect(() => {
    getData();
  }, [items]);

  const ProductSection = () => {
    return (
      <View style={tw`py-3 pt-6 `}>
        <Text style={tw`pt-3 text-gray-500 border-t border-gray-200 text-xl`}>
          Products for you
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <FlatList
          style={tw`bg-white p-3`}
          data={categories}
          numColumns={5}
          renderItem={({ item }) => (
            <CategoryCard category={item.category} icon={item.icon} />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<ProductSection />}
        />
      }
      data={items}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard
          id={item.id}
          title={item.title}
          price={item.price}
          variant={item.variant}
          img_url={item.img_url}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
