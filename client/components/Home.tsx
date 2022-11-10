import { Link, Tabs } from "expo-router";

export default function Home() {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the dynamic route.
        name="home"
        options={{
          // Ensure the tab always links to the same href.
          href: "/farmer/home",

          // OR you can use the Href object:
        }}
      />
    </Tabs>
  );
}
