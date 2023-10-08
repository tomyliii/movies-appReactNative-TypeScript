import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { RootStackParamsList } from "../Components/Nav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { useGeneralContext } from "../utils/GeneralContext";
import LoadingComponent from "../Components/LoadingComponent";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamsList, "Movie">;
const movieSchema = z.object({
  id: z.number(),
  backdrop_path: z.string().url(),
  poster_path: z.string().url(),
  overview: z.string(),
  release_date: z.string(),
  title: z.string(),
  vote_average: z.number(),
});

type Movie = z.infer<typeof movieSchema>;

export default function Movie(props: Props) {
  const id = props.route.params.id;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [errorMessage, setErrorMessage] = useState<Error | string | null>(null);
  const { isLoading, setIsLoading } = useGeneralContext();
  const styles = useStyle();
  useEffect(() => {
    try {
      (async () => {
        const fetchData = await axios.get(
          `http://localhost:3000/getmovie/${id}`
        );
        // const fetchData = await axios.get(
        //   `http://192.168.1.15:3000/getmovie/${id}`
        // );
        const data = movieSchema.parse(fetchData.data);
        setMovie(data);
        setIsLoading(false);
      })();
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(new Error("Erreur de validation Zod"));
        console.log("Erreur de validation Zod");
      } else {
        setErrorMessage(
          "Une erreur est survenue.Veuillez essayer ulterieurment."
        );
        console.log("Une erreur est survenue.Veuillez essayer ulterieurment.");
      }
    }
  }, []);
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: movie?.poster_path }}
        style={styles.backGround}
      >
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie?.title}</Text>
            <Text style={styles.rate}>{movie?.vote_average}/10</Text>
          </View>

          <Text style={styles.textDescription}>{movie?.overview}</Text>
        </View>
      </ImageBackground>
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
      height: "100%",
      width: width,
    },
    backGround: { width: width, height: "100%", justifyContent: "center" },
    textContainer: { backgroundColor: "rgba(52, 52, 52, 0.8)", padding: 10 },
    textDescription: { color: "white", textAlign: "justify" },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
      color: "red",
    },
    rate: {
      backgroundColor: "red",
      padding: 5,
      color: "white",
      fontWeight: "bold",
      borderRadius: 10,
    },
  });

  return styles;
};
