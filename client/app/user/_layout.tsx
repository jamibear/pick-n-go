import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, Tabs, useLink } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const UltimateHeader = () => {
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
};

export default function Home() {
  const iconSize = 30;
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          href: "/user/home",
          headerTitle: (props) => <UltimateHeader {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={iconSize} color={color} />
          ),
          tabBarActiveTintColor: "#22c55e",
          headerShadowVisible: false,
          tabBarStyle: {
            elevation: 0,
            outerHeight: 30,
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          href: "/user/orders",
          tabBarIcon: ({ color, size }) => (
            <Feather name="truck" size={iconSize} color={color} />
          ),
          tabBarActiveTintColor: "#22c55e",
          headerShadowVisible: false,
          tabBarStyle: {
            elevation: 0,
            outerHeight: 30,
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: "/user/chat",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-square" size={iconSize} color={color} />
          ),
          tabBarActiveTintColor: "#22c55e",
          headerShadowVisible: false,
          tabBarStyle: {
            elevation: 0,
            outerHeight: 30,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: "/user/profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="smile" size={iconSize} color={color} />
          ),
          tabBarActiveTintColor: "#22c55e",
          headerShadowVisible: false,
          tabBarStyle: {
            elevation: 0,
            outerHeight: 30,
          },
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="product"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="search"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="cart"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
