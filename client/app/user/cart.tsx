import { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { GetUserId } from "../../lib/helpers";
import { supabase } from "../../lib/supabase";

export default function Cart() {
  // get the items in cart by user id
  const getCartItems = async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", await GetUserId());
    if (error) Alert.alert(error.message);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
}
