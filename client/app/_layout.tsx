import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
   screenOptions={{
    headerShown: false
	}}
		/>
    </SafeAreaView>
  );
}
