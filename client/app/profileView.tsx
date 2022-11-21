import { Text, View, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import ViewFarmerProfile from "../components/ViewFarmerProfile";
import ProductCard from "../components/ProductCard";

export default function profileView({ route }) {
  const [user, setUser] = useState({
    full_name: "",
    avatar_url: "",
    id: "",
    username: "",
    bio: "",
    website: "",
    user_role: "",
    updated_at: "",
  });
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
    setUser(data![0]);
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
    <>
      <ViewFarmerProfile
        id={user.id}
        name={user.full_name}
        username={user.username}
        bio={user.bio}
        avatar={user.avatar_url}
      />
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
    </>
  );
}
