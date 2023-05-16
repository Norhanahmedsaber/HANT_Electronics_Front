import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList , Button} from "react-native";

const ListScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.137:3000/item/" + route.params.id)

      .then((res) => res.json())
      .then((response) => {
        setItems(response);
      });
  }, []);

  function deleteItem(id) {
    console.log(id)
    fetch("http://192.168.1.137:3000/item/" + id , {method : 'DELETE'})
      .then((response) => {
          fetch("http://192.168.1.137:3000/item/" + route.params.id)

          .then((res) => res.json())
          .then((result) => {
          setItems(result);
        });
      });
  }

  return (
    <View style={styles.appContainer}>
      <FlatList
        data={items}
        renderItem={(itemData) => {
          return (
            <View style={styles.goalItem}>
              <View>
              <Text style={styles.goalText}>{itemData.item.name}</Text>
              <Text style={styles.goalText}>{itemData.item.quantity}</Text>
              </View>
              <View>
                
                <Button title="Delete" onPress={()=>{
                  deleteItem(itemData.item.id)
                }}></Button>
              </View>


            </View>
            

          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
  );
};
export default ListScreen;
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
