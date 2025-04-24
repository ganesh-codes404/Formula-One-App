import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FantasyBetting = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [winner, setWinner] = useState("");
  const [podium1, setPodium1] = useState("");
  const [podium2, setPodium2] = useState("");
  const [podium3, setPodium3] = useState("");
  const [fastestLap, setFastestLap] = useState("");
  const [safetyCar, setSafetyCar] = useState("");

  const submitPrediction = () => {
    console.log("Prediction submitted:", { winner, podium1, podium2, podium3, fastestLap, safetyCar });
    // Store in AsyncStorage or send to backend
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Fantasy Betting</Text>
      
      <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Predict Race Winner:</Text>
      <Picker selectedValue={winner} onValueChange={(itemValue) => setWinner(itemValue)}>
        <Picker.Item label="Select Driver" value="" />
        <Picker.Item label="Max Verstappen" value="Max Verstappen" />
        <Picker.Item label="Lewis Hamilton" value="Lewis Hamilton" />
      </Picker>
      
      <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Predict Podium:</Text>
      <View style={styles.podiumContainer}>
        <Picker style={styles.picker} selectedValue={podium1} onValueChange={(itemValue) => setPodium1(itemValue)}>
          <Picker.Item label="1st" value="" />
          <Picker.Item label="Max Verstappen" value="Max Verstappen" />
          <Picker.Item label="Lewis Hamilton" value="Lewis Hamilton" />
        </Picker>
        <Picker style={styles.picker} selectedValue={podium2} onValueChange={(itemValue) => setPodium2(itemValue)}>
          <Picker.Item label="2nd" value="" />
          <Picker.Item label="Max Verstappen" value="Max Verstappen" />
          <Picker.Item label="Lewis Hamilton" value="Lewis Hamilton" />
        </Picker>
        <Picker style={styles.picker} selectedValue={podium3} onValueChange={(itemValue) => setPodium3(itemValue)}>
          <Picker.Item label="3rd" value="" />
          <Picker.Item label="Max Verstappen" value="Max Verstappen" />
          <Picker.Item label="Lewis Hamilton" value="Lewis Hamilton" />
        </Picker>
      </View>
      
      <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Fastest Lap:</Text>
      <Picker selectedValue={fastestLap} onValueChange={(itemValue) => setFastestLap(itemValue)}>
        <Picker.Item label="Select Driver" value="" />
        <Picker.Item label="Lando Norris" value="Lando Norris" />
        <Picker.Item label="Charles Leclerc" value="Charles Leclerc" />
      </Picker>
      
      <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>Will there be a Safety Car?</Text>
      <Picker selectedValue={safetyCar} onValueChange={(itemValue) => setSafetyCar(itemValue)}>
        <Picker.Item label="Select Option" value="" />
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No" value="No" />
      </Picker>
      
      <Button title="Submit Prediction" onPress={submitPrediction} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  darkContainer: { backgroundColor: "#121212" },
  lightContainer: { backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  label: { marginTop: 10 },
  darkText: { color: "#fff" },
  lightText: { color: "#000" },
  podiumContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  picker: { flex: 1, marginHorizontal: 5 },
});

export default FantasyBetting;
