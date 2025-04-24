import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LiveScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveRace, setIsLiveRace] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchDarkMode = async () => {
        const value = await AsyncStorage.getItem("darkMode");
        if (value !== null) {
          setIsDarkMode(JSON.parse(value));
        }
      };
      fetchDarkMode();
    }, [])
  );

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching live race data...");
        let response = await fetch("https://api.openf1.org/v1/drivers?session_key=latest");
        let data = await response.json();
        console.log("Live data response:", data);

        if (data.length > 0) {
          setDrivers(data);
          setIsLiveRace(true);
        } else {
          console.log("No live race found. Fetching previous race...");
          response = await fetch("https://api.openf1.org/v1/drivers?session_key=previous");
          data = await response.json();
          console.log("Previous race response:", data);

          if (data.length > 0) {
            setDrivers(data);
          } else {
            console.log("No previous race data found. Fetching by round...");
            response = await fetch("https://api.openf1.org/v1/drivers?round=latest_complete");
            data = await response.json();
            console.log("Latest completed round response:", data);
            setDrivers(data);
          }

          setIsLiveRace(false);
        }
      } catch (error) {
        console.error("Error fetching OpenF1 data:", error);
        setError("Failed to load race data.");
        setDrivers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();
    const intervalId = setInterval(fetchLiveData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      <Text style={[styles.title, isDarkMode ? styles.textDark : styles.textLight]}>
        {isLiveRace ? "🏁 Live Race Standings" : "🏎️ Last Race Results"}
      </Text>

      {loading && <ActivityIndicator size="large" color={isDarkMode ? "white" : "black"} />}
      {error && <Text style={[styles.error, isDarkMode ? styles.textDark : styles.textLight]}>{error}</Text>}
      {!loading && drivers.length === 0 && <Text style={[styles.error, isDarkMode ? styles.textDark : styles.textLight]}>No data available.</Text>}

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerText]}>POS</Text>
          <Text style={[styles.cell, styles.headerText]}>DRIVER</Text>
          <Text style={[styles.cell, styles.headerText]}>LAP</Text>
          <Text style={[styles.cell, styles.headerText]}>TIRE</Text>
        </View>

        <FlatList
          data={drivers}
          keyExtractor={(item) => item.driver_number.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.cell, isDarkMode ? styles.textDark : styles.textLight]}>{item.position || "-"}</Text>
              <Text style={[styles.cell, isDarkMode ? styles.textDark : styles.textLight]}>{item.driver_name || "-"}</Text>
              <Text style={[styles.cell, isDarkMode ? styles.textDark : styles.textLight]}>{item.current_lap || "-"}</Text>
              <Text style={[styles.cell, isDarkMode ? styles.textDark : styles.textLight]}>{item.tire || "-"}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  light: { backgroundColor: "#f5f5f5" },
  dark: { backgroundColor: "#121212" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  textLight: { color: "#1e1e1e" },
  textDark: { color: "#e0e0e0" },
  error: { color: "red", textAlign: "center", marginVertical: 10 },
  table: { borderWidth: 1, borderColor: "#444", borderRadius: 10, overflow: "hidden" },
  headerRow: { backgroundColor: "#222", paddingVertical: 10 },
  headerText: { color: "#fff", fontWeight: "bold" },
  row: { flexDirection: "row", padding: 12, borderBottomWidth: 1, borderBottomColor: "#555" },
  cell: { flex: 1, textAlign: "center", fontSize: 16 },
});
