import React, {useState,useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, BackHandler, Alert} from 'react-native';
import {css} from '../assets/css/Css';

export default function Home({navigation}) {
    

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    BackHandler.exitApp();
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
        <View style={css.container1}>

            <TouchableOpacity style={css.button__home} onPress={()=>navigation.navigate('Login')}>
                <Image source={require('../assets/img/loginButton.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Rastreio')}>
                <Image source={require('../assets/img/rastreioButton1.png')}/>
            </TouchableOpacity>

        </View>
    );
}