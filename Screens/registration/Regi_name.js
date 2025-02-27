import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RegisterNameScreen({ navigation, registrationData, setRegistrationData }) {
    const [name, setName] = useState(registrationData.name || '');

    const handleNext = () => {
        setRegistrationData({ ...registrationData, name });
        navigation.navigate('Email');
    };

    return (
        <View style={styles.container}>
            <Text>What's your name?</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Button title="Next" onPress={handleNext} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});