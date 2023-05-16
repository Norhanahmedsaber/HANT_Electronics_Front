import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

const CategoriesScreen = ({ navigation }) => {
  const [Categories, SetCategories] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.137:3000/categories")
      .then((res) => res.json())
      .then((response) => {
        SetCategories(response);
      });
  }, []);
  const categoryPressed = (categoryId) => {
    navigation.navigate("ComponentsScreen", {
      id: categoryId
    })
  }
  return (
    <View>
      <FlatList
        data={Categories}
        renderItem={(CategoriesData) => {
          return (
            <Pressable onPress={()=> {
              categoryPressed(CategoriesData.item.id)
            }}>
              <View style={styles.listContainer}>
              <Text style={styles.listTextContainer}>
                {CategoriesData.item.name}
              </Text>
            </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
  );
};
export default CategoriesScreen;
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
    height: 35,
    justifyContent: "center",
    paddingLeft: 15,
  },
  listTextContainer: {
    color: "white",
  },
});
