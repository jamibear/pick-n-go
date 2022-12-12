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
      .eq("ord_user_id", await userId())
      .or("ord_status.eq.cancelled,ord_status.eq.recieved");

    error ? Alert.alert("error fetching order list") : setOrders(data);
  };

  useEffect(() => {
    fetchData();
  }, [orders]);

  return (
    <>
      {orders && (
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
                  <Text style={tw`font-bold mx-2`}>{item.farm_username}</Text>
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
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </>
  );
}
