import React, {useState,useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useEffect, useState } from 'react/cjs/react.production.min';

export default function AreaRestrita() {
    
    const [user,setUser]=useState(null);

    useEffect(()=>{
       async function getUser()
       {
           let response = await AsyncStorage.getItem('userData');
           let json = JSON.parse(response);
           setUser(json.name);
       }
       getUser();
    });

    return (
        <View>
            <Text>Essa é a area restrita</Text>
            <Text>Seja bem vindo(a) {user}!</Text>
        </View>
    );
}