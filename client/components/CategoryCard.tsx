import { Text } from "react-native";

type Category = {
  icon: string;
  category: string;
};

export default function CategoryCard({ icon, category }: Category) {
  return <Text>{category}</Text>;
}
