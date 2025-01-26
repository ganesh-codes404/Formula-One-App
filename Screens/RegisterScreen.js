import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
export default function RegisterScreen() {
const RegisterScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [favTeam, setFavTeam] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/register', {
                ...data,
                favTeam
            });
            Alert.alert("Success", response.data.message);
        } catch (error) {
            Alert.alert("Error", error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <Controller
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        placeholder="Name"
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
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Text style={styles.label}>Select Your Favorite Team:</Text>
            <Picker
                selectedValue={favTeam}
                style={styles.picker}
                onValueChange={(itemValue) => setFavTeam(itemValue)}
            >
                <Picker.Item label="Select a team..." value="" />
                <Picker.Item label="Ferrari" value="Ferrari" />
                <Picker.Item label="Mercedes" value="Mercedes" />
                <Picker.Item label="Red Bull" value="Red Bull" />
                <Picker.Item label="McLaren" value="McLaren" />
                <Picker.Item label="Aston Martin" value="Aston Martin" />
                <Picker.Item label="Alpine" value="Alpine" />
                <Picker.Item label="Williams" value="Williams" />
                <Picker.Item label="Haas" value="Haas" />
                <Picker.Item label="AlphaTauri" value="AlphaTauri" />
                <Picker.Item label="Alfa Romeo" value="Alfa Romeo" />
            </Picker>

            {favTeam === '' && <Text style={styles.error}>Favorite team is required</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Registering..." : "Register"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff1e00',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});

}