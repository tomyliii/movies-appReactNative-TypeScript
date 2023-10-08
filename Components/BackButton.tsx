import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="caretleft"
      size={20}
      color="red"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
}
