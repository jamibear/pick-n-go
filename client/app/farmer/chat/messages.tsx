import { supabase } from "../../../lib/supabase";
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { GetUserId } from "../../../lib/helpers";
import { useEffect, useState } from "react";
import { useLink } from "expo-router";

export default function Messages() {
  const link = useLink();
  const [inbox, setInbox] = useState([
    {
      user_id: "",
      other_user_id: "",
      last_message: "",
      sent_at: "",
      avatar_url: "",
      username: "",
      last_message_sent_by: "",
    },
  ]);
  const [userId, setUserId] = useState("");

  const getUserMessages = async () => {
    setUserId(await GetUserId());
    const { data, error } = await supabase
      .from("chatrooms")
      .select("*")
      .eq("user_id", await GetUserId());
    if (error) Alert.alert(error.message);
    setInbox(data);
  };

  useEffect(() => {
    getUserMessages();
  }, [inbox]);

  return (
    <View>
      {inbox && (
        <FlatList
          data={inbox}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                link.push({
                  pathname: "inbox/chat",
                  params: { id: item.other_user_id },
                })
              }
              style={{
                backgroundColor: "white",
                padding: 9,
                borderBottomWidth: 1,
                borderBottomColor: "#cfcfcf",
                flexDirection: "row",
              }}
            >
              <Image
                style={{ width: 75, height: 75, borderRadius: 99 }}
                source={item.avatar_url ? { uri: item.avatar_url } : null}
              />
              <View style={{ marginLeft: 9 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginBottom: 6 }}
                >
                  {item.username}
                </Text>
                <Text>
                  {item.last_message_sent_by === userId ? "You" : item.username}
                  : {item.last_message}
                </Text>
                <Text>{item.sent_at}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
