import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const standingsData = [
  {
    position: 1,
    driver: 'Verstappen',
    team: 'Red Bull Racing',
    points: 250,
    driver_image: ('/assets/Ver Small.jpeg'),
    wins: 17,
    losses: 9,
  },
  {
    position: 2,
    driver: 'Leclerc',
    team: 'Ferrari',
    points: 210,    driver_image: ('/assets/Ver.png'),
    wins: 15,
    losses: 11,
  },
  {
    position: 3,
    driver: ' Hamilton',
    team: 'Mercedes',
    points: 198,
    driver_image: ('/assets/Ver.png'),
    wins: 14,
    losses: 12,
  },
  {
    position: 4,
    driver: 'Lando Norris',
    team: 'McLaren',
    points: 180,
    wins: 13,
    losses: 13,
  },
  {
    position: 5,
    driver: 'Fernando Alonso',
    team: 'Aston Martin',
    points: 170,
    wins: 12,
    losses: 14,
  },
  {
    position: 6,
    driver: 'Oscar Piastri',
    team: 'McLaren',
    points: 170,
    wins: 12,
    losses: 14,
  },
  {
    position: 7,
    driver: 'Nico Hulkenberg',
    team: 'Haas',
    points: 170,
    wins: 12,
    losses: 14,
  },
  {
    position: 8,
    driver: 'Lance Stroll',
    team: 'Aston Martin',
    points: 170,
    wins: 12,
    losses: 14,
  },
];

export default function StandingsScreen() {
  const renderPodium = () => {
    const podiumDrivers = standingsData.slice(0, 3);

    return (
      <View style={styles.podiumContainer}>
        {podiumDrivers.map((driver) => (
          <View
            key={driver.position}
            style={[
              styles.podiumSpot,
              {
                height:
                  driver.position === 1
                    ? 250
                    : 150 + ( 1+driver.position) * 50,
              },
            ]}
          >
            <View style={styles.imageClipPath}>
              <Image source={driver.driver_image} style={styles.podiumImage} />
            </View>
            <Text style={styles.podiumPosition}>{driver.position}</Text>
            <Text style={styles.podiumDriver}>{driver.driver}</Text>
            <Text style={styles.podiumTeam}>{driver.team}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    if (item.position > 3) {
      return (
        <View style={styles.standingsRow}>
          <Text style={styles.positionText}>{item.position}.</Text>
          <Text style={styles.driverText}>{item.driver}</Text>
          <Text style={styles.teamText}>{item.team}</Text>
          <Text style={styles.pointsText}>{item.points} PTS</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>2025 F1 Standings</Text>
      {renderPodium()}
      <FlatList
        data={standingsData.slice(3)}
        renderItem={renderItem}
        keyExtractor={(item) => item.driver}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  podiumSpot: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#333',
    width: 110,
    borderRadius: 10,
    marginBottom: 10,
  },
  podiumImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  podiumPosition: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  podiumDriver: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  podiumTeam: {
    color: 'white',
    fontSize: 14,
    marginTop: 3,
    marginBottom: 10,
  },
  imageClipPath: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  standingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  positionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
  },
  driverText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  teamText: {
    color: 'white',
    fontSize: 14,
    width: 120,
    textAlign: 'right',
  },
  pointsText: {
    color: 'white',
    fontSize: 14,
    width: 80,
    textAlign: 'right',
  },
});