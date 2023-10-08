import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
} from "react-native";

import { RootStackParamsList } from "../Components/Nav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoginButton from "../Components/LoginButton";
import { useGeneralContext } from "../utils/GeneralContext";
import { useEffect } from "react";
import LoadingComponent from "../Components/LoadingComponent";

type Props = NativeStackScreenProps<RootStackParamsList, "Home">;

export default function Home({ navigation }: Props) {
  const styles = useStyle();
  const { setIsLoading, isLoading } = useGeneralContext();
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        backgroundColor={"#333"}
      />
      <TouchableOpacity
        onPress={() => {
          setIsLoading(true);
          navigation.navigate("Movies");
        }}
        style={styles.button}
      >
        <Text style={styles.textButton}>Movies</Text>
      </TouchableOpacity>
      <LoginButton />
    </View>
  );
}

const useStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#333",
      height: height,
      width: width,
    },
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

  return styles;
};
