import { Text, TouchableOpacity, View } from "react-native";
import { Link, Tabs, useLink } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const UltimateHeader = () => {
  const link = useLink();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontWeight: "bold", width: "88%", color: "#33c033" }}>
        pickngo
      </Text>
      <TouchableOpacity onPress={() => link.push("user/cart")}>
        <Feather name="shopping-bag" size={27} color="#33cc33" />
      </TouchableOpacity>
    </View>
  );
};

export default function Home() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          href: "/user/home",
          headerTitle: (props) => <UltimateHeader {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          href: "/user/orders",
          tabBarIcon: ({ color, size }) => (
            <Feather name="package" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: "/user/chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: "/user/profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
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
        name="cart"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );
}
