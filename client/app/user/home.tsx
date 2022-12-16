import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Product } from "../../typings";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { categories } from "../../constants";

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

  return (
    <View>
      <Text>Browse Products</Text>

      {/* ----- CATEGORIES ----- */}
      <FlatList
        data={categories}
        numColumns={5}
        renderItem={({ item }) => (
          <CategoryCard category={item.category} icon={item.icon} />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* ----- PRODUCT LIST ----- */}
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
