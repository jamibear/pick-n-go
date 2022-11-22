import { Image, Alert, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/base";
import { supabase } from "../lib/supabase";
import { GetUserId } from "../lib/helpers";
import { useLink } from "expo-router";

type ProductViewProps = {
  prd_id: string;
  prd_img: string;
  prd_title: string;
  prd_desc: string;
  prd_price: number;
  prd_variant: string;
  prf_id: string;
  prf_username: string;
  prf_pic: string;
};
export default function ProductView({
  prd_id,
  prd_img,
  prd_title,
  prd_desc,
  prd_price,
  prd_variant,
  prf_id,
  prf_username,
  prf_pic,
}: ProductViewProps) {
  const [loading, setLoading] = useState(false);

  const link = useLink();
  const incrementCart = async () => {
    const { error } = await supabase.rpc("increment_cart", {
      x: 1,
      ppp: prd_id,
      uuu: await GetUserId(),
    });
    error ? Alert.alert(error.message) : Alert.alert("Added item to cart!");
  };

  const addToCart = async () => {
    setLoading(true);
    const { error } = await supabase.from("cart").insert({
      user_id: await GetUserId(),
      product_id: prd_id,
      price: prd_price,
    });
    error ? incrementCart() : Alert.alert("Item added to cart");
    setLoading(false);
  };

  return (
    <View>
      <Image
        style={{ width: "100%", minHeight: 350 }}
        source={prd_img ? { uri: prd_img } : null}
      />
      <Text>{prd_title}</Text>
      <Text>{prd_price}/prd_variant</Text>
      <Text>{prd_desc}</Text>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        onPress={() =>
          link.push({ pathname: "profileView", params: { id: prf_id } })
        }
      >
        <Image
          style={{ borderRadius: 99, width: 35, height: 35 }}
          source={prf_pic ? { uri: prf_pic } : null}
        />
        <Text style={{ fontWeight: "bold" }}>@{prf_username}</Text>
      </TouchableOpacity>
      <Button title="Add to cart" loading={loading} onPress={addToCart} />
    </View>
  );
}
