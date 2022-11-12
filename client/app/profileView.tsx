import { Text, View, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import ViewFarmerProfile from "../components/ViewFarmerProfile";
import ProductCard from "../components/ProductCard";

export default function profileView({ route }) {
  const [user, setUser] = useState([
    {
      full_name: "",
      avatar_url: "",
      id: "",
      username: "",
      bio: "",
      website: "",
      user_role: "",
      updated_at: "",
    },
  ]);
  const [items, setItems] = useState([
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

  // get the user account info by id
  const getUser = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", route.params.id);
    setUser(data!);
  };

  // get farmer's products
  const getProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", route.params.id);
    setItems(data!);
  };

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  return (
    <View>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ViewFarmerProfile
            id={item.id}
            name={item.full_name}
            username={item.username}
            bio={item.bio}
            avatar={item.avatar_url}
          />
        )}
      />
      <Text
        style={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#efefef",
          padding: 10,
          fontSize: 18,
        }}
      >
        Products
      </Text>
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
