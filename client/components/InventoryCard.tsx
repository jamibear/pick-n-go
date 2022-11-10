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
            source={{
              uri: img_url,
            }}
          />
          <Text>{title}</Text>
          <Text>Price: {price}</Text>
          <Text>Sold: {sold}</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={handleDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fefefe",
    borderBottomColor: "1px solid gray",
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
