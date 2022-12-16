import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLink } from "expo-router";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";

export default function UserHeader() {
  const link = useLink();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#33c033" }}>pickngo</Text>

      {/* --------- SEARCH BAR -------- */}
      <View
        style={tw`justify-between border-[1px] py-[3px] px-3 mx-4 grow items-center border-green-500 flex-row rounded-full`}
      >
        <TextInput
          placeholder="Search"
          onSubmitEditing={() =>
            link.push({
              pathname: "user/search/[query]",
              params: { query: "parsley" },
            })
          }
        />
        <Feather name="search" size={18} color="#afafaf" />
      </View>

      <TouchableOpacity onPress={() => link.push("user/cart")}>
        <Feather name="shopping-bag" size={27} color="#33cc33" />
      </TouchableOpacity>
    </View>
  );
}
