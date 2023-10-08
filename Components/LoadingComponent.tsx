import { View, ActivityIndicator, Text, StatusBar } from "react-native";
import Constants from "expo-constants";
export default function LoadingComponent() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
        height: "100%",
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        backgroundColor={"#333"}
      />
      <ActivityIndicator size={"large"} color={"red"} />
      <Text style={{ color: "white", paddingTop: 10 }}>Is Loading...</Text>
    </View>
  );
}
