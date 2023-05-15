import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/LoginScreen/LoginScreen";
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import MyListsScreen from "./Pages/MyListsScreen/MyListsScreen";
import ViewItemScreen from "./Pages/ViewItemScreen/ViewItemScreen";
import ComponentsScreen from "./Pages/ComponentsScreen/ComponentsScreen";
import StoresScreen from "./Pages/StoresScreen/StoresScreen";
import CategoriesScreen from "./Pages/CategoriesScreen/CategoriesScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} />
        <Stack.Screen name="StoresScreen" component={StoresScreen} />
        <Stack.Screen name="MyListsScreen" component={MyListsScreen} />
        <Stack.Screen name="ViewItemScreen" component={ViewItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
