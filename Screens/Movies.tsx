import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { RootStackParamsList } from "../Components/Nav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { useGeneralContext } from "../utils/GeneralContext";
import axios from "axios";
import { z, ZodError } from "zod";
import LoadingComponent from "../Components/LoadingComponent";

const moviesSchema = z.array(z.object({ id: z.number(), title: z.string() }));
type Movies = z.infer<typeof moviesSchema>;

type Props = NativeStackScreenProps<RootStackParamsList, "Movies">;
export default function Movies({ navigation }: Props) {
  const [movies, setMovies] = useState<Movies | null>(null);
  const [errorMessage, setErrorMessage] = useState<Error | string | null>(null);
  const { setIsLoading, isLoading } = useGeneralContext();

  const styles = useStyle();

  useEffect(() => {
    (async () => {
      try {
        const fetchData = await axios.get("http://localhost:3000/getmovies");

        // console.log(JSON.stringify(fetchData, null, 2));
        const data = moviesSchema.parse(fetchData.data);
        // console.log(data);
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setErrorMessage(new Error("Erreur de validation Zod"));
          console.log("Erreur de validation Zod");
        } else {
          setErrorMessage(
            "Une erreur est survenue.Veuillez essayer ulterieurment."
          );
          console.log(
            "Une erreur est survenue.Veuillez essayer ulterieurment."
          );
        }
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const displayMoviesButton = () => {
    return movies?.map((movie) => {
      return (
        <TouchableOpacity
          key={movie.id}
          onPress={() => {
            setIsLoading(true);
            navigation.navigate("Movie", { id: movie.id });
          }}
          style={styles.button}
        >
          <Text style={styles.textButton}>{movie.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  return <View style={styles.container}>{displayMoviesButton()}</View>;
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
