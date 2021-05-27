import React, {useState,useEffect} from 'react';
import {Text, View, Button, Settings, BackHandler, Alert} from 'react-native';
import {css} from '../../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
import Cadastro from './Cadastro';
import Edicao from './Edicao';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AreaRestrita({navigation}) {
    
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

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Alerta!", "Fazer Logout?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    navigation.navigate('Home');
                    }
                }
            ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    }, []);

    return (
        <Tab.Navigator
                activeColor='#fff'
                inactiveColor='#999'
                barStyle={css.area__tab}
        >

            <Tab.Screen
                    name="Senha"
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