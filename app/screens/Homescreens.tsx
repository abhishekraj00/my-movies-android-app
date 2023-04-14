import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import MoviesSearch from "../components/MoviesSearch";
import EpisodeSearch from "../components/EpisodeSearch";

const Homescreens = () => {
  // Set the default option to "movies"
  const [option, setOption] = useState("movies");

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.heading}>Search Movies, Series, and Episodes</Text>
      <Picker
        selectedValue={option}
        style={styles.dropDown}
        onValueChange={(itemValue) => setOption(itemValue)}
      >
        <Picker.Item label="Movies" value="movies" />
        <Picker.Item label="Series" value="series" />
        <Picker.Item label="Episode" value="episode" />
      </Picker>
      {/* Display MoviesSearch or EpisodeSearch component based on the selected option */}
      {option !== "episode" && <MoviesSearch option={option} />}
      {option === "episode" && <EpisodeSearch />}
    </View>
  );
};

export default Homescreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dropDown: {
    height: 50,
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderColor: "black",
  },
});
