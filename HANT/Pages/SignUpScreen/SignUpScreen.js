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
          if (res.message === "Done") {
            setPending(false);
            navigation.navigate("Sign In");
          } else {
            setPending(false);
            alert(res.message);
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
        <View style={styles.PageContainer}>
          <View style={styles.RowContainer}>
            <View style={styles.TitleContainer}>
              <Text>Email :</Text>
            </View>
            <View style={styles.VerticalSpace}></View>
            <TextInput
              style={styles.InputContainer}
              placeholder="Enter Your Email"
              onChangeText={emailChanged}
            ></TextInput>
          </View>

          <View style={styles.HorizontalSpace}></View>

          <View style={styles.RowContainer}>
            <View style={styles.TitleContainer}>
              <Text>Username :</Text>
            </View>

            <View style={styles.VerticalSpace}></View>

            <TextInput
              style={styles.InputContainer}
              placeholder="Enter Your Username"
              onChangeText={usernameChanged}
            ></TextInput>
          </View>

          <View style={styles.HorizontalSpace}></View>

          <View style={styles.RowContainer}>
            <View style={styles.TitleContainer}>
              <Text>Password :</Text>
            </View>
            <View style={styles.VerticalSpace}></View>
            <TextInput
              style={styles.InputContainer}
              placeholder="Enter Your Password"
              onChangeText={passwordChanged}
            ></TextInput>
          </View>

          <View style={styles.HorizontalSpace}></View>

          <View style={styles.SignUpButton}>
            <Button onPress={signUpClicked} title="Sign Up"></Button>
          </View>
          <View style={styles.SignInScreen}>
            <View>
              <Text>Already Have an Account? </Text>
            </View>

            <View style={styles.SignUp}>
              <Text
                onPress={() => navigation.navigate("Sign In")}
                style={styles.SignIn}
              >
                Login
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

const styles = StyleSheet.create({
  PageContainer: {
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",

    paddingTop: "10%",
    paddingBottom: "30%",
    paddingLeft: "10%",
    paddingRight: "10%",

    width: "100%",
    height: "100%",
  },
  SignIn: {
    color: "blue",
  },
  RowContainer: {
    flexDirection: "row",
    width: "100%",
    height: "8%",
  },
  TitleContainer: {
    width: "23%",
    justifyContent: "center",
    height: "100%",
  },
  SignInScreen: {
    flexDirection: "row",
    width: "100%",
  },

  InputContainer: {
    borderColor: "grey",
    borderRadius: 0,
    borderWidth: 1,
    width: "72%",
    height: "100%",
    paddingLeft: 10
  },

  SignUpButton: {
    width: "100%",
    height: "8%",
  },

  HorizontalSpace: {
    width: "100%",
    height: "5%",
  },
  VerticalSpace: {
    width: "5%",
    height: "100%",
  },
});

export default SignUpScreen;
