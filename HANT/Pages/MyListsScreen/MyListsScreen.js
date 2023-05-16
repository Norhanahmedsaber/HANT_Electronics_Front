import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

const MyListsScreen = ({ navigation, route }) => {
  const [list, SetList] = useState([]);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    fetch("http://192.168.1.137:3000/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
      });
  }, []);

  const pressedList=(ListId)=>{
    navigation.navigate("ListScreen",{
      id:ListId,
      token: route.params.token
    })
  } 
  const searchHandler = (value) => {
    setSearch(value)
  }
  const doneSearch = ()=>{
    console.log(search)
    if(search.length > 0){
      fetch("http://192.168.1.137:3000/list/search/" + search, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + route.params.token,
        },
      })
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
    });
    }else {
      fetch("http://192.168.1.137:3000/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
      });
    }
  }
  return (
    <View>
      <View style={{padding:15, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Search..."
          onChangeText={searchHandler}
          onSubmitEditing={doneSearch}
        />
        <Pressable 
          style={{backgroundColor:"cyan",borderRadius:20, borderWidth:1, width:40, height:40, justifyContent:"center", alignItems:"center"}}
          onPress={doneSearch}
        >
          <Text>S</Text>
        </Pressable>
      </View>
      <FlatList
        data={list}
        renderItem={(ListData) => {
          return (

            <Pressable onPress ={()=>{
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
  textInputContainer: {
    borderColor: "grey",
    borderRadius: 10,
    height:40,
    borderWidth: 1,
    width: "90%",
    margin: 5,
    paddingLeft: 10
  },
});
