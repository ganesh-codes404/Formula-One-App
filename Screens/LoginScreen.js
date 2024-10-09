import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'pass') {
      navigation.replace('DrawerNavigation');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
      <View style={styles.container}>
        <Image
        source={require("../assets/Login_Screen_logo.jpeg")} style={styles.logo} />
        <Text style={styles.title}>WELCOME TO FORMULA 1</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} style={styles.handler} />
        <Button title="Register" onPress={handleLogin} style={styles.handler} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 30,
    fontFamily:"Arial",
    fontWeight:"bold",
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black ',
    borderWidth: 3,
    marginBottom: 12,
    padding: 10,
    fontWeight:"bold",
    borderRadius:20,
  },
  logo: {
    width: 350,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  handler:{
    fontWeight:"bold",
  }
});
