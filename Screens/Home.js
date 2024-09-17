import { StyleSheet, Text, View, Image } from "react-native";
import React from 'react';

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Image
          source={require('/Users/ganeshk/Formula1/Components/Ferrari_Drivers.jpeg')}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text>Home Screen</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Full width of the screen
    height: 260,   // Adjust based on the desired image height
    position: 'absolute',
    top: 0,
    borderWidth:4,
    borderColor:"#F70D1A",
  },
  content: {
    flex: 1,
    marginTop: 200, // Add margin to push content below the image
    justifyContent: 'center',
    alignItems: 'center',
  },
});
