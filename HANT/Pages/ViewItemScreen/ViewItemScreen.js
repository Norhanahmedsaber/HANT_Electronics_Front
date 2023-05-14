import React, { useEffect, useState } from "react";
import { View, Text,Button,TextInput, StyleSheet } from "react-native";

const ViewItemScreen = ({navigation})=>{
    const [item , setItem] = useState({})
    function itemHandler(item)
    {
        return setItem(item)
    }
    
    useEffect(()=>{
        fetch("http://192.168.1.142:3000/items/1").then((res)=>res.json()).then((result)=>{
            setItem(result)
        })

    },[])
    
    return(
        <View>
        <View>
            <Text>Item Name:{item.name}</Text>
        </View>
        <View>
             <Text>Item Description : {item.description}</Text> 
        </View>
        <View>
            <Button title="Download"></Button>
            <Button title="Stores"></Button>
        
        </View>

        </View>
    )
}

export default ViewItemScreen ;