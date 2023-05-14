import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.pageName}>
        <Text>Sign Up</Text>
      </View>
      <View style={styles.appContainer}>
        <View style={styles.mailContainer}>
          <View style={styles.titleMailContainer}>
            <Text>Mail :</Text>
          </View>
          <View style={styles.enterMailContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Mail"
            ></TextInput>
          </View>
        </View>

        <View style={styles.nameContainer}>
          <View style={styles.titleNameContainer}>
            <Text>User Name :</Text>
          </View>
          <View style={styles.enterNameContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter User Name"
            ></TextInput>
          </View>
        </View>

        <View style={styles.passwordContainer}>
          <View style={styles.titlePasswordContainer}>
            <Text>Password :</Text>
          </View>
          <View style={styles.enterPasswordContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Password"
            ></TextInput>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.cancelButton}>
            <Button title="Cancel"></Button>
          </View>
          <View style={styles.signUpButton}>
            <Button title="Sign Up"></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageName: {
    padding: 50,
    paddingLeft: 180,
    paddingTop: 120,
    color: "black",
    justifyContent: "center",
    fontSize: 150,
  },
  cancelButton: {
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
  signUpButton: {
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

  container: {
    flexDirection: "column",
  },
  nameContainer: {
    paddingTop: 10,
    flexDirection: "row",
  },
  passwordContainer: {
    paddingTop: 10,
    flexDirection: "row",
  },
  mailContainer: {
    paddingTop: 10,
    flexDirection: "row",
  },
  appContainer: {
    flexDirection: "column",
  },
  titleNameContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 6,
    width: 120,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
  titlePasswordContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 6,
    width: 120,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
  titleMailContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 6,
    width: 120,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
  enterNameContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 6,
    width: 230,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
  enterMailContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 6,
    width: 230,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
  enterPasswordContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 6,
    width: 230,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
});

export default SignUpScreen;
