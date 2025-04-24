// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const standingsData = [
//   {
//     position: 1,
//     driver: 'Verstappen',
//     team: 'Red Bull Racing',
//     points: 250,
//     driver_image: require('../assets/Max.jpg'),
//     wins: 17,
//     podiums: 18,
//   },
//   {
//     position: 2,
//     driver: 'Leclerc',
//     team: 'Ferrari',
//     points: 210,
//     driver_image: require('../assets/Leclerc_home.jpg'),
//     wins: 15,
//     podiums: 16,
//   },
//   {
//     position: 3,
//     driver: 'Hamilton',
//     team: 'Mercedes',
//     points: 198,
//     driver_image: require('../assets/Hamilton_home.jpg'),
//     wins: 14,
//     podiums: 15,
//   },
//   {
//     position: 4,
//     driver: 'Lando Norris',
//     team: 'McLaren',
//     points: 180,
//     wins: 13,
//     podiums: 14,
//   },
//   {
//     position: 5,
//     driver: 'Fernando Alonso',
//     team: 'Aston Martin',
//     points: 170,
//     wins: 12,
//     podiums: 13,
//   },
// ];

// export default function StandingsScreen() {
//   const renderPodium = () => (
//     <View style={styles.podiumContainer}>
//       {standingsData.slice(0, 3).map((driver) => (
//         <View key={driver.position} style={styles.card}>
//           <Image source={driver.driver_image} style={styles.driverImage} />
//           <Text style={styles.driverName}>{driver.driver}</Text>
//           <Text style={styles.teamName}>{driver.team}</Text>
//           <Text style={styles.stats}>🏁 {driver.points} pts</Text>
//           <Text style={styles.stats}>🥇 {driver.wins} wins</Text>
//           <Text style={styles.stats}>🥈 {driver.podiums} podiums</Text>
//         </View>
//       ))}
//     </View>
//   );

//   const renderItem = ({ item }) => (
//     <View style={styles.standingsRow}>
//       <Text style={styles.positionText}>{item.position}.</Text>
//       <Text style={styles.driverText}>{item.driver}</Text>
//       <Text style={styles.statsText}>{item.points} PTS</Text>
//       <Text style={styles.statsText}>{item.wins} Wins</Text>
//       <Text style={styles.statsText}>{item.podiums} Podiums</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🏎️ 2025 F1 Standings</Text>
//       {renderPodium()}
//       <FlatList
//         data={standingsData.slice(3)}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.driver}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     backgroundColor: '#0f0f0f',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 20,
//     color: '#f1f1f1',
//     textAlign: 'center',
//     letterSpacing: 1,
//   },
//   podiumContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: '#1e1e1e',
//     padding: 16,
//     borderRadius: 18,
//     alignItems: 'center',
//     width: width * 0.28,
//     shadowColor: '#fff',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   driverImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 50,
//     marginBottom: 10,
//     borderWidth: 2,
//     borderColor: '#FFD700',
//   },
//   driverName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   teamName: {
//     color: '#ccc',
//     fontSize: 13,
//     marginBottom: 5,
//   },
//   stats: {
//     color: '#fff',
//     fontSize: 12,
//     marginVertical: 1,
//   },
//   standingsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     backgroundColor: '#181818',
//     borderRadius: 10,
//     marginVertical: 6,
//     marginHorizontal: 10,
//   },
//   positionText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: 'bold',
//     width: 30,
//   },
//   driverText: {
//     color: '#fff',
//     fontSize: 16,
//     flex: 1,
//     marginLeft: 10,
//   },
//   statsText: {
//     color: '#aaa',
//     fontSize: 14,
//     width: 80,
//     textAlign: 'right',
//   },
// });
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const standingsData = [
  {
    position: 1,
    driver: 'Verstappen',
    team: 'Red Bull Racing',
    points: 454,
    driver_image: require('../assets/Max.jpg'),
    wins: 15,
    podiums: 17,
  },
  {
    position: 2,
    driver: 'Leclerc',
    team: 'Ferrari',
    points: 308,
    driver_image: require('../assets/Max.jpg'),
    wins: 3,
    podiums: 11,
  },
  {
    position: 3,
    driver: 'Perez',
    team: 'Red Bull Racing',
    points: 305,
    driver_image: require('../assets/Max.jpg'),
    wins: 2,
    podiums: 11,
  },
  {
    position: 4,
    driver: 'Russell',
    team: 'Mercedes',
    points: 275,
    wins: 1,
    podiums: 8,
  },
  {
    position: 5,
    driver: 'Sainz',
    team: 'Ferrari',
    points: 246,
    wins: 1,
    podiums: 9,
  },
  {
    position: 6,
    driver: 'Hamilton',
    team: 'Mercedes',
    points: 240,
    wins: 0,
    podiums: 9,
  },
  {
    position: 7,
    driver: 'Norris',
    team: 'McLaren',
    points: 122,
    wins: 0,
    podiums: 1,
  },
];

export default function StandingsScreen() {
  const renderPodium = () => (
    <View style={styles.podiumContainer}>
      {[1, 0, 2].map((i, idx) => {
        const driver = standingsData[i];
        return (
          <View key={driver.position} style={[styles.card, idx === 1 && { marginTop: 0 }, idx !== 1 && { marginTop: 30 }]}>
            <Image source={driver.driver_image} style={styles.driverImage} />
            <Text style={styles.driverName}>{driver.driver}</Text>
            <Text style={styles.teamName}>{driver.team}</Text>
            <Text style={styles.stats}>🏁 {driver.points} pts</Text>
            <Text style={styles.stats}>🥇 {driver.wins} wins</Text>
            <Text style={styles.stats}>🥈 {driver.podiums} podiums</Text>
          </View>
        );
      })}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.standingsRow}>
      <Text style={styles.positionText}>{item.position}.</Text>
      <Text style={styles.driverText}>{item.driver}</Text>
      <Text style={styles.statsText}>{item.points} PTS</Text>
      <Text style={styles.statsText}>{item.wins} Wins</Text>
      <Text style={styles.statsText}>{item.podiums} Podiums</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏎️ 2022 F1 Standings</Text>
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
    paddingTop: 50,
    backgroundColor: '#0f0f0f',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#f1f1f1',
    textAlign: 'center',
    letterSpacing: 1,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    width: width * 0.28,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  driverName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamName: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 5,
  },
  stats: {
    color: '#fff',
    fontSize: 12,
    marginVertical: 1,
  },
  standingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#181818',
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  positionText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
  },
  driverText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  statsText: {
    color: '#aaa',
    fontSize: 14,
    width: 80,
    textAlign: 'right',
  },
});
