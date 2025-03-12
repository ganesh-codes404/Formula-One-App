import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const teamBackgrounds = {
  Ferrari: require("../assets/Ferrari_BG_Toggle.jpeg"),
};

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useTeamColor, setUseTeamColor] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const darkModeValue = await AsyncStorage.getItem("darkMode");
        const teamColorValue = await AsyncStorage.getItem("useTeamColor");
        const storedUsername = await AsyncStorage.getItem("username");

        console.log("Fetched from Storage:", { darkModeValue, teamColorValue, storedUsername });

        if (darkModeValue !== null) setIsDarkMode(JSON.parse(darkModeValue));
        if (teamColorValue !== null) setUseTeamColor(JSON.parse(teamColorValue));
        if (storedUsername !== null) setUsername(storedUsername);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newTheme));
  };

  const toggleTeamColor = async () => {
    const newSetting = !useTeamColor;
    setUseTeamColor(newSetting);
    await AsyncStorage.setItem("useTeamColor", JSON.stringify(newSetting));
  };

  const getBackground = () => {
    if (isDarkMode) return { type: "color", value: "#121212" };
    if (useTeamColor && username && teamBackgrounds[username]) {
      return { type: "image", value: teamBackgrounds[username] };
    }
    return { type: "color", value: "#FFFFFF" };
  };

  const getTextColor = () => {
    if (isDarkMode) return "white";
    if (useTeamColor) return "white";
    return "black"; 
  };

  const background = getBackground();
  const textColor = getTextColor();

  console.log("Background Selected:", background);
  console.log("Text Color Selected:", textColor);

  return (
    <View style={styles.container}>
      {background.type === "image" ? (
        <ImageBackground source={background.value} style={styles.imageBackground} resizeMode="cover">
          <View style={styles.overlay}>
            <SettingsContent isDarkMode={isDarkMode} useTeamColor={useTeamColor} toggleTheme={toggleTheme} toggleTeamColor={toggleTeamColor} textColor={textColor} />
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.overlay, { backgroundColor: background.value }]}>
          <SettingsContent isDarkMode={isDarkMode} useTeamColor={useTeamColor} toggleTheme={toggleTheme} toggleTeamColor={toggleTeamColor} textColor={textColor} />
        </View>
      )}
    </View>
  );
}

const SettingsContent = ({ isDarkMode, useTeamColor, toggleTheme, toggleTeamColor, textColor }) => (
  <View style={styles.settingsContainer}>
    <View style={styles.row}>
      <Text style={[styles.text, { color: textColor }]}>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>

    {!isDarkMode && (
      <View style={styles.row}>
        <Text style={[styles.text, { color: textColor }]}>Use Team Colors</Text>
        <Switch value={useTeamColor} onValueChange={toggleTeamColor} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, justifyContent: "center" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsContainer: {
    width: "90%",
    maxWidth: 400, 
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  text: { fontSize: 18, fontWeight: "bold" },
});
