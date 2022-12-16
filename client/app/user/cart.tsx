import { useEffect, useState } from "react";
import {
  Modal,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { GetUserId } from "../../lib/helpers";
import { supabase } from "../../lib/supabase";
import CartItemCard from "../../components/CartItemCard";
import { Button } from "@rneui/base";
import tw from "twrnc";

function randomString() {
  // Generate a random number between 0 and the maximum value that can be represented by 16 bits
  const randomNumber = Math.floor(Math.random() * Math.pow(2, 16));

  // Convert the random number to a hexadecimal string
  const randomHex = randomNumber.toString(16);

  // Pad the string with leading zeros if necessary to ensure it has 16 characters
  const randomString = randomHex.padStart(16, "0");

  return randomString;
}

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState([
    {
      cart_id: 0,
      prd_id: "",
      prd_price: 0,
      prd_quantity: 1,
      prd_title: "",
      prd_img_url: "",
      prd_farm_id: "",
    },
  ]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  // get the items in cart by user id
  const getCartItems = async () => {
    const { data, error } = await supabase.rpc("getmycartitems");
    if (error) Alert.alert(error.message);
    setCart(data);
  };

  useEffect(() => {
    getCartItems();
  }, [cart]);

  const computeTotal = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice = totalPrice + item.prd_quantity * item.prd_price;
    }
    setTotalPrice(totalPrice);
  };

  const proceedCheckOut = async () => {
    setLoading(true);
    const order_name = randomString();
    const userId = await getUser();
    const products = [];
    let total = 0;
    for (const item of cart) {
      products.push({
        item_id: item.prd_id,
        name: item.prd_title,
        quantity: item.prd_quantity,
        price: item.prd_price,
      });
      total = item.prd_quantity * item.prd_price + total;
    }

    const { error } = await supabase.from("order_details").insert([
      {
        user_id: userId,
        item_id: products,
        farm_id: cart[0].prd_farm_id,
        order_name: order_name,
        total: total,
        status: "pending",
      },
    ]);
    error
      ? Alert.alert(error.message)
      : Alert.alert("Order is successfully created");

    const deleteCart = async () => {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", userId);
      if (error) Alert.alert(error.message);
      setLoading(false);
    };

    deleteCart();
          setModalVisible(!modalVisible);
  };

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
        onPress={() => {
          setModalVisible(true);
          computeTotal();
        }}
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
            height: 200,
            padding: 30,
          }}
        >
          <Text style={tw`text-xl`}>Your Items</Text>
          <FlatList
            style={tw`p-3`}
            data={cart}
            renderItem={({ item }) => (
              <>
                <Image
                  source={item.prd_img_url ? { uri: item.prd_img_url } : null}
                  style={tw`h-10 w-10`}
                />
                <Text>{item.prd_title}</Text>
                <Text>x{item.prd_quantity}</Text>
                <Text style={tw`font-bold pb-3 border-b border-gray-300 mb-2`}>
                  P{item.prd_price}
                </Text>
              </>
            )}
          />
          <Text style={tw`font-bold text-2xl`}>Total: P{totalPrice}</Text>

          <Button
            title="Confirm Checkout"
            buttonStyle={{
              backgroundColor: "rgba(78, 116, 289, 1)",
              borderRadius: 3,
              alignSelf: "center",
            }}
            containerStyle={{
              marginVertical: 10,
              alignSelf: "center",
            }}
            loading={loading}
            disabled={loading}
            onPress={proceedCheckOut}
          />
        </View>
      </Modal>
    </>
  );
}
