import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';


export default function RegisterScreen({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [favTeam, setFavTeam] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/register', { ...data, favTeam });
            Alert.alert("Success", response.data.message);
            navigation.replace('LoginScreen');
        } catch (error) {
            Alert.alert("Error", error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require("../assets/Login_background.jpg")} style={styles.background}>
            <View style={styles.container}>
                <Image source={require("../assets/purepng.com-formula-1-logoformula-1logonew2018-21529676510t61kq.png")} style={styles.logo} />
                <Text style={styles.title}>REGISTER</Text>
                
                <Controller
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput 
                            placeholder="Name"
                            placeholderTextColor="lightgray"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                    name="name"
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                
                <Controller
                    control={control}
                    rules={{ 
                        required: "Email is required", 
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } 
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput 
                            placeholder="Email"
                            placeholderTextColor="lightgray"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                
                <Controller
                    control={control}
                    rules={{ required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput 
                            placeholder="Password"
                            placeholderTextColor="lightgray"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                
                <Text style={styles.label}>Favorite Team:</Text>
                <Picker
                    selectedValue={favTeam}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFavTeam(itemValue)}>
                    <Picker.Item label="Select a team..." value="" />
                    <Picker.Item label="Ferrari" value="Ferrari" />
                    <Picker.Item label="Mercedes" value="Mercedes" />
                    <Picker.Item label="Red Bull" value="Red Bull" />
                    <Picker.Item label="McLaren" value="McLaren" />
                    <Picker.Item label="Aston Martin" value="Aston Martin" />
                    <Picker.Item label="Alpine" value="Alpine" />
                    <Picker.Item label="Williams" value="Williams" />
                    <Picker.Item label="Haas" value="Haas" />
                    <Picker.Item label="Racing Bulls" value="Racing Bulls" />
                    <Picker.Item label="Kick Sauber" value="Kick Sauber" />
                </Picker>
                {favTeam === '' && <Text style={styles.error}>Favorite team is required</Text>}
                
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Registering..." : "Register"}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
        tintColor: 'white',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 15,
        padding: 12,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        textAlign: 'center',
    },
    picker: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        borderRadius: 25,
    },
    button: {
        width: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: 'white',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});
