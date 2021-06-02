import React, {useState,useEffect} from 'react';
import { Text, View, Button, Alert } from 'react-native';
import {css} from './assets/css/Css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './views/Home';
import Login from './views/Login';
import Rastreio from './views/Rastreio';
import AreaRestrita from './views/areaRestrita/AreaRestrita';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options=
            {{
              title: "Track it",
              headerStyle: {backgroundColor: '#0e71a8' },
              headerTintColor: '#333',
              headerTitleStyle: 
              {
                fontWeight: 'bold', 
                alignSelf: 'center',
                color: '#fff', 
                fontSize: 30
              }
            }} 
          />
          <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
          <Stack.Screen name="Rastreio" component={Rastreio} 
            options=
            {{
              title: "Rastreie sua encomenda",
              headerStyle: {backgroundColor: '#0e71a8' },
              headerTintColor: '#333',
              headerTitleStyle: 
              {
                fontWeight: 'bold', 
                color: '#fff', 
                fontSize: 20
              }
            }} 
          />
          <Stack.Screen name="AreaRestrita" options={{headerShown: false}} component={AreaRestrita} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};