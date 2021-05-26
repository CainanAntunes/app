import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {css} from '../../assets/css/Css';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';


export default function Cadastro({navigation}) {
    

    return (
        <View style={[css.container,css.containerTop]}>
            <MenuAreaRestrita title='Cadastro' navigation={navigation}/>
        </View>
    );
    
}