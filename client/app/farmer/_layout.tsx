import { Tabs } from "expo-router";

export default function Home() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          href: "/farmer/home",
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          href: "/farmer/products",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: "/farmer/profile",
        }}
      />
    </Tabs>
  );
}
