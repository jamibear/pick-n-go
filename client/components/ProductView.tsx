import { Image, Alert, Text, View } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/base";
import { supabase } from "../lib/supabase";
import { GetUserId } from "../lib/helpers";

export default function ProductView({ id, title, desc, price, variant, img }) {
  const [loading, setLoading] = useState(false);

  const incrementCart = async () => {
    const { error } = await supabase.rpc("increment_cart", {
      x: 1,
      ppp: id,
      uuu: await GetUserId(),
    });
    error ? Alert.alert(error.message) : Alert.alert("Added item to cart!");
  };

  const addToCart = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("cart")
      .insert({ user_id: await GetUserId(), product_id: id, price: price });
    error ? incrementCart() : Alert.alert("Item added to cart");
    setLoading(false);
  };

  return (
    <View>
      <Image style={{ width: "100%", minHeight: 350 }} source={{ uri: img }} />
      <Text>{title}</Text>
      <Text>{desc}</Text>
      <Text>{price}</Text>
      <Text>{variant}</Text>
      <Button title="Add to cart" loading={loading} onPress={addToCart} />
    </View>
  );
}
