import React, { useState, useEffect, useRef } from "react";
import { View, Text, Switch, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Default to fully visible

  useEffect(() => {
    const loadTheme = async () => {
      const value = await AsyncStorage.getItem("darkMode");
      if (value !== null) {
        setIsDarkMode(JSON.parse(value));
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    // Start fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300, // Fade out duration
      useNativeDriver: false,
    }).start(() => {
      // Toggle theme after fade out
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      AsyncStorage.setItem("darkMode", JSON.stringify(newTheme));

      // Fade back in after updating theme
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Fade in duration
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["#121212", "#121212"],
          }) : fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["white", "white"],
          }),
        },
      ]}
    >
      <View style={styles.row}>
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: fadeAnim, // Make text fade in/out
              color: isDarkMode ? "white" : "black",
            },
          ]}
        >
          Theme
        </Animated.Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { fontSize: 18, marginBottom: 10, paddingTop: 10 },
});
