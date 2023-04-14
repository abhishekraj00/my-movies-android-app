import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import DataDisplay from "./DataDisplay";

// Interface for movies data object
interface MoviesProp {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

// Interface for movies search options
interface MoviesSearchProp {
  option: string;
}

const MoviesSearch: React.FC<MoviesSearchProp> = ({ option }) => {
  // State variables for user input and movie data
  const [searchMovies, setSearchMovies] = useState<string>("");
  const [movies, setMovies] = useState<MoviesProp[]>([]);
  const [error, setError] = useState<string>("");

  // API url for movies or series depending on search option
  const MoviesApi =
    option === "movies"
      ? "http://www.omdbapi.com/?apikey=9e10ee12&type=movie&s="
      : "http://www.omdbapi.com/?apikey=9e10ee12&type=series&s=";

  // Function to fetch movies data from API
  const getMoviesList = () => {
    fetch(`${MoviesApi}${searchMovies}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search); // If response is true, set the movies state with the fetched movie data
          setError(""); // Clear error state
        } else {
          setError(data.Error); // Set error state with error message from API
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred. Please try again later."); // Set error state with custom error message
      });
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {option === "movies" ? "Movies Search" : "Series Search"}
        </Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder={
              option === "movies" ? "Enter Movies Name " : "Enter Series Name"
            }
            onChangeText={(text) => setSearchMovies(text)}
          />
          <Icon
            name="search"
            size={24}
            color="black"
            style={styles.icon}
            onPress={() => getMoviesList()}
          />
        </View>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.list}>
          <Text style={styles.listTitle}>My Movies</Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <DataDisplay
                Title={item?.Title}
                Year={item.Year}
                Poster={item.Poster}
              />
            )}
            keyExtractor={(item) => item.imdbID}
          />
        </View>
      )}
    </View>
  );
};

export default MoviesSearch;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    padding: 10,
    height: "90%",
  },
  listTitle: {
    padding: 10,
    marginBottom: 20,
  },
});
