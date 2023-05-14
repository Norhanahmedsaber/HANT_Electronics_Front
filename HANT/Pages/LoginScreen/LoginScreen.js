import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [UserName, SetUserName] = useState("");
  const [Password, SetPasword] = useState("");
  function UserNameHandler(vaLue) {
    return SetUserName(vaLue);
  }
  function PasswordHandler(vaLue) {
    return SetPasword(vaLue);
  }
  function login() {
    fetch("http://192.168.1.141:3000/SignIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: UserName,
        password: Password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        if (response.message === "Logged In") {
          navigation.navigate("HomeScreen");
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
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
      />
      <View style={styles.SignInContainer}>
        <Button title="Sign In" onPress={login} />
      </View>
      <View style={styles.GuestContainer}>
        <Button title="Guest"></Button>
      </View>
      <View style={styles.SignUpContainer}>
        <Text>I donot have an account </Text>
        <Text onPress={() => navigation.navigate("Sign Up")}> Sign Up</Text>
      </View>
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
