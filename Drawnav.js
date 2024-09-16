import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/Home';
import SettingsScreen from './Screens/Settings';
import ProfileScreen from './Screens/ProfileScreen';
import StandingsScreen from './Screens/Standings';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




const Drawer = createDrawerNavigator();

// Custom Drawer Content with Image
const CustomDrawerContent = (props) => (
  <View style={{ flex: 1 }}>
    {/* Company Logo */}
    <Image source={require('/Users/ganeshk/Formula1/Components/Logo.jpg')}style={styles.logo}/>
    {/* Drawer Items */}
    <DrawerItemList {...props} /> 
  </View>
);


const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,  // Adjust height based on your logo size
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default function Navigation() {
  return (
    <NavigationContainer>
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
          component={StandingsScreen}
          options={{
            title: 'Preditcions',
            drawerIcon: ({ focused, size }) => (
              <Ionicons name={focused ? "bulb-sharp" : "bulb-outline" } size={24} color="black" />
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
    </NavigationContainer>
  );
}
