// import * as tf from '@tensorflow/tfjs';
// import { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// export default function Predictions() { {
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   useEffect(() => {
//     const loadModel = async () => {
//       try {
//         const loadedModel = await tf.loadLayersModel('path/to/model.json');
//         setModel(loadedModel);
//       } catch (error) {
//         console.log('Error loading model:', error);
//       }
//     };
//     loadModel();
//   }, []);

//   const handlePredict = async () => {
//     if (model) {
//       const inputData = tf.tensor2d([[/* Insert race data here */]]);
      

//       const predictionOutput = model.predict(inputData);
//       const predictedValue = predictionOutput.dataSync();
//       setPrediction(predictedValue);
//     }
//   };

//   return (
//     <View>
//       <Text>Prediction Screen</Text>
//       {prediction && <Text>Predicted Winner: {prediction}</Text>}
//       <Button title="Make Prediction" onPress={handlePredict} />
//     </View>
//   );
// };
// }
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Predictions() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://127.0.0.1:5000"; // Replace with your actual Colab ngrok URL

  const fetchPrediction = async () => {
    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post(`${BASE_URL}/predict`, {
        inputData: { drivers: "current-season" },
      });
      const { winner, team, adjusted_score } = response.data;
      setPrediction(`Winner: ${winner} (Team: ${team}, Score: ${adjusted_score})`);
    } catch (error) {
      console.error("Error fetching prediction:", error.message);
      console.error("Response data:", error.response?.data);
      setPrediction("Error fetching prediction. Please try again.");
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>F1 Race Winner Prediction</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && <Text style={styles.prediction}>{prediction}</Text>}
      <Button title="Get Prediction" onPress={fetchPrediction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  prediction: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
});
