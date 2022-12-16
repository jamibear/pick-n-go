import { Stack } from "expo-router";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import  ProductCard  from "components/ProductCard";

export default function Query({ route }) {
  const { query } = route.params;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([
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
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select()
      .textSearch("title", query);

    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading ? (
        <FlatList
          data={products}
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
      ) : (
        <ActivityIndicator size="large" color="gray" />
      )}
    </>
  );
}
