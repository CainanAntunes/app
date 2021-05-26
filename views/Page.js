import React from 'react';
import { View, Text, ProgressViewIOSComponent } from 'react-native';
import {css} from '../assets/css/Css';

export default function Page(props) 
{
    return(
        <View style={css.textPage}>
            <Text>
                Olá {props.name}! Voce está na {props.empresa}.
                Você comprou {props.quantidade} {props.produto}(s).
            </Text>
        </View>
    );
}