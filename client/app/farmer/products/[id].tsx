import { Text } from 'react-native'

export default function ProductInfo({ route }) {
  return (
    <Text>
      {route.params.id}
    </Text>
  );
}
