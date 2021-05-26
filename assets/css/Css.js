import {StyleSheet} from "react-native";

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container1: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button__home: {
      marginRight: 40
    },
    darkbg: {
      backgroundColor: "#0e71a8"
    },
    login__logoText:{
      fontWeight: "bold",
      fontSize: 40,
      color: "#fff",
      marginBottom: 20
    },
    login__msg: (text = 'none')=> ({
      fontWeight: "bold",
      fontSize: 22,
      color: "red",
      marginTop: 10,
      marginBottom: 15,
      display: text
    }),
    login__form:{
      width: "80%"
    },
    login__input:{
      backgroundColor: "#fff",
      fontSize: 19,
      padding: 7,
      marginBottom: 15
    },
    login__button:{
      padding: 12,
      backgroundColor: "#16ff16",
      alignSelf: "center",
      borderRadius: 5
    },
    login__buttonText:{
      fontWeight: "bold",
      fontSize: 19,
      color: "#fff"
    }
  });

  export {css};