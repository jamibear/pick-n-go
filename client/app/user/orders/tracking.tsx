import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function () {
  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <MaterialCommunityIcons
        name="truck-cargo-container"
        size={75}
        color="#cfdfdf"
        style={{ alignSelf: "center" }}
      />

      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: "#cfdfcf",
        }}
      >
        Your pending orders will show up here
      </Text>
    </View>
  );
}
