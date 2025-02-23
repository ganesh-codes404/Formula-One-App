
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import RegisterScreen from './RegisterScreen';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validTeams = {
    Ferrari: 'ferrari123',
    Mercedes: 'mercedes123',
    RedBull: 'redbull123',
    McLaren: 'mclaren123',
    AstonMartin: 'astonmartin123',
    Alpine: 'alpine123',
    Williams: 'williams123',
    AlphaTauri: 'alphatauri123',
    AlfaRomeo: 'alfaromeo123',
    Haas: 'haas123',
  };

  const handleLogin = () => {
    if (validTeams[username] && password === validTeams[username]) {
      navigation.replace('DrawerNavigation');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Login_Screen_logo.jpeg")} style={styles.logo} />
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.replace('RegisterScreen')} />
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
    fontFamily: "Arial",
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 12,
    padding: 10,
    fontWeight: "bold",
    borderRadius: 20,
  },
  logo: {
    width: 350,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  }
});