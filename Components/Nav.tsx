import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import Movies from "../Screens/Movies";
import Movie from "../Screens/Movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGeneralContext } from "../utils/GeneralContext";
import { useEffect } from "react";
import BackButton from "./BackButton";
import DisconnectButton from "./DisconnectButton";

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  Movies: undefined;
  Movie: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function Nav() {
  const { setToken, setIsLoading, isLoading, token } = useGeneralContext();

  useEffect(() => {
    const bootStrapToken = async () => {
      const userTOken = await AsyncStorage.getItem("token");
      setToken(userTOken);
      setIsLoading(false);
    };
    bootStrapToken();
  }, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Movies"
              component={Movies}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "#333" },
                headerTintColor: "red",
                headerTitleAlign: "center",
                headerLeft: () => <BackButton />,
                headerRight: () => <DisconnectButton />,
              }}
            />
            <Stack.Screen
              name="Movie"
              component={Movie}
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "#333" },
                headerTintColor: "red",
                headerTitleAlign: "center",
                headerLeft: () => <BackButton />,
                headerRight: () => <DisconnectButton />,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
