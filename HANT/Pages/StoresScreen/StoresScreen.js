import React, { useEffect, useState } from "react";
import config from "../../Config/config";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";

const StoresScreen = ({ navigation }) => {
  const [stores, SetStores] = useState([]);
  useEffect(() => {
    fetch(config.BASE_URL + "/stores")
      .then((res) => res.json())
      .then((response) => {
        SetStores(response);
      });
  }, []);
  return (
    <View>
      <FlatList
        data={stores}
        renderItem={(StoreData) => {
          return (
            <View style={styles.listContainer}>
              <Text style={styles.listTextContainer}>
                {StoreData.item.name}
              </Text>
              <Text style={styles.listTextContainer}>
                {StoreData.item.location}
              </Text>
              <Text style={styles.listTextContainer}>
                {StoreData.item.img_url}
              </Text>
              <Text style={styles.listTextContainer}>
                {StoreData.item.website}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
      />
    </View>
  );
};
export default StoresScreen;
const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
    paddingBottom: 5,
    width: "100%",
  },
  AddButtonContainer: {
    padding: 10,
    width: "100%",
  },
  ListsContainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
  ButtonContainer: {
    padding: 10,
    width: "100%",
  },
  listContainer: {
    margin: 8,
    paddinf: 8,
    borderRadius: 6,
    backgroundColor: "#537188",
    color: "white",
    height: 100,
    justifyContent: "center",
    paddingLeft: 15,
  },
  listTextContainer: {
    color: "white",
  },
});
