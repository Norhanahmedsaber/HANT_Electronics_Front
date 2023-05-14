import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Pages/LoginScreen/LoginScreen";
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen";
export default function App() {
  return (
    <View>
      <SignUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
