import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      <Text style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}>
        Profile Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  light: { backgroundColor: "white" },
  dark: { backgroundColor: "#121212" },
  text: { fontSize: 18 },
  textLight: { color: "black" },
  textDark: { color: "white" },
});
