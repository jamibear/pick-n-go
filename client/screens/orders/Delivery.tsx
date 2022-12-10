import { FlatList, View, Text, ScrollView } from "react-native";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";

export default function Delivery() {
  const [orders, setOrders] = useState({});

  const userId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  const groupOrders = (data) => {
    const orderGroup = data?.reduce((orders, item) => {
      const order_name = item.ord_name;
      if (!orders[order_name]) {
        orders[order_name] = [];
      }
      orders[order_name].push(item);
      return orders;
    }, {});
    setOrders(orderGroup);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("order_list")
        .select()
        .eq("ord_user_id", await userId());

      data && groupOrders(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {orders && (
        <FlatList
          data={Object.values(orders)}
          renderItem={({ item }) => (
            <Text>{JSON.stringify(item, null, 3)}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </>
  );
}
