import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGeneralContext } from "../utils/GeneralContext";

export default function LoginButton() {
  const { token, setUserToken, setIsLoading } = useGeneralContext();

  return (
    <TouchableOpacity
      onPress={() => {
        setIsLoading(true);
        setUserToken(token ? null : "connected");
      }}
      style={styles.button}
    >
      <Text style={styles.textButton}>
        {token === "connected" ? "Connexion" : "Déconnexion"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "50%",
    alignItems: "center",
  },
  textButton: {
    color: "white",
  },
});
