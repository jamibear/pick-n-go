import { Text, View } from "react-native";

export default function Page() {
  
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 21,
          marginHorizontal: 15,
          marginTop: 15,
          height: 200,
          backgroundColor: "#6969c9",
          borderRadius: 15,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 21, color: "white" }}>
          P0 in total sales
        </Text>
      </View>
      <View
        style={{
          padding: 21,
          marginHorizontal: 15,
          marginTop: 15,
          height: 200,
          backgroundColor: "#69c969",
          borderRadius: 15,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 21, color: "white" }}>
          0 products shipped
        </Text>
      </View>
    </View>
  );
}
