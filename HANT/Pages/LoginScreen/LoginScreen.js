import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import config from "../../Config/config";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AppLoader from "../AppLoader";
const LoginScreen = ({ navigation }) => {
  const [UserName, SetUserName] = useState("");
  const [Password, SetPasword] = useState("");
  const [pending, setPending] = useState(false);
  function UserNameHandler(vaLue) {
    return SetUserName(vaLue);
  }
  function PasswordHandler(vaLue) {
    return SetPasword(vaLue);
  }
  async function login() {
    setPending(true);
    fetch(config.BASE_URL + "/Signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: UserName,
        password: Password,
        roleid: 1,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (response) => {
        if (response.username) {
          await SecureStore.setItemAsync("token", response.token);
          setPending(false);
          navigation.navigate("HomeScreen", {
            token: response.token,
          });
        } else {
          setPending(false);
          alert(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function logInAsGuest() {
    setPending(true);
    fetch(config.BASE_URL + "/users/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(async (response) => {
        if (response.username) {
          setPending(false);
          await SecureStore.setItemAsync("token", response.token);
          navigation.navigate("HomeScreen", {
            token: response.token,
          });
        } else {
          setPending(false);
          alert(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View>
      {!pending ? (
        <View style={styles.PageContainer}>
          <TextInput
            style={styles.textInputContainer}
            placeholder="Username"
            onChangeText={UserNameHandler}
          />
          <TextInput
            style={styles.textInputContainer}
            placeholder="Password"
            onChangeText={PasswordHandler}
            onSubmitEditing={login}
          />
          <View style={styles.SignInContainer}>
            <Button title="Sign In" onPress={login} />
          </View>
          <View style={styles.GuestContainer}>
            <Button title="Guest" onPress={logInAsGuest}></Button>
          </View>
          <View style={styles.SignUpContainer}>
            <View style={{ paddingLeft: 15 }}>
              <Text>I dont have an account </Text>
            </View>

            <View style={styles.SignUp}>
              <Text
                onPress={() => navigation.navigate("Sign Up")}
                style={styles.SignUp}
              >
                {" "}
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <AppLoader />
      )}
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  PageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
    paddingBottom: 5,
    width: "100%",
  },
  SignUp: {
    color: "blue",
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
});
