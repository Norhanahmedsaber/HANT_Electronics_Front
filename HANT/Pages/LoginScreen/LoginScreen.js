import React from "react";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
function goToTest() {
    Actions.Test();
}
const LoginScreen = () => {
    return (
        <TouchableOpacity style = {{ margin: 128 }} onPress = {goToTest}>
            <Text>This is Login Page, Click to Go to Test</Text>
        </TouchableOpacity>
    )
}

export default LoginScreen;