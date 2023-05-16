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
  const [token, setToken] = useState("");
  const [deleted, setDeleted] = useState(false)
  const [fav,setToFav]=useState(false)
  useEffect(() => {
    fetch("http://192.168.1.138:3000/list", {
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
  useEffect(() => {
    fetch("http://192.168.1.138:3000/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
        setDeleted(false)
      });
  }, [deleted]);
  useEffect(() => {
    fetch("http://192.168.1.138:3000/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
        setToFav(false)
      });
  }, [fav]);
  const pressedList=(ListId)=>{
    console.log('aaaas')

    navigation.navigate("ListScreen",{
      id:ListId,
      token: route.params.token
    })
  } 
 const addList=()=>{
  fetch("http://192.168.1.138:3000/list",{ 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})
  .then((res)=>res.json())
  .then((response)=>{
    const id = response.id;
    navigation.navigate("ListScreen",{
      id:id,
      token: route.params.token
    })
  })
 }
 const deleteList=(id)=>{
  fetch("http://192.168.1.138:3000/list/user/" + id,{ 
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})  .then((res)=>res.json())
    .then((response)=>{
      if(response.message === "deleted") {
        setDeleted(true);
      }
    })
 }
const setfav=(id)=>{
  fetch("http://192.168.1.138:3000/list/setfav/" + id,{ 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})  .then((res)=>res.json())
    .then((response)=>{
      if(response.message === "Added to fav") {
        setToFav(true);
      }
    })
}
const getFavs=()=>{
  fetch("http://192.168.1.138:3000/list/get/favs",{ 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})  .then((res)=>res.json())
    .then((response)=>{
      SetList(response);
    })
}

  return (
    <View>
      <FlatList
        data={list}
        renderItem={(ListData) => {
          return (
            <View >
              <Pressable onPress ={()=>{
                pressedList(ListData.item.id)
              }}>
              </Pressable>
              <View style={styles.listContainer} >
                <Text style={styles.listTextContainer}>{ListData.item.name}</Text>
                <Button title="D" onPress={()=> {deleteList(ListData.item.id)}}></Button>
                <Button title="E" onPress={()=> {pressedList(ListData.item.id)}}></Button>
                <Button title="F" onPress={()=> {setfav(ListData.item.id)}}></Button>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
      <View style={styles.AddButtonContainer}>
      <Button title="add" onPress={addList}></Button>
      </View>
      <View style={styles.AddButtonContainer}>
      <Button title="favs" onPress={getFavs}></Button>
      </View>
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
    margin:5,
    width: "100%",
  },
  ListsContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
  },
  ButtonContainer: {
    padding: 10,
    width: "100%",
  },
  listContainer: {
    flexDirection:'row',
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
