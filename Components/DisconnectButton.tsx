import { AntDesign } from "@expo/vector-icons";
import { useGeneralContext } from "../utils/GeneralContext";

export default function DisconnectButton() {
  const { token, setUserToken, isLoading } = useGeneralContext();

  return (
    <AntDesign
      name="disconnect"
      size={20}
      color="red"
      onPress={() => {
        setUserToken("connected");
      }}
    />
  );
}
