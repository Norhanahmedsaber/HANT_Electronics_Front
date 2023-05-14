

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/LoginScreen/LoginScreen"
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen"
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import MyListsScreen from "./Pages/MyListsScreen/MyListsScreen";
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MyListsScreen" component={MyListsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}