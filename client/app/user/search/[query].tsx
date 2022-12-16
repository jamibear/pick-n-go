import { Text } from "react-native";

export default function Query({ route }) {
  const { query } = route.params;

 return (

 <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle {...props} />
		  }} 
		  />
 )
}
