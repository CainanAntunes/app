import React, {useState,useEffect} from 'react';
import {Text, View, Button, Settings} from 'react-native';
import {css} from '../../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
import Cadastro from './Cadastro';
import Edicao from './Edicao';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { useEffect, useState } from 'react/cjs/react.production.min';

export default function AreaRestrita() {
    
    const Tab = createMaterialBottomTabNavigator();
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
        <Tab.Navigator
                activeColor='#fff'
                inactiveColor='#999'
                barStyle={css.area__tab}
        >

            <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                    tabBarIcon:()=>(
                        <Icon name="users" size={22} color="#fff" />
                    )
                }}
            />
            <Tab.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{
                    tabBarIcon:()=>(
                        <Icon name="archive" size={22} color="#fff" />
                    )
                }}
            />
            <Tab.Screen
                    name="Edicao"
                    component={Edicao}
                    options={{
                    tabBarIcon:()=>(
                        <Icon name="edit" size={25} color="#fff" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}