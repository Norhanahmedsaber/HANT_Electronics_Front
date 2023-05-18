import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, View, TouchableHighlight } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/LoginScreen/LoginScreen";
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import MyListsScreen from "./Pages/MyListsScreen/MyListsScreen";
import ViewItemScreen from "./Pages/ViewItemScreen/ViewItemScreen";
import ComponentsScreen from "./Pages/ComponentsScreen/ComponentsScreen";
import StoresScreen from "./Pages/StoresScreen/StoresScreen";
import CategoriesScreen from "./Pages/CategoriesScreen/CategoriesScreen";
import ListScreen from "./Pages/ListScreen/ListScreen";
import { NavigationScreenProps } from "react-navigation";
const Stack = createNativeStackNavigator();

export default function App() {
  const logOut = () => {
    alert("This is a button!");
    //navigation.navigate("Sign In");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerRight: () => (
              <View>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate("Sign In");
                  }}
                >
                  <View>
                    <Ionicons name="log-out-outline" size={30}></Ionicons>
                  </View>
                </TouchableHighlight>
              </View>
            ),
          })}
        />
        <Stack.Screen name="Components" component={CategoriesScreen} />
        <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} />
        <Stack.Screen name="StoresScreen" component={StoresScreen} />
        <Stack.Screen name="MyListsScreen" component={MyListsScreen} />
        <Stack.Screen name="ViewItemScreen" component={ViewItemScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
