import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DataDisplay from "./DataDisplay";

interface SeriesProp {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbID: string;
}

const EpisodeSearch = () => {
  // Initialize state variables using the useState hook
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchSeason, setSearchSeason] = useState<string>("");
  const [searchEpisode, setSearchEpisode] = useState<string>("");

  const [episodes, setEpisodes] = useState<SeriesProp>();
  const [error, setError] = useState<string>("");

  // Function to retrieve episode data from the API using the fetch function
  const getMoviesList = () => {
    const Api = `http://www.omdbapi.com/?apikey=9e10ee12&type=episode&t=${searchTitle}&season=${searchSeason}&episode=${searchEpisode}`;
    fetch(Api)
      .then((response) => response.json())
      .then((data) => {
        // Check if the API response is valid
        if (data.Response === "True") {
          setEpisodes(data);
          setError("");
          // console.warn(Api);
        } else {
          setError(data.Error);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View>
        {/* Input fields for title, season, and episode */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Episodes</Text>

          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={searchTitle}
              onChangeText={(text) => setSearchTitle(text)}
            />
          </View>
          <View style={styles.searchBox}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Season"
              value={searchSeason}
              onChangeText={(text) => setSearchSeason(text)}
            />
          </View>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              placeholder="Episode"
              value={searchEpisode}
              onChangeText={(text) => setSearchEpisode(text)}
            />
          </View>
          {/* Button to trigger search */}
          <TouchableOpacity style={styles.btn} onPress={() => getMoviesList()}>
            <Text style={styles.btnLable}>Search</Text>
          </TouchableOpacity>
        </View>
        {/* Display error message if API response is invalid */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          // Display episode data if API response is valid
          <View style={styles.list}>
            {episodes && (
              <DataDisplay
                Title={episodes?.Title}
                Year={episodes.Year}
                Poster={episodes.Poster}
                Plot={episodes.Plot}
              />
            )}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EpisodeSearch;

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
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "blue",
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLable: {
    color: "white",
    fontSize: 18,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
  },
  list: {
    marginBottom: 10,
  },
});
