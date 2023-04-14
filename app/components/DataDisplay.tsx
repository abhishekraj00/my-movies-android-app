import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

interface MovieProps {
  Title: string;
  Year: string;
  Poster: string;
  Plot?: string;
}

const DataDisplay: React.FC<MovieProps> = ({ Title, Year, Poster, Plot }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Display the movie poster */}
        <Image style={styles.image} source={{ uri: Poster }} />
        {/* Display the movie title */}
        <Text style={styles.title}>{Title}</Text>
        {/* Display the year of release */}
        <Text style={styles.year}>Year Of Release {Year}</Text>
        {/* Display the plot if it exists */}
        {Plot && <Text style={styles.year}>{Plot}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 50,
    padding: 5,
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  year: {
    fontSize: 16,
  },
});

export default DataDisplay;
