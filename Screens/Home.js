// import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
// import React, { useState, useEffect } from 'react';
// import { ProgressViewIOSBase } from "react-native";
// import  { useContext } from 'react';
// import {API_KEY} from "@env"
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const userSelectedTeam  = "Ferrari";
// export default function HomeScreen() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch dark mode preference
//     AsyncStorage.getItem("darkMode").then((value) => {
//       if (value !== null) {
//         setIsDarkMode(JSON.parse(value));
//       }
//     });

//     // Fetch F1 news
//     fetchF1News();
//   }, []);

//   const fetchF1News = async () => {
//     try {
//       const response = await fetch(
//         `https://newsapi.org/v2/everything?q=${userSelectedTeam}+F1&apiKey=${API_KEY}`
//       );
//       const data = await response.json();
//       setNews(data.articles);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderNewsItem = ({ item }) => (
//     <View style={styles.newsItem}>
//       <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
//       <Text style={styles.newsTitle}>{item.title}</Text>
//       <Text style={styles.newsDescription}>{item.description}</Text>
//     </View>
//   );

//   return (
//     <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
//       <Image source={require("../assets/Ferrari_Drivers.jpeg")} style={styles.image} />
//       <View style={styles.content}>
//         <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>
//           Latest {userSelectedTeam} News
//         </Text>
//         {loading ? (
//           <ActivityIndicator size="large" color="#F70D1A" />
//         ) : (
//           <FlatList data={news} keyExtractor={(item, index) => index.toString()} renderItem={renderNewsItem} />
//         )}
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 260,
//     position: 'absolute',
//     top: 0,
//     borderWidth: 4,
//     borderColor: "#F70D1A",
//   },
//   content: {
//     flex: 1,
//     marginTop: 270,
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: "#F70D1A",
//     marginBottom: 10,
//   },
//   newsItem: {
//     marginBottom: 20,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 10,
//     padding: 10,
//   },
//   newsImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//   },
//   newsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   newsDescription: {
//     fontSize: 14,
//     color: '#555',
//   },
// });

// import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
// import React, { useState, useEffect, useCallback } from "react";
// import { useFocusEffect } from "@react-navigation/native"; 
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_KEY } from "@env";

// const userSelectedTeam = "Ferrari";

// export default function HomeScreen() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useFocusEffect(
//     useCallback(() => {
//       const fetchDarkMode = async () => {
//         const value = await AsyncStorage.getItem("darkMode");
//         if (value !== null) {
//           setIsDarkMode(JSON.parse(value));
//         }
//       };
//       fetchDarkMode();
//     }, [])
//   );

//   useEffect(() => {
//     fetchF1News();
//   }, []);

//   const fetchF1News = async () => {
//     try {
//       const response = await fetch(
//         `https://newsapi.org/v2/everything?q=${userSelectedTeam}+F1&apiKey=${API_KEY}`
//       );
//       const data = await response.json();
//       setNews(data.articles || []);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderNewsItem = ({ item }) => (
//     <View style={[styles.newsItem, isDarkMode ? styles.newsItemDark : styles.newsItemLight]}>
//       {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />}
//       <Text style={[styles.newsTitle, isDarkMode ? styles.textDark : styles.textLight]}>
//         {item.title}
//       </Text>
//       <Text style={[styles.newsDescription, isDarkMode ? styles.textDark : styles.textLight]}>
//         {item.description}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      
//       {/* Driver Cards Section */}
//       <View style={styles.driverContainer}>
                
//       <View style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight]}>
//           <Image source={require("../assets/Leclerc_home.jpg")} style={styles.driverImage} />
//           <Text style={[styles.driverText, isDarkMode ? styles.textDark : styles.textLight]}>Charles Leclerc</Text>
//         </View>
//         <View style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight]}>
//           <Image source={require("../assets/Hamilton_home.jpg")} style={styles.driverImage} />
//           <Text style={[styles.driverText, isDarkMode ? styles.textDark : styles.textLight]}>Lewis Hamilton</Text>
//         </View>

//       </View>

//       <View style={styles.content}>
//         <Text style={[styles.header, isDarkMode ? styles.headerDark : styles.textLight]}>
//           Latest {userSelectedTeam} News
//         </Text>
//         {loading ? (
//           <ActivityIndicator size="large" color="#F70D1A" />
//         ) : (
//           <FlatList data={news} keyExtractor={(item, index) => index.toString()} renderItem={renderNewsItem} />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "flex-start", alignItems: "center" },
//   light: { backgroundColor: "white" },
//   dark: { backgroundColor: "#121212" },
//   textLight: { color: "black" },
//   textDark: { color: "white" },

//   // Driver Cards
//   driverContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginTop: 20,
//     paddingHorizontal: 10,
//   },
//   card: {
//     width: "45%",
//     borderRadius: 10,
//     overflow: "hidden",
//     alignItems: "center",
//     padding: 10,
//   },
//   cardLight: {
//     backgroundColor: "#f1f1f1",
//   },
//   cardDark: {
//     backgroundColor: "#222",
//   },
//   driverImage: {
//     width: "100%",
//     height: 150,
//     borderRadius: 10,
//   },
//   driverText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 5,
//   },

//   content: {
//     flex: 1,
//     marginTop: 20,
//     width: "100%",
//     paddingHorizontal: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#F70D1A",
//     marginBottom: 10,
//   },
//   headerDark: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#ff2800",
//     marginBottom: 10,
//   },

//   // News Item Styles
//   newsItem: {
//     marginBottom: 20,
//     borderRadius: 10,
//     padding: 10,
//   },
//   newsItemLight: {
//     backgroundColor: "#f1f1f1",
//   },
//   newsItemDark: {
//     backgroundColor: "#222",
//   },
//   newsImage: {
//     width: "100%",
//     height: 150,
//     borderRadius: 10,
//   },
//   newsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 5,
//   },
//   newsDescription: {
//     fontSize: 14,
//   },
// });

import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ScrollView } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@env";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const userSelectedTeam = "Ferrari";

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchF1News();
  }, []);

  const fetchF1News = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${userSelectedTeam}+F1&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => (
    <View style={[styles.newsItem, isDarkMode ? styles.newsItemDark : styles.newsItemLight]}>
      {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />}
      <Text style={[styles.newsTitle, isDarkMode ? styles.textDark : styles.textLight]}>
        {item.title}
      </Text>
      <Text style={[styles.newsDescription, isDarkMode ? styles.textDark : styles.textLight]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      <Text  style={[styles.meet, isDarkMode ? styles.meetDark : styles.textLight]}>Meet the Drivers</Text>
      {/* Driver Images - Refined Border & Layout */}
      <View style={styles.driverContainer}>
        
                <View style={styles.driverCard}>
          <Image source={require("../assets/Leclerc_home.jpg")} style={[styles.driverImage,isDarkMode ? styles.driverCardDark : styles.driverCard]} />
        </View>
        <View style={[styles.driverImage,isDarkMode ? styles.driverCardDark : styles.driverCard]}>
          <Image source={require("../assets/Hamilton_home.jpg")} style={[styles.driverImage,isDarkMode ? styles.driverCardDark : styles.driverCard]} />
        </View>

      </View>

      {/* News Section */}
      <View style={styles.content}>
        <Text style={[styles.header, isDarkMode ? styles.headerDark : styles.textLight]}>
          Latest {userSelectedTeam} News
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#F70D1A" />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNewsItem}
            scrollEnabled={false} // Prevents inner scrolling
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  light: { backgroundColor: "white" },
  dark: { backgroundColor: "#121212" },
  textLight: { color: "black" },
  textDark: { color: "white" },

  // Driver Card Styles (Improved Borders)
  driverContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 15, // Adds spacing between the cards
  },
  driverCardDark: {
    width: width * 0.45,
    backgroundColor: "#00000",
    borderRadius: 20, // More rounded edges
    overflow: "hidden",
    borderWidth: 2, // Subtle border effect
    borderColor: "#fff200", // Soft gray border for a premium look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // Stronger shadow for depth
  },
  driverCard: {
    width: width * 0.45,
    backgroundColor: "#00000",
    borderRadius: 20, // More rounded edges
    overflow: "hidden",
    borderWidth: 2, // Subtle border effect
    borderColor: "#fff200", // Soft gray border for a premium look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // Stronger shadow for depth
  },
  driverImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },

  // News Section
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F70D1A",
    marginBottom: 10,
  },
  headerDark: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff2800",
    marginBottom: 10,
  },
 meet:{      fontSize: 17,
  fontWeight: "bold",
  color: "#00000",
  marginBottom: 0,
paddingLeft:150,
paddingTop:10,},

  meetDark:{    fontSize: 17,
    fontWeight: "bold",
    color: "#ff2800",
    marginBottom: 0,
  paddingLeft:150,
paddingTop:10,},
  // News Item Styles
  newsItem: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  newsItemLight: {
    backgroundColor: "#f1f1f1",
  },
  newsItemDark: {
    backgroundColor: "#222",
  },
  newsImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  newsDescription: {
    fontSize: 14,
  },
});
