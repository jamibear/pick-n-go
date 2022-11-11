import { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, Text } from "react-native";
import { supabase } from "../../../lib/supabase";
import { Product } from "typings";
import ProductView from "../../../components/ProductView";

export default function ProductInfo({ route }) {
  const [item, setItem] = useState<Product[]>([
    {
      id: "",
		user_id: "",
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
        <ProductView
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
