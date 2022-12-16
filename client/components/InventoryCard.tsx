import { Link } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import tw from "twrnc";

export default function InventoryCard({
  id,
  title,
  price,
  sold,
  img_url,
  getData,
}) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("products")
      .delete()
      .match({ id: id });
    error ? Alert.alert(error.message) : Alert.alert("product is deleted");
    getData();
  };

  return (
    <View style={styles.container}>
      <Link href={{ pathname: "/farmer/products/[id]", params: { id: id } }}>
        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={
              img_url
                ? {
                    uri: img_url,
                  }
                : null
            }
          />
          <Text style={tw`text-lg`}>{title}</Text>
          <Text>Price: P{price}</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity style={{ width: 45 }} onPress={handleDelete}>
        <Text style={{ color: "red" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "white",
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
