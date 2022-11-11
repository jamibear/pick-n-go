import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { GetUserId } from "../../lib/helpers";
import { supabase } from "../../lib/supabase";
import CartItemCard from "../../components/CartItemCard";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      cart_id: 0,
      prd_id: "",
      prd_price: 0,
      prd_quantity: 1,
      prd_title: "",
      prd_img_url: "",
    },
  ]);

  // get the items in cart by user id
  const getCartItems = async () => {
    const { data, error } = await supabase.rpc("getmycartitems");
    if (error) Alert.alert(error.message);
    setCart(data);
  };

  useEffect(() => {
    getCartItems();
  }, [cart]);

  return (
    <FlatList
      data={cart}
      renderItem={({ item }) => (
        <CartItemCard
          cart_id={item.cart_id}
          product_id={item.prd_id}
          title={item.prd_title}
          price={item.prd_price}
          quantity={item.prd_quantity}
			 thumbnail={item.prd_img_url}
        />
      )}
    />
  );
}
