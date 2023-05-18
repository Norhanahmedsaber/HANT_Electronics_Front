
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import config from "../../Config/config";
const  CircuitScreen=({route,navigation})=>{
    const [circuits, setCircuits] = useState([]);

  useEffect(()=>{
    renderpage();
  },[])
  const pressedCircuit=(CircuitId)=>{
    navigation.navigate("ListScreen",{
      id:CircuitId,
      token: route.params.token,
      //mode:
    })
  }
  const addCircuit=()=>{
    fetch(config.BASE_URL + "/circuit",{ 
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
    })
   } 
   return (
    <View>
    <View>   
    <FlatList
    data={circuit}
    renderCircuits = {(circuitData) => {
        return (
            <View >
              <Pressable onPress ={()=>{
                pressedCircuit(circuitData.item.id)
              }}>
                  <View style={styles.listContainer} >
                    <Text style={styles.listTextContainer}>{circuitData.item.name}</Text>
                  </View>
              </Pressable>
            </View>
          );
    }}
    keyExtractor={(item, index) => {
        return item.id;
    }}/>
    </View>
    <View>
    </View>
    <View style={styles.AddButtonContainer}>
    <Button title="add" onPress={addCircuit}></Button>
    </View>
    </View>
)
}
export default CircuitScreen;
const styles = StyleSheet.create({ listContainer: {
    flexDirection:'row',
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
  },  AddButtonContainer: {
    padding: 10,
    margin:5,
    width: "100%",
  },})