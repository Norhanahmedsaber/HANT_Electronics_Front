import React from "react";
import { View, Text,Button,TextInput, StyleSheet } from "react-native";

const LoginScreen = () => {
    return (
        <View style={styles.PageContainer}>
             <TextInput style={styles.textInputContainer} placeholder="Username" be/>
             <TextInput style={styles.textInputContainer}  placeholder="Password"/>
            <View style={styles.SignInContainer}>
                <Button title="Sign In"/>
            </View>
            <View  style={styles.GuestContainer}>
            <Button title="Guest"></Button>
        </View>
            <View style={styles.SignUpContainer}>
                <Text>I donot have an account </Text>
                <Text> Sign Up</Text>
            </View>
         </View>
    )
}

export default LoginScreen;
const styles = StyleSheet.create({
    PageContainer:{
        flexDirection:'column',
        justifyContent:"center", 
        alignItems:"center",
        paddingTop:200,
        paddingBottom:5,
        width:'100%'
    },
    SignInContainer:{
        flexDirection:'column',
        padding:10,
        width:'100%'
    },
    textInputContainer:{
        borderColor:'grey',
        borderRadius:6,
        borderWidth:1, 
        width:'90%',
       margin:5
    },
    SignUpContainer:{
        flexDirection:'row',
        paddingTop:5,
        paddingRight:50,
        width:'100%'
    },
    GuestContainer:{
        padding:10,
        width:'100%'
    }
});