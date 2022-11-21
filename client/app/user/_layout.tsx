import { Text, TouchableOpacity, View } from "react-native";
import { Link, Tabs, useLink } from "expo-router";

const UltimateHeader = () => {
  const link = useLink();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignContent: "space-between",
      }}
    >
      <Text>pickngo</Text>
      <TouchableOpacity onPress={() => link.push("user/cart")}>
        <Text>Cart</Text>
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
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: "/user/chat",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: "/user/profile",
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
        name="product/[id]"
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
