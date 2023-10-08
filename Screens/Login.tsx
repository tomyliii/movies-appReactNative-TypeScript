import { View, useWindowDimensions, StyleSheet } from "react-native";
import { useGeneralContext } from "../utils/GeneralContext";
import { useEffect, useState } from "react";
import LoginButton from "../Components/LoginButton";
import LoadingComponent from "../Components/LoadingComponent";

export default function Login() {
  const { setIsLoading, isLoading } = useGeneralContext();
  const styles = useStyle();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
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
