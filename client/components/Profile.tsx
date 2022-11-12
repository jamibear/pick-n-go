import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Button } from "@rneui/base";
import { Link, useLink } from "expo-router";
import { supabase } from "../lib/supabase";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const link = useLink();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    link.push("/");
  };

  return (
    <TouchableOpacity
      style={{
        padding: 21,
        flex: 1,
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: "#efefef",
      }}
      onPress={handleLogout}
    >
      {loading ? (
        <ActivityIndicator color="#3350ee" size="large" />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 18, color: "#3350ee" }}>
          Logout
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default function Profile({ id, name, username, bio, avatar }) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.edit}>
        <Button size="sm" radius="xl">
          <Link href="editProfile">edit profile</Link>
        </Button>
      </View>
      <Image style={styles.avatar} source={avatar ? { uri: avatar } : null} />
      <View>
        <Text style={styles.info}>{name}</Text>
        <Text style={styles.info}>@{username}</Text>
      </View>
      <View style={styles.bio}>
        <Text>{bio ? bio : "Say something about yourself"}</Text>
      </View>
      <LogoutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
  },
  avatar: {
    borderRadius: 100,
    margin: 30,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  bio: {
    borderRadius: 15,
    backgroundColor: "#efefef",
    alignSelf: "center",
    width: "90%",
    padding: 15,
    margin: 15,
  },
  info: {
    textAlign: "center",
    fontWeight: "bold",
  },
  edit: {
    margin: 10,
    alignSelf: "flex-end",
  },
});
