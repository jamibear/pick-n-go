import { supabase } from "../../../lib/supabase";
import {
  List,
  Alert,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import InventoryCard from "../../../components/InventoryCard";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  variant: string;
  sold: number;
  img_url: string;
  created_at: string;
};

export default function Page() {
  const [items, setItems] = useState<Product[]>([]);

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  const getData = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", await getUserId());
    setItems(data!);
  };

  useEffect(() => {
    setItems([
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
    getData();
  }, []);

  return (
    <SafeAreaView>
      <Link href="/farmer/products/add">Add new product</Link>
      <Text>My Products</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <InventoryCard
            id={item.id}
            title={item.title}
            price={item.price}
            sold={item.sold}
            img_url={item.img_url}
            getData={getData}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
