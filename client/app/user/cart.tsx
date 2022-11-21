import { useEffect, useState } from "react";
import {
  Modal,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GetUserId } from "../../lib/helpers";
import { supabase } from "../../lib/supabase";
import CartItemCard from "../../components/CartItemCard";
import { Button } from "@rneui/base";

export default function Cart() {
  const [modalVisible, setModalVisible] = useState(false);
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
    <>
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

      <Button
        title="Checkout"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "flex-end",
            alignItems: "center",
            height: 200,
          }}
        >
          <Text>Your Items</Text>
          <Button
            title="Confirm Checkout"
            buttonStyle={{
              backgroundColor: "rgba(78, 116, 289, 1)",
              borderRadius: 3,
            }}
            containerStyle={{
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />
        </View>
      </Modal>
    </>
  );
}
