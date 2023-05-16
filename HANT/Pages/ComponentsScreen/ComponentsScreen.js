import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const ComponentsScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.141:3000/component/cat/" + route.params.id)
      .then((res) => res.json())
      .then((response) => {
        setItems(response);
      });
  }, []);
  const componenetPressed = (componentId) => {
    navigation.navigate("ViewItemScreen", {
      id: componentId,
    });
  };

  return (
    <View style={styles.appContainer}>
      <FlatList
        data={items}
        renderItem={(itemData) => {
          return (
            <Pressable
              onPress={() => {
                componenetPressed(itemData.item.id);
              }}
            >
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{itemData.item.name}</Text>
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
export default ComponentsScreen;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingRight: 16,
    paddingLeft: 16,
  },
  inputContainer: {
    flex: 2,
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 6,
    width: 265,
    marginLeft: 10,
    backgroundColor: "#CBB279",
    height: 40,
  },
  addGoal: {
    borderWidth: 1,
    borderColor: "#cccccc",
    marginLeft: 10,
    color: "white",
    backgroundColor: "yellow",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
  },
  goalsContainer: {
    flex: 19,
  },
  goalItem: {
    margin: 8,
    paddinf: 8,
    borderRadius: 6,
    backgroundColor: "#537188",
    color: "white",
    height: 35,
    justifyContent: "center",
    paddingLeft: 15,
  },
  goalText: {
    color: "white",
  },
});
