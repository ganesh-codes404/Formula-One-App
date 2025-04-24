// import React, { useState } from "react";
// import { View, Text, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";

// const PredictionsScreen = () => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === "dark";

//   const [predictions, setPredictions] = useState(null);

//   const generateMockPredictions = () => {
//     const mockData = {
//       winner: "Max Verstappen",
//       podium: ["Max Verstappen", "Lewis Hamilton", "Charles Leclerc"],
//       fastestLap: "Lando Norris",
//       safetyCarChance: "Yes (72%)",
//       finalTireStint: "Medium",
//     };

//     setPredictions(mockData);
//   };

//   return (
//     <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
//       <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Race Predictions</Text>

//       {predictions ? (
//         <View style={styles.predictionsContainer}>
//           <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>🏆 Predicted Winner: {predictions.winner}</Text>
//           <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>🥇 Podium:</Text>
//           <Text style={[styles.predictionText, isDarkMode ? styles.darkText : styles.lightText]}>
//             1st: {predictions.podium[0]}
//           </Text>
//           <Text style={[styles.predictionText, isDarkMode ? styles.darkText : styles.lightText]}>
//             2nd: {predictions.podium[1]}
//           </Text>
//           <Text style={[styles.predictionText, isDarkMode ? styles.darkText : styles.lightText]}>
//             3rd: {predictions.podium[2]}
//           </Text>
//           <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>⚡ Fastest Lap: {predictions.fastestLap}</Text>
//           <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>🚨 Safety Car Chance: {predictions.safetyCarChance}</Text>
//           <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>🏁 Final Tire Stint: {predictions.finalTireStint}</Text>
//         </View>
//       ) : (
//         <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Click below to generate predictions!</Text>
//       )}

//       <Button title="Generate Predictions" onPress={generateMockPredictions} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20 },
//   darkContainer: { backgroundColor: "#121212" },
//   lightContainer: { backgroundColor: "#f5f5f5" },
//   header: { fontSize: 24, textAlign: "center", marginBottom: 20 },
//   label: { marginTop: 10, fontSize: 18, fontWeight: "bold" },
//   predictionText: { fontSize: 16 },
//   darkText: { color: "#fff" },
//   lightText: { color: "#000" },
//   predictionsContainer: { marginTop: 20, padding: 15, borderRadius: 10, backgroundColor: "rgba(255, 255, 255, 0.2)" },
// });

// export default PredictionsScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const f1Data = {
  2022: [
    { "driver": "Max Verstappen", "qualifying_time": 1.14, "tire_wear": 12 },
    { "driver": "Lewis Hamilton", "qualifying_time": 1.15, "tire_wear": 14 },
    { "driver": "Charles Leclerc", "qualifying_time": 1.16, "tire_wear": 16 },
  ],
  2023: [
    { "driver": "Lando Norris", "qualifying_time": 1.18, "tire_wear": 11 },
    { "driver": "George Russell", "qualifying_time": 1.13, "tire_wear": 13 },
    { "driver": "Sergio Perez", "qualifying_time": 1.17, "tire_wear": 15 },
  ],
  2024: [
    { "driver": "Daniel Ricciardo", "qualifying_time": 1.19, "tire_wear": 17 },
    { "driver": "Sebastian Vettel", "qualifying_time": 1.20, "tire_wear": 18 },
    { "driver": "Fernando Alonso", "qualifying_time": 1.12, "tire_wear": 10 },
  ]
};

const PredictionsScreen = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const predictPerformance = (driverData) => {
    const qualifyingThreshold = 1.18;
    const tireWearThreshold = 15;

    if (driverData.qualifying_time < qualifyingThreshold && driverData.tire_wear < tireWearThreshold) {
      return { text: 'High chance of finishing in the top 3', class: 'high' };
    } else if (driverData.qualifying_time < qualifyingThreshold || driverData.tire_wear < tireWearThreshold) {
      return { text: 'Moderate chance of top 3 finish', class: 'moderate' };
    } else {
      return { text: 'Low chance of finishing in the top 3', class: 'low' };
    }
  };

  const aggregateData = () => {
    let allDriverData = [];
    for (let year in f1Data) {
      allDriverData = allDriverData.concat(f1Data[year]);
    }

    const predictionResults = allDriverData.map(driver => {
      const prediction = predictPerformance(driver);
      return {
        driver: driver.driver,
        prediction: prediction.text,
        predictionClass: prediction.class,
      };
    });

    setPredictions(predictionResults);
    setLoading(false);
  };

  useEffect(() => {
    aggregateData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>F1 Race Predictions (Overall)</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.predictionList}>
          {predictions.map((prediction, index) => (
            <View key={index} style={[styles.card, styles[prediction.predictionClass]]}>
              <Text style={styles.driverName}>{prediction.driver}</Text>
              <Text style={styles.predictionText}>{prediction.prediction}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.button} onPress={aggregateData}>
        <Text style={styles.buttonText}>Refresh Predictions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
  },
  predictionList: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  high: {
    backgroundColor: '#2ECC71',
  },
  moderate: {
    backgroundColor: '#F1C40F',
  },
  low: {
    backgroundColor: '#E74C3C',
  },
  driverName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  predictionText: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1F6FEB',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PredictionsScreen;
