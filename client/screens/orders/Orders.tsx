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

  const readyToShip = async (id) => {
    const { error } = await supabase
      .from("order_details")
      .update({ status: "to ship" })
      .eq("id", id);
    error ? Alert.alert(error.message) : Alert.alert("Product status updated");
  };

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
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <View
              style={tw`p-3 mx-3 mt-3 border-[1px] rounded-lg border-gray-300`}
            >
              <Text style={tw`text-xs text-gray-400`}>
                {item.ord_created_at}
              </Text>
              <View style={tw`flex-row w-full justify-between`}>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={item.avatar_url ? { uri: item.avatar_url } : null}
                    style={tw`w-8 h-8 rounded-full`}
                  />
                  <Text style={tw`font-bold mx-2`}>{item.user_username}</Text>
                </View>
                <Text
                  style={tw`self-start text-green-500 border-2 border-green-600 rounded-full px-2`}
                >
                  {item.ord_status}
                </Text>
              </View>
              <View style={tw`m-3`}>
                <FlatList
                  data={item.ord_items}
                  keyExtractor={(item) => item.item_id}
                  renderItem={({ item }) => (
                    <Text>
                      x{item.quantity} {item.name}
                    </Text>
                  )}
                />
              </View>
              <Text style={tw`text-lg text-right font-bold`}>
                Total: P{item.ord_total}
              </Text>

              <TouchableOpacity
                onPress={() => readyToShip(item.ord_id)}
                style={tw`p-3 bg-green-500 rounded-full`}
              >
                <Text style={tw` text-center text-white`}>Ready to ship</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
