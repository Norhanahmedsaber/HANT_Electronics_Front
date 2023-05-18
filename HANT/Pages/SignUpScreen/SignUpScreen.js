import React, { useState } from "react";
import config from "../../Config/config";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import AppLoader from "../AppLoader";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");

  const usernameChanged = (value) => {
    setUsername(value);
  };
  const passwordChanged = (value) => {
    setPassword(value);
  };
  const emailChanged = (value) => {
    setEmail(value);
  };
  const valid = () => {
    return true;
  };
  const signUpClicked = () => {
    if (valid()) {
      setPending(true);
      fetch(config.BASE_URL + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.Data === "Done") {
            setPending(false);
            navigation.navigate("Sign In");
          } else {
            setPending(false);
            alert("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View>
      {!pending ? (
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
                  onChangeText={emailChanged}
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
                  onChangeText={usernameChanged}
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
                  onChangeText={passwordChanged}
                ></TextInput>
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.cancelButton}>
                <Button title="Cancel"></Button>
              </View>
              <View style={styles.signUpButton}>
                <Button onPress={signUpClicked} title="Sign Up"></Button>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <AppLoader />
      )}
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
