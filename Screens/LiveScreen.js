import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Svg, Circle, Path } from "react-native-svg";

// Circuit Layouts (Replace with real SVG paths)
const trackLayouts = {
  monza: "M 100 350 Q 200 50, 300 350 T 500 350",
  silverstone: "M 50 100 C 150 50, 250 150, 350 100 T 500 100",
  spa: "M 50 300 C 150 50, 300 50, 350 200 T 450 300",
  monaco: "M 100 300 C 200 100, 350 150, 400 300",
  suzuka: "M 50 200 C 150 50, 250 100, 350 200 T 450 250",
  interlagos: "M 75 300 C 175 100, 275 150, 375 300",
};

// GPS Coordinate Mapping for each track
const trackBounds = {
  monza: { minLat: 45.615, maxLat: 45.63, minLon: 9.27, maxLon: 9.29 },
  silverstone: { minLat: 52.06, maxLat: 52.08, minLon: -1.02, maxLon: -0.99 },
  spa: { minLat: 50.42, maxLat: 50.44, minLon: 5.96, maxLon: 6.00 },
  monaco: { minLat: 43.73, maxLat: 43.74, minLon: 7.41, maxLon: 7.43 },
  suzuka: { minLat: 34.85, maxLat: 34.87, minLon: 136.58, maxLon: 136.61 },
  interlagos: { minLat: -23.71, maxLat: -23.70, minLon: -46.69, maxLon: -46.68 },
};

// Function to map GPS coordinates to SVG (x, y)
const convertLatLonToXY = (lat, lon, bounds) => {
  const { minLat, maxLat, minLon, maxLon } = bounds;
  const x = ((lon - minLon) / (maxLon - minLon)) * 400;
  const y = ((lat - minLat) / (maxLat - minLat)) * 400;
  return { x, y };
};

export default function LiveScreen() {
  const [currentTrack, setCurrentTrack] = useState("monza"); // Default
  const [drivers, setDrivers] = useState([]);

  // Fetch the current race track from OpenF1 API
  const fetchCurrentRaceTrack = async () => {
    try {
      const response = await fetch("https://api.openf1.org/v1/race/current");
      const data = await response.json();
      if (data.length > 0) {
        const trackName = data[0].circuit_name.toLowerCase();
        if (trackLayouts[trackName]) {
          setCurrentTrack(trackName);
        }
      }
    } catch (error) {
      console.log("Error fetching race track:", error);
    }
  };

  // Fetch live driver positions
  const fetchDriverPositions = async () => {
    try {
      const response = await fetch("https://api.openf1.org/v1/live?session_key=current");
      const data = await response.json();

      if (trackBounds[currentTrack]) {
        const mappedDrivers = data.map(driver => {
          const { x, y } = convertLatLonToXY(
            driver.latitude,
            driver.longitude,
            trackBounds[currentTrack]
          );
          return { x, y, color: driver.team_color || "blue" };
        });

        setDrivers(mappedDrivers);
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
    }
  };

  useEffect(() => {
    fetchCurrentRaceTrack(); // Get track when component loads
    fetchDriverPositions(); // Fetch initial driver positions
    const interval = setInterval(fetchDriverPositions, 5000); // Update every 5 sec
    return () => clearInterval(interval);
  }, [currentTrack]); // Re-fetch when track changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Race: {currentTrack.toUpperCase()}</Text>
      <Svg width="100%" height="80%" viewBox="0 0 400 400">
        {/* Dynamic Track Path */}
        <Path d={trackLayouts[currentTrack] || trackLayouts.monza} stroke="black" fill="none" strokeWidth="3" />
        {/* Driver Dots */}
        {drivers.map((driver, index) => (
          <Circle key={index} cx={driver.x} cy={driver.y} r="5" fill={driver.color} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
