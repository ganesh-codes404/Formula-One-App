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
// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// export default function Predictions() {
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const BASE_URL = "http://127.0.0.1:5000"; // Replace with your actual Colab ngrok URL

//   const fetchPrediction = async () => {
//     setLoading(true);
//     setPrediction(null);

//     try {
//       const response = await axios.post(`${BASE_URL}/predict`, {
//         inputData: { drivers: "current-season" },
//       });
//       const { winner, team, adjusted_score } = response.data;
//       setPrediction(`Winner: ${winner} (Team: ${team}, Score: ${adjusted_score})`);
//     } catch (error) {
//       console.error("Error fetching prediction:", error.message);
//       console.error("Response data:", error.response?.data);
//       setPrediction("Error fetching prediction. Please try again.");
//     }
    
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>F1 Race Winner Prediction</Text>
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}
//       {prediction && <Text style={styles.prediction}>{prediction}</Text>}
//       <Button title="Get Prediction" onPress={fetchPrediction} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   prediction: {
//     fontSize: 16,
//     color: 'green',
//     marginTop: 20,
//     textAlign: 'center',
//   },
// });
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native"; // Required for React Native compatibility

export default function Predictions() {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(true); // Track model training status

  useEffect(() => {
    const trainModel = async () => {
      try {
        console.log("Initializing TensorFlow...");
        await tf.ready(); // Ensure TensorFlow is initialized
        console.log("TensorFlow initialized.");

        // Hardcoded dataset
        console.log("Creating dataset...");
        const trainingData = tf.tensor2d(
          [
            [1.42, 1, 0, 1], // Example input 1
            [1.41, 0, 1, 1], // Example input 2
            [1.43, 0, 0, 1], // Example input 3
          ],
          [3, 4] // Shape: 3 rows, 4 columns
        );
        const outputData = tf.tensor2d(
          [
            [1], // Output for input 1
            [2], // Output for input 2
            [3], // Output for input 3
          ],
          [3, 1] // Shape: 3 rows, 1 column
        );

        console.log("Dataset created.");

        // Define the model
        console.log("Creating model...");
        const newModel = tf.sequential();
        newModel.add(tf.layers.dense({ units: 16, activation: "relu", inputShape: [4] }));
        newModel.add(tf.layers.dense({ units: 8, activation: "relu" }));
        newModel.add(tf.layers.dense({ units: 1, activation: "linear" }));

        newModel.compile({
          optimizer: tf.train.adam(),
          loss: "meanSquaredError",
        });

        console.log("Training model...");
        await newModel.fit(trainingData, outputData, {
          epochs: 20,
          verbose: 0, // No console logs during training
        });

        console.log("Model training complete.");
        setModel(newModel); // Set the model after training
      } catch (error) {
        console.error("Error training the model:", error);
      } finally {
        setTraining(false); // Mark training as complete
      }
    };

    trainModel();
  }, []);

  const handlePredict = async () => {
    if (training || !model) {
      console.error("Model not ready for predictions yet.");
      return;
    }

    setLoading(true);
    try {
      // Example input for prediction
      const inputData = tf.tensor2d([[1.42, 1, 0, 1]]); // Replace with actual input values

      console.log("Predicting...");
      const predictionOutput = model.predict(inputData);
      const predictedValue = predictionOutput.dataSync()[0];

      setPrediction(`Predicted Race Result: Position ${Math.round(predictedValue)}`);
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>F1 Race Winner Prediction</Text>
      {training ? (
        <Text style={styles.training}>Training the model, please wait...</Text>
      ) : (
        <Button title="Predict" onPress={handlePredict} />
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && <Text style={styles.prediction}>{prediction}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  training: {
    fontSize: 16,
    color: "orange",
    marginBottom: 20,
  },
  prediction: {
    fontSize: 16,
    color: "green",
    marginTop: 20,
    textAlign: "center",
  },
});
