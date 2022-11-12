import { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, Text } from "react-native";
import { supabase } from "../../../lib/supabase";
import ProductView from "../../../components/ProductView";

export default function ProductInfo({ route }) {
  const [item, setItem] = useState([
    {
      prd_id: "",
      prd_img: "",
      prd_title: "",
      prd_desc: "",
      prd_price: 0,
      prd_variant: "",
      prf_id: "",
      prf_username: "",
      prf_pic: "",
    },
  ]);

  const getData = async () => {
    const { data, error } = await supabase
      .from("product_view")
      .select("*")
      .eq("prd_id", route.params.id);
    setItem(data!);
    if (error) Alert.alert(error.message);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FlatList
      data={item}
      renderItem={({ item }) => (
        <ProductView
          prd_id={item.prd_id}
          prd_img={item.prd_img}
          prd_title={item.prd_title}
          prd_desc={item.prd_desc}
          prd_price={item.prd_price}
          prd_variant={item.prd_variant}
          prf_id={item.prf_id}
          prf_username={item.prf_username}
          prf_pic={item.prf_pic}
        />
      )}
    />
  );
}
