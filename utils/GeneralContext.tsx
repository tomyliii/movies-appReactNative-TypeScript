import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type GeneralContextProviderProps = { children: React.ReactNode };

type GeneralContext = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserToken: (token: string | null) => void;
};

export const GeneralContext = createContext<GeneralContext | null>(null);

export default function GeneralContextProvider({
  children,
}: GeneralContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setUserToken = async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem("token", "connected");
      setToken("connected");
    } else {
      await AsyncStorage.removeItem("token");
      setToken(null);
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        setToken,
        setUserToken,
        token,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export function useGeneralContext() {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("Error !");
  }
  return context;
}
