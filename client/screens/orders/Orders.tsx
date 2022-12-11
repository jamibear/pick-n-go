import {
  FlatList,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";
import tw from "twrnc";

export default function Delivery() {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);

  const cancelOrder = async (id) => {
    const { error } = await supabase
      .from("order_details")
      .update({ status: "canceled" })
      .eq("id", id);
    if (error) Alert.alert(error.message);
  };

  const confirmOrder = async (id) => {
    const { error } = await supabase
      .from("order_details")
      .update({ status: "to ship" })
      .eq("id", id);
    if (error) Alert.alert(error.message);
  };

  const orderDetails = supabase
    .channel("public:order_list")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "order_details" },
      () => {
        fetchData();
      }
    )
    .subscribe();

  const userId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("order_list")
      .select()
      .eq("ord_farm_id", await userId())
      .eq("ord_status", "pending");

    error ? Alert.alert("error fetching order list") : setOrders(data);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [orders]);

  return (
    <>
      {!loading && Object.keys(orders).length !== 0 ? (
        <Text>{JSON.stringify(orders, 3, null)}</Text>
      ) : (
        <View style={tw`flex-1 justify-center`}>
          <Text style={tw`text-2xl font-bold text-gray-300 text-center`}>
            You have no orders currently on pending
          </Text>
        </View>
      )}
    </>
  );
}
