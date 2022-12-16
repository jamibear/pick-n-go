import { GetUserId } from "../lib/helpers";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";

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
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        flexDirection: "row",
      }}
    >
      <Image
        source={thumbnail ? { uri: thumbnail } : null}
        style={{ width: 50, height: 50 }}
      />
      <View style={tw`mx-3`}>
        <Text style={tw`text-lg`}>{title}</Text>
        <Text style={tw`font-bold`}>P{price}</Text>

        <View
          style={tw`mt-3 w-18 p-1 flex-row items-start rounded-full border-[1px] border-gray-500`}
        >
          <TouchableOpacity
            style={{
              flexGrow: 1,
            }}
            onPress={() => updateQty("-")}
          >
            <Text style={tw`text-center`}>-</Text>
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity
            style={{
              flexGrow: 1,
            }}
            onPress={() => updateQty("+")}
          >
            <Text style={tw`text-center`}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
