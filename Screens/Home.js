import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';

// Mock user's chosen F1 team (In production, retrieve from app state or API)
const userSelectedTeam = "Ferrari"; 

export default function HomeScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchF1News();
  }, []);

  const fetchF1News = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${userSelectedTeam}+F1&apiKey=82263c022e2840eb870af4b65870e179`);

      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Ferrari_Drivers.jpeg')} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.header}>Latest {userSelectedTeam} News</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#F70D1A" />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNewsItem}
          />
        )}
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
    width: '100%',
    height: 260,
    position: 'absolute',
    top: 0,
    borderWidth: 4,
    borderColor: "#F70D1A",
  },
  content: {
    flex: 1,
    marginTop: 270,
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#F70D1A",
    marginBottom: 10,
  },
  newsItem: {
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#555',
  },
});