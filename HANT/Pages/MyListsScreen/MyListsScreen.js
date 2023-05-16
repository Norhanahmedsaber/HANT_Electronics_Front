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

const MyListsScreen = ({ navigation }) => {
  const [list, SetList] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.138:3000/lists")
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
      });
  }, []);
  const pressedList=(ListId)=>{
    navigation.navigate("ListScreen",{
      id:ListId
    })
  } 
  return (
    <View>
      <FlatList
        data={list}
        renderItem={(ListData) => {
          return (
            <Pressable on pressRetentionOffset={()=>{
              pressedList(ListData.item.id)
            }}>
            <View style={styles.listContainer}>
              <Text style={styles.listTextContainer}>{ListData.item.name}</Text>
            </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
      <Button title="add" style={styles.ButtonContainer}></Button>
    </View>
  );
};
export default MyListsScreen;
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
