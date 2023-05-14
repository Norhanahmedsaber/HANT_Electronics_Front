import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View styles={styles.buttonsContainer}>
        <View styles={styles.catContainer}>
          <Button
            title="cat1"
            onPress={() => navigation.navigate("ItemsScreen")}
          ></Button>
        </View>
        <View>
          <Button
            title="cat2"
            onPress={() => navigation.navigate("MyListsScreen")}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  PageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
    paddingBottom: 5,
    width: "100%",
  },
  SignInContainer: {
    flexDirection: "column",
    padding: 10,
    width: "100%",
  },
  textInputContainer: {
    borderColor: "grey",
    borderRadius: 6,
    borderWidth: 1,
    width: "90%",
    margin: 5,
  },
  SignUpContainer: {
    flexDirection: "row",
    paddingTop: 5,
    paddingRight: 50,
    width: "100%",
  },
  GuestContainer: {
    padding: 10,
    width: "100%",
  },
  catButton: {
    borderWidth: 1,
    borderColor: "#cccccc",
    marginLeft: 10,
    color: "white",
    backgroundColor: "yellow",
    borderRadius: 6,
    height: 40,
    width: 100,
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});
