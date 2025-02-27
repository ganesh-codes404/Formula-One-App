import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterNameScreen from './screens/RegisterNameScreen';
import RegisterEmailScreen from './screens/RegisterEmailScreen';
import RegisterPasswordScreen from './screens/RegisterPasswordScreen';
import RegisterTeamScreen from './screens/RegisterTeamScreen';

const Stack = createStackNavigator();

export default function Regi_Nav() {
    const [registrationData, setRegistrationData] = useState({});

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Name" children={(props) => <RegisterNameScreen {...props} registrationData={registrationData} setRegistrationData={setRegistrationData} />} />
                <Stack.Screen name="Email" children={(props) => <RegisterEmailScreen {...props} registrationData={registrationData} setRegistrationData={setRegistrationData} />} />
                <Stack.Screen name="Password" children={(props) => <RegisterPasswordScreen {...props} registrationData={registrationData} setRegistrationData={setRegistrationData} />} />
                <Stack.Screen name="Team" children={(props) => <RegisterTeamScreen {...props} registrationData={registrationData} setRegistrationData={setRegistrationData} />} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}