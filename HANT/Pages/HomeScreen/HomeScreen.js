import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View styles={styles.buttonsContainer}>
        <View>
          <Text>sayed</Text>
        </View>
        <View style={styles.catButton}>
          <Button
            onPress={() => navigation.navigate("ViewItemScreen")}
            title="cat1"
          ></Button>
        </View>
        <View>
          <Text>sayed</Text>
        </View>
        <View style={styles.catButton}>
          <Button
            onPress={() => navigation.navigate("MyListsScreen")}
            title="cat2"
          ></Button>
        <View style={styles.buttonsContainer}>

            <View style={styles.catButton}>
              <Button onPress={() => navigation.navigate("ItemsScreen")} title="Items"></Button>
            </View>

            <View style={styles.catButton}>
              <Button onPress={() => navigation.navigate("MyListsScreen")} title="My Lists"></Button>
            </View>
        </View>

        <View style={styles.buttonsContainer}>

            <View style={styles.catButton}>
              <Button onPress={() => navigation.navigate("ItemsScreen")} title="cat3"></Button>
            </View>

            <View style={styles.catButton}>
              <Button onPress={() => navigation.navigate("MyListsScreen")} title="cat4"></Button>
            </View>

        </View>


    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginLeft: 20,
    marginTop: 30,
    borderWidth: 2,
    maxWidth: 350,
  },

  catButton: {
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    backgroundColor: "yellow",
    borderRadius: 6,
    height: 150,
    width: 100,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
