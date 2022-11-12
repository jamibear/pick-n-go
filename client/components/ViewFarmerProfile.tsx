import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/base";
import { useLink } from "expo-router";

export default function ViewFarmerProfile({ id, name, username, bio, avatar }) {
  const link = useLink()
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.avatar} source={{ uri: avatar }} />
      <View>
        <Text style={styles.info}>{name}</Text>
        <Text style={styles.info}>@{username}</Text>
      </View>
      <View style={styles.bio}>
        <Text>{bio ? bio : `hello im farmer ${username}`}</Text>
      </View>
		<Button onPress={() => link.push({pathname: 'user/chat/[id]', params: {id: id}})} title="Message"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
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

  logout: {
    textAlign: "center",
    fontSize: 18,
    color: "#6666cc",
    padding: 30,
  },
});
