import { 
  StyleSheet, Text, TextInput, View, TouchableOpacity, 
  ActivityIndicator, ScrollView, KeyboardAvoidingView, 
  Platform, Keyboard, TouchableWithoutFeedback 
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WhatifScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false);

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

  const fetchScenario = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      console.log("Sending request to DeepInfra...");

      const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `${AUTHORIZATION}`  
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3.1-8B-Instruct",  
          messages: [{ role: "user", content: `Imagine if ${input}. Describe the Formula one race, key moments, and final result.` }],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      const aiResponse = data?.choices?.[0]?.message?.content || "No response.";
      setMessages([...newMessages, { role: "ai", content: aiResponse }]); 
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages([...newMessages, { role: "ai", content: "Error fetching scenario." }]);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80} // Adjust this if needed
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
          <ScrollView 
            style={styles.chatContainer} 
            contentContainerStyle={{ paddingBottom: 100 }} 
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic" // Added this line for iOS to handle inset adjustments when the keyboard appears/disappears.
          >
            {messages.map((msg, index) => (
              <View 
                key={index} 
                style={[styles.message, msg.role === "user" ? styles.userMessage : styles.aiMessage]}
              >
                <Text style={styles.messageText}>{msg.content}</Text>
              </View>
            ))}
            {loading && <ActivityIndicator size="large" color="#FF4500" />}
          </ScrollView>

          <View style={styles.extraInputContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, isDarkMode ? styles.textDark : styles.textLight]}
                placeholder="Imagine if..."
                placeholderTextColor={isDarkMode ? "#BBB" : "#666"}
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity onPress={fetchScenario} style={styles.sendButton}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  dark: { backgroundColor: "#121212" },
  light: { backgroundColor: "#F5F5F5" },
  
  chatContainer: { flex: 1, marginBottom: 10 },
  
  message: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF2800",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#DDD",
  },
  messageText: { fontSize: 16, color: "black" },

  extraInputContainer: {
    paddingBottom: Platform.OS === "ios" ? 30 : 10,
    backgroundColor: "white",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    borderRadius: 8,
    padding: 5,
  },
  input: { flex: 1, padding: 10, fontSize: 16 },
  sendButton: {
    backgroundColor: "#FF2800",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
