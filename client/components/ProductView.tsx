import { Image, Alert, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/base";
import { supabase } from "../lib/supabase";
import { GetUserId } from "../lib/helpers";
import { useLink } from "expo-router";
import tw from "twrnc";

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
    <View style={tw`flex-1 bg-white`}>
      <TouchableOpacity
        style={tw`flex-row items-center px-6`}
        onPress={() =>
          link.push({ pathname: "profileView", params: { id: prf_id } })
        }
      >
        <Image
          style={{ borderRadius: 99, width: 35, height: 35 }}
          source={{ uri: prf_pic }}
        />
        <Text style={tw`font-bold my-3`}>@{prf_username}</Text>
      </TouchableOpacity>
      <Image
        style={{ width: "100%", minHeight: 350 }}
        source={prd_img ? { uri: prd_img } : null}
      />
      <View style={tw`m-6`}>
        <Text style={tw`font-bold text-xl`}>{prd_title}</Text>
        <Text style={tw`text-xl pb-3 border-b-[1px] border-gray-300`}>
          P{prd_price}/{prd_variant}
        </Text>
        <Text style={tw`my-3 text-gray-500`}>Product Description:</Text>
        <Text style={tw`mb-3 text-gray-500`}>{prd_desc}</Text>
        <Button title="Add to cart" loading={loading} onPress={addToCart} color='#1a1a1a' />
      </View>
    </View>
  );
}
