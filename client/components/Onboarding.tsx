import React, { useState } from "react";
import { Text, Alert, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/base";
import { Picker } from "@react-native-picker/picker";

export default function Onboarding({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("user");

  // get the userId from supabse session
  const getData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  const saveUser = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullname,
        username: username,
        user_role: userRole,
      })
      .eq("id", await getData());
    error ? Alert.alert(error.message) : navigation.push(userRole);
    setLoading(false);
  };
  return (
    <View>
      <Input
        label="Full Name"
        onChangeText={(text) => setFullname(text)}
        value={fullname}
        autoCapitalize={"none"}
      />
      <Input
        label="Set a username..."
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize={"none"}
      />
      <Picker
        selectedValue={userRole}
        onValueChange={(itemValue) => setUserRole(itemValue)}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Farmer" value="farmer" />
      </Picker>

      <Button
        title={"OK"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        loading={loading}
        onPress={saveUser}
      />
    </View>
  );
}
