import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Image, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import RegisterScreen from './RegisterScreen';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const logoPosition = useState(new Animated.Value(50))[0]; // Adjusted position upwards
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    Animated.timing(logoPosition, {
      toValue: -150, // Moves logo higher up
      duration: 1500,
      useNativeDriver: true,
    }).start(() => setShowSplash(false));
  }, []);

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

  if (showSplash) {
    return (
      <ImageBackground source={require("../assets/Login_background.jpg")} style={styles.background}>
        <View style={styles.splashContainer}>
          <Animated.Image
            source={require("../assets/purepng.com-formula-1-logoformula-1logonew2018-21529676510t61kq.png")}
            style={[styles.logo, { transform: [{ translateY: logoPosition }] }]}
          />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require("../assets/Login_background.jpg")} style={styles.background}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', padding: 20 }}>  
        <Image source={require("../assets/purepng.com-formula-1-logoformula-1logonew2018-21529676510t61kq.png")} style={styles.logo} />
        <Text style={styles.title}>WELCOME TO FORMULA 1</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="lightgray"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="lightgray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 15,
    padding: 12,
    fontFamily: 'Quicksand-Regular',
    fontWeight: "bold",
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 130,
    alignSelf: 'center',
    marginBottom: 20,
    tintColor: 'white',
  }
});