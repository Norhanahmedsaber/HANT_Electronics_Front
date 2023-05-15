import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View styles={styles.buttonsContainer}>
        <View style={styles.buttonsContainer}>
          <View style={styles.catButton}>
            <Button
              onPress={() => navigation.navigate("CategoriesScreen")}
              title="Categories"
            ></Button>
          </View>

          <View style={styles.catButton}>
            <Button
              onPress={() => navigation.navigate("MyListsScreen")}
              title="My Lists"
            ></Button>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.catButton}>
            <Button
              onPress={() => navigation.navigate("ComponentsScreen")}
              title="Components"
            ></Button>
          </View>

          <View style={styles.catButton}>
            <Button
              onPress={() => navigation.navigate("StoresScreen")}
              title="Stores"
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
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
