import "react-native-url-polyfill/auto";
import { supabase } from "../../../lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Alert, View, ScrollView } from "react-native";
import { Button, Input } from "@rneui/base";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [variant, setVariant] = useState("");
  const [img_url, setImageUrl] = useState("");

  const [image, setImage] = useState(null);
  const categories = [
    "Fruit",
    "Vegetables",
    "Poultry",
    "Dairy",
    "Grains",
    "Herbs & Spices",
    "Snacks",
    "Leafy Greens",
    "Dried Fruits",
    "Ingredients",
  ];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    Alert.alert(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  const addProduct = async () => {
    setLoading(true);
    try {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      var fileName = image.replace(/^.*[\\\/]/, "");
      var formData = new FormData();
      formData.append("files", {
        uri: image,
        name: `${Math.random()}-${fileName}`,
        type: `image/${ext}`,
      });
      const { data, error } = await supabase.storage
        .from("pickngo")
        .upload(fileName, formData, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;
    } catch (error) {
      throw error;
    }

    const { data, error } = await supabase.from("products").insert([
      {
        user_id: await getData(),
        title: title,
        description: description,
        price: parseFloat(price),
        variant: variant,
        img_url: `https://mtvjqfbmffncybjbxixp.supabase.co/storage/v1/object/public/pickngo/${fileName}`,
      },
    ]);

    setLoading(false);
  };

  return (
    <ScrollView>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Input
        label="title"
        onChangeText={(text) => setTitle(text)}
        value={title}
        placeholder="Give your product a title..."
        autoCapitalize={"none"}
      />
      <Input
        label="description"
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Description of the product"
        autoCapitalize={"none"}
      />
      <Input
        label="price"
        onChangeText={(text) => setPrice(text)}
        value={price}
        placeholder="99.99"
        autoCapitalize={"none"}
      />
      <Input
        label="variant"
        onChangeText={(text) => setVariant(text)}
        value={variant}
        placeholder="(e.g. 1kg)"
        autoCapitalize={"none"}
      />
		<Picker>
		{categories.map((category) => (
		<Picker.Item label={category} value={category} />
		))}
		</Picker>
      <Button
        title={"ADD PRODUCT"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        loading={loading}
        onPress={addProduct}
      />
    </ScrollView>
  );
}
