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
            onPress={() => navigation.navigate("ItemsScreen")}
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
        </View>
        <View>
          <Text>sayed</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginLeft: 30,
    marginTop: 30,
    borderWidth: 2,
    maxWidth: "80%",
  },

  catButton: {
    borderWidth: 2,
    borderColor: "black",
    marginLeft: 10,
    color: "black",
    backgroundColor: "yellow",
    borderRadius: 6,
    height: 150,
    width: "30%",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});
