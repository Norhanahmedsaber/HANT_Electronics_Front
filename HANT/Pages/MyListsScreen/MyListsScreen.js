import React, { useState } from "react";
import { SafeAreaView,View, Text,Button,TextInput, StyleSheet } from "react-native";

const MyListsScreen=({navigation})=>{

    const data = [
        { id: 1, name: 'list 1' },
        { id: 2, name: 'list 2' },
      ];
      const renderList = ({ list }) => (
        <View style={styles.ListsContainer}>
          <Text>{list.name}</Text>
        </View>
      );
    
      return (
        <View>
          <Text>
            Noorah
          </Text>
        </View>
        );
    };
export default MyListsScreen;
const styles = StyleSheet.create({
 pageContainer:{
    flexDirection:'column',
    justifyContent:"center", 
    alignItems:"center",
    paddingTop:200,
    paddingBottom:5,
    width:'100%'
 },
 AddButtonContainer:{
    padding:10,
    width:'100%'
 },
 ListsContainer:{
     padding: 10,
     borderBottomWidth: 1 
 }

})