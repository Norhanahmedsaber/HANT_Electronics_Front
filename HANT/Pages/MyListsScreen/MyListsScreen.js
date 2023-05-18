import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import config from "../../Config/config";
import AppLoader from "../AppLoader";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  Switch,
} from "react-native";

const MyListsScreen = ({ navigation, route }) => {
  const [list, SetList] = useState([]);
  const [mode, setMode] = useState(0)
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [pending, setPending] = useState(false);
  const [fav, setToFav] = useState(false);
  const [added, settoadded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
setIsEnabled(previousState => !previousState);
}
const renderpage=()=>{
  fetch(config.BASE_URL + "/circuit")
      .then((res) => res.json())
      .then((response) => {
        SetList(response);
      });
}
const renderLists  = () => {
  if(!isEnabled) {
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
          setPending(false);
        });
      }else {
        fetch(config.BASE_URL + "/list/fav", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + route.params.token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          SetList(response);
          setPending(false);
        });
    }
    }
      useEffect(()=>{
      renderLists()
    }, [isEnabled])
      useEffect(()=>{
      setMode(route.params.mode)
    })
  useEffect(() => {
  {
    mode===2 &&renderLists()
    mode ===3 && renderpage()
  }
  }, [mode]);

  useEffect(() => {
    setPending(true);
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
        setToFav(false);
        setPending(false);
      });
  }, [fav]);
const pressedList=(ListId)=>{
  if(mode===2){
      navigation.navigate("ListScreen",{
      id:ListId,
      token: route.params.token,
      mode:2
    })
  }
  else if(mode===3){
    navigation.navigate("ListScreen",{
      id:ListId,
      token: route.params.token,
      mode:3
    })
  }
  } 
 const addList=()=>{
  if(mode===2){
  fetch(config.BASE_URL + "/list",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})
  .then((res)=>res.json())
  .then((response)=>{
    const id = response.id;
    renderLists()
    navigation.navigate("ListScreen",{
      id:id,
      token: route.params.token,
    })
  })}
 }
 const deleteList=(id)=>{
  fetch(config.BASE_URL + "/list/" + id,{ 
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})  .then((res)=>res.json())
    .then((response)=>{
      if(response.message === "deleted") {
        setDeleted(true);
      }
      renderLists()
    })
 }
const togglefav=(id)=>{
  fetch(config.BASE_URL + "/list/fav/" + id,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token,
    },})  .then((res)=>res.json())
    .then((response)=>{
      if(response.message === "Added to fav") {
        setToFav(true);
      }
      renderLists();
    })
}


  const getFavs = () => {
    setPending(true);
    fetch(config.BASE_URL + "/list/get/favs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setPending(false);
        SetList(response);
      });
  };
  const searchHandler = (value) => {
    setSearch(value);
  };
  const doneSearch = () => {
    if(mode == 2 ) {
      if (search.length > 0) {
        setPending(true);
        fetch(config.BASE_URL + "/list/search/" + search, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + route.params.token,
          },
        })
          .then((res) => res.json())
          .then((response) => {
            setPending(false);
            SetList(response);
          });
      } else {
        setPending(true);
        fetch(config.BASE_URL + "/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + route.params.token,
          },
        })
          .then((res) => res.json())
          .then((response) => {
            setPending(false);
            SetList(response);
          });
      }
    }
    else if(mode===3){
      if(search.length > 0){
        fetch(config.BASE_URL + "/circuit/search/" + search, {
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
        fetch(config.BASE_URL + "/circuit", {
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
            <View>
              <Pressable onPress ={()=>{
                pressedList(ListData.item.id)
              }}>
                    <View style={styles.listContainer} >
                    <Text style={styles.listTextContainer}>{ListData.item.name}</Text>
                      {mode===2?(
                          <View style = {{flexDirection: "row"}}>
                            <Button title="D" onPress={()=> {deleteList(ListData.item.id)}}></Button>
                            <Button title="E" onPress={()=> {pressedList(ListData.item.id)}}></Button>
                            <Button title="F" onPress={()=> {togglefav(ListData.item.id)}}></Button>
                          </View>
                        ):<View></View>}
                  </View>
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
      {mode == 2 && (
        <View style={styles.AddButtonContainer}>
        <Button title="add" onPress={addList}></Button>
        </View>
      )}
      <View style={styles.AddButtonContainer}>
    {mode===2?(<Switch title="favs"   onValueChange={toggleSwitch}
      value={isEnabled}></Switch>):(<View></View>)}
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
    margin: 5,
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
    flexDirection: "row",
    margin: 8,
    paddinf: 8,
    borderRadius: 6,
    backgroundColor: "#537188",
    color: "white",
    height: 35,
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  listTextContainer: {
    color: "white",
  },
  textInputContainer: {
    borderColor: "grey",
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    width: "90%",
    margin: 5,
    paddingLeft: 10,
  },
});
