import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator for Login
import HomeScreen from './Screens/Home';
import SettingsScreen from './Screens/Settings';
import ProfileScreen from './Screens/ProfileScreen';
import StandingsScreen from './Screens/Standings';
import LoginScreen from './Screens/LoginScreen'; // Import the new Login screen
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Predictions from './Screens/Predictions';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Custom Drawer Content with Image
const CustomDrawerContent = (props) => (
  <View style={{ flex: 1 }}>
    {/* Company Logo */}
    <Image source={require('./assets/Logo.jpg')} style={styles.logo} />
    {/* Drawer Items */}
    <DrawerItemList {...props} />
  </View>
);

const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
        drawerIcon: ({ focused, size }) => (
          <Ionicons name={focused ? "home" : "home-outline"} size={24} color={"black"} />
        ),
      }}
    />
    <Drawer.Screen
      name="Standings"
      component={StandingsScreen}
      options={{
        title: 'Standings',
        drawerIcon: ({ focused, size }) => (
          <MaterialCommunityIcons name={focused ? "medal" : "medal-outline"} size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Predictions"
      component={Predictions}
      options={{
        title: 'Preditcions',
        drawerIcon: ({ focused, size }) => (
          <Ionicons name={focused ? "bulb-sharp" : "bulb-outline"} size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'User Account',
        drawerIcon: ({ focused, size }) => (
          <Ionicons name={focused ? "car-sport" : "car-sport-outline"} size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Settings',
        drawerIcon: ({ focused, size }) => (
          <Ionicons name={focused ? "settings-sharp" : "settings-outline"} size={24} color="black" />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for the login screen
        />
        {/* Drawer Navigation after Login */}
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }} // Hide header in the drawer after login
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,  // Adjust height based on your logo size
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
