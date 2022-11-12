import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Product } from "../../typings";
import ProductCard from "../../components/ProductCard";

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
  });

  return (
    <View>
	 	<Text>Browse Products</Text>
      <FlatList
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
    </View>
  );
}
