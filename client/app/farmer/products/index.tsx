import { supabase } from "../../../lib/supabase";
import {
  List,
  Alert,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLink } from "expo-router";
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
  const link = useLink();
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
    getData();
  }, [items]);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{ padding: 21, backgroundColor: "#4cbb17" }}
        onPress={() => link.push("/farmer/products/add")}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
        >
          [+] Add New Product
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          borderBottomColor: "#eeeeee",
          borderBottomWidth: 1,
          padding: 21,
          fontSize: 15,
          backgroundColor: "white",
        }}
      >
        My Products
      </Text>
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
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </SafeAreaView>
  );
}
