import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Drawnav';

// import Navigation from './bottomnav';

// export default function App() {
//   return (
//     <>
//     {/* <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//       <DrawNavigation/> */}
//       <Navigation/>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

// Create drawer navigator
const Drawer = createDrawerNavigator();

// Sample screens for the drawer navigation

// Main App component
export default function App() {
  return (
    <>
    <Navigation/>
    </>
  );
}
