import { View, Text, FlatList, Image } from "react-native";
import { Card } from "react-native-paper";


const standingsData = [
  {
    position: 1,
    driver: "Max Verstappen",
    team: "Red Bull Racing",
    points: 250,
    driver_image: "https://i.imgur.com/FcG5Pdi.png",
  },
  {
    position: 2,
    driver: "Charles Leclerc",
    team: "Ferrari",
    points: 210,
    driver_image: "https://i.imgur.com/7S8HPdB.png",
  },
  {
    position: 3,
    driver: "Lewis Hamilton",
    team: "Mercedes",
    points: 198,
    driver_image: "https://i.imgur.com/q9OcxXH.png",
  },
  {
    position: 4,
    driver: "Lando Norris",
    team: "McLaren",
    points: 180,
    driver_image: "https://i.imgur.com/xSxoZaS.png",
  },
  {
    position: 5,
    driver: "Fernando Alonso",
    team: "Aston Martin",
    points: 170,
    driver_image: "https://i.imgur.com/Qbjw9fP.png",
  },
  {
    position: 6,
    driver: "Sergio Perez",
    team: "Red Bull Racing",
    points: 160,
    driver_image: "https://i.imgur.com/r8ZzxMb.png",
  },
  {
    position: 7,
    driver: "Carlos Sainz",
    team: "Ferrari",
    points: 150,
    driver_image: "https://i.imgur.com/t1R64oP.png",
  },
];

const teamColors = {
  "Red Bull Racing": "#1E41FF",
  Ferrari: "#DC0000",
  Mercedes: "#00D2BE",
  McLaren: "#FF8700",
  "Aston Martin": "#006F62",
};

export default function StandingsScreen() {
  const renderItem = ({ item }) => (
    <Card
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: teamColors[item.team] || "#555",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        {item.position}.
      </Text>
      <Image
        source={{ uri: item.driver_image }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginHorizontal: 10,
        }}
      />
      <View>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {item.driver}
        </Text>
        <Text style={{ fontSize: 16, color: "white", opacity: 0.8 }}>
          {item.team} - {item.points} PTS
        </Text>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#121212" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          color: "white",
          textAlign: "center",
        }}
      >
        2025 F1 Standings
      </Text>
      <FlatList
        data={standingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.driver}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


