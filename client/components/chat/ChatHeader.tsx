import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { supabase } from "../../lib/supabase";

export default function ChatHeader({ id }) {
  const [user, setUser] = useState({ username: "", avatar_url: "" });
  const getFarmInfo = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", id);
    setUser(data[0]);
  };

  useEffect(() => {
    getFarmInfo();
  });

  return (
    <View
      style={{
        width: "100%",
        height: 70,
        backgroundColor: "#33ff33",
        flexDirection: "row",
        alignContent: "center",
      }}
    >
      <Image
        style={{ alignSelf: 'center', height: 50, width: 50, borderRadius: 90 }}
        source={user.avatar_url ? { uri: user.avatar_url } : null}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          margin: 9,
          textAlignVertical: "center",
        }}
      >
        {user.username}
      </Text>
    </View>
  );
}
