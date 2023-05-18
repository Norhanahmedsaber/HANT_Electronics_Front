import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
} from "react-native";

import LottieView from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={150} color="#999999" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 250,
    padding: 10,
  },
});

export default AppLoader;
