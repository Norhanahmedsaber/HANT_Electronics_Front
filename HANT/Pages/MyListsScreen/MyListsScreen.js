import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import config from "../../Config/config";

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
  const [deleted, setDeleted] = useState(false)
  const [fav,setToFav]=useState(false)
  useEffect(() => {
    fetch(config.BASE_URL + "/list", {
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
    fetch(config.BASE_URL + "/list", {
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
    fetch(config.BASE_URL + "/list", {
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

    navigation.navigate("ListScreen",{
      id:ListId,
      token: route.params.token
    })
  } 
 const addList=()=>{
  fetch(config.BASE_URL + "/list",{ 
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
  fetch(config.BASE_URL + "/list/user/" + id,{ 
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
  fetch(config.BASE_URL + "/list/setfav/" + id,{ 
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
  fetch(config.BASE_URL + "/list/get/favs",{ 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})  .then((res)=>res.json())
    .then((response)=>{
      SetList(response);
    })
}

  const searchHandler = (value) => {
    setSearch(value)
  }
  const doneSearch = ()=>{
    if(search.length > 0){
      fetch(config.BASE_URL + "/list/search/" + search, {
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
      fetch(config.BASE_URL + "/list", {
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
