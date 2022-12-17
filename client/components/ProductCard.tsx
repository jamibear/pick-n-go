import { Link, Redirect, useLink } from "expo-router";
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

export default function ProductCard({ id, title, price, variant, img_url }) {
  const link = useLink();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          link.push({ pathname: "user/product/[id]", params: { id: id } })
        }
      >
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
        <Text style={tw`font-bold`}>
          P{price}/{variant}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#efefef",
  },
  tinyLogo: {
    width: "100%",
    height: 175,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
