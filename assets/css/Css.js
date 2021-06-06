import {StyleSheet} from "react-native";

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTop: {
      justifyContent: 'flex-start'
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
    },
    area__tab: {
      backgroundColor: '#0e71a8',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    },
    area__menu:{
      flexDirection: 'row',
      paddingTop: 40,
      paddingBottom: 10,
      width: '100%',
      backgroundColor:'#0e71a8',
      alignItems:'center',
      justifyContent:'center'
    },
    button__home2:{
        textAlign:'left'
    },
    area__title:{
        width: '80%',
        fontWeight:'bold',
        fontSize:20,
        color:'#fff',
        textAlign:'center'
    },
    button__logout:{
        textAlign:'right'
    },
    qr__code:(display='flex')=>({
      width:'100%',
      height:'100%',
      backgroundColor:'#000',
      justifyContent:'center',
      display: display
    }),
    qr__form:(display='none')=>({
      width: '100%',
      display:display
    }),
    rescanner__button: {
      marginTop: 20
    },
    sucess__text: {
      marginTop: 10,
      marginBottom: 10,
      textAlign: "center",
      backgroundColor: "#16ff16"
    },
    rastreio__inputMargin:{
      marginTop: 20,
      marginBottom: 30,
      borderColor: '#0e71a8',
      borderBottomWidth: 1,
    },
    inputBox:{
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 15,
    },
    texte__profile: {
      fontSize: 25,
      fontWeight: 'bold'
    },
    msg__rastreio:{
      marginTop: 10,
      marginBottom: 10,
      padding: 15,
      fontSize: 18,
      backgroundColor:'#d2e1f6',
      marginTop: 15
    }
  });

  export {css};