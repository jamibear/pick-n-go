import { Stack } from "expo-router";
import { Text, SafeAreaView } from "react-native";

const ChatHeader = ({ route }) => {
  return <Text>{route.params.username}</Text>;
};

export default function Layout() {
  return (
    <SafeAreaView style={{ display: "flex", flex: 1 }}>
      <Stack
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "My home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          headerTitle: (props) => <ChatHeader {...props} />,
        }}
      />
    </SafeAreaView>
  );
}
