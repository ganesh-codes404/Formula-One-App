import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";

export default function Predictions() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: [85.3, 30, 25, 50, 44], 
        }),
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>F1 Race Predictions</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && (
        <View style={styles.results}>
          <Text>Winner: {prediction.winner}</Text>
          <Text>Safety Car Chance: {prediction.safetyCarChance}</Text>
          <Text>Weather: {prediction.weather}</Text>
          <Text>Top 10 Positions: {prediction.top10}</Text>
          <Text>Final Tire Stint: {prediction.finalTireStint}</Text>
        </View>
      )}
      <Button title="Make Prediction" onPress={handlePredict} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  results: {
    marginTop: 20,
    alignItems: "center",
  },
});
