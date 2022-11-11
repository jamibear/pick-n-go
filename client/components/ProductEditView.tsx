import { useState } from "react";
import { StyleSheet, Text, Alert, Image, ScrollView } from "react-native";
import { Button, Input } from "@rneui/base";
import { supabase } from "../lib/supabase";

type Props = {
  id: number;
  title: string;
  desc: string;
  price: number;
  variant: string;
  img: string;
};

export default function ProductEditView({
  id,
  title,
  desc,
  price,
  variant,
  img,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [newPrice, setNewPrice] = useState(price.toString());
  const [newVariant, setNewVariant] = useState(variant);
  const [loading, setLoading] = useState(false);

  const saveChanges = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("products")
      .update({
        title: newTitle,
        description: newDesc,
        price: parseFloat(newPrice),
        variant: newVariant,
      })
      .eq("id", id);
    error
      ? Alert.alert(error.message)
      : Alert.alert("Changes updated successfully");
    setLoading(false);
  };

  return (
    <ScrollView>
      <Image style={styles.imageDisplay} source={{ uri: img }} />
      <Input
        label="title"
        onChangeText={(text) => setNewTitle(text)}
        value={newTitle}
        placeholder="Give your product a title..."
        autoCapitalize={"none"}
      />
      <Input
        label="description"
        onChangeText={(text) => setNewDesc(text)}
        value={newDesc}
        placeholder="Give your product a title..."
        autoCapitalize={"none"}
      />
      <Input
        label="price"
        onChangeText={(text) => setNewPrice(text)}
        value={newPrice}
        placeholder="Give your product a title..."
        autoCapitalize={"none"}
      />
      <Input
        label="variant"
        onChangeText={(text) => setNewVariant(text)}
        value={newVariant}
        placeholder="(e.g. 1kg, 500g)"
        autoCapitalize={"none"}
      />
      <Button
        title={"SAVE CHANGES"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        loading={loading}
        onPress={saveChanges}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#fefefe",
    borderBottomColor: "1px solid gray",
  },
  imageDisplay: {
	 margin: 10,
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  logo: {
    width: 66,
    height: 58,
  },
});
