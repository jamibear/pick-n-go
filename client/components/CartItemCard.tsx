import { GetUserId } from "../lib/helpers";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";

type CartProps = {
  cart_id: number;
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

export default function CardItemCard({
  cart_id,
  product_id,
  title,
  price,
  quantity,
  thumbnail,
}: CartProps) {
  const deleteItemFromCart = async () => {
    const { error } = await supabase.from("cart").delete().eq("id", cart_id);
    error ? Alert.alert(error.message) : Alert.alert("item deleted from cart");
  };

  const updateQty = async (counter: string) => {
    if (counter === "+") {
      quantity++;
    } else {
      quantity > 1 ? quantity-- : deleteItemFromCart();
    }
    const { error } = await supabase
      .from("cart")
      .update({ quantity: quantity })
      .eq("id", cart_id);
    if (error) Alert.alert(error.message);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
      }}
    >
      <Image source={{ uri: thumbnail }} style={{ width: 35, height: 35 }} />
      <Text>{title}</Text>
      <Text>{price}</Text>
      <Text>{quantity}</Text>
      <TouchableOpacity
        style={{
          padding: 3,
          backgroundColor: "#efefef",
        }}
        onPress={() => updateQty("-")}
      >
        <Text>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 3,
          backgroundColor: "#efefef",
        }}
        onPress={() => updateQty("+")}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}
