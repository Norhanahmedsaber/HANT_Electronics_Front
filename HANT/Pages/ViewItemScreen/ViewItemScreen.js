import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet , Modal , Pressable  , FlatList} from "react-native";
import config from "../../Config/config";

const ViewItemScreen = ({ navigation, route }) => {
  const [item, setItem] = useState({});
  const [mode , setMode]= useState(2);
  const [modalVisible , setModalVisible]=useState(false)
  const [list , SetList]=useState([])
  function itemHandler(item) {
    return setItem(item);
  }
  useEffect(()=>{
      setMode(route.params.mode)
    },[])
   
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
    fetch(config.BASE_URL + "/component/" + route.params.id)
      .then((res) => res.json())
      .then((result) => {
        setItem(result);
      });
  }, []);

  const addComponentMode1 = (listId ,itemId)=>{
    console.log(listId , itemId)
    fetch(config.BASE_URL + "/item/add/" + listId + "/" + itemId , {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token
      }})
    .then((res)=>res.json())
    .then((response)=>{
      alert(response.message)
    })
}

const addComponentMode2 = (itemId)=>{
  console.log(route.params.listId , itemId)
  fetch(config.BASE_URL + "/item/add/" + listId + "/" + itemId , {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + route.params.token
    }})
  .then((res)=>res.json())
  .then((response)=>{
    alert(response.message)
  })
}
const pressedList=(ListId)=>{

  navigation.navigate("ListScreen",{
    id:ListId,
    token: route.params.token
  })
} 

  return (
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
        {
          mode==2?(<Button title="+" onPress={()=>{
            addComponentMode2(item.id)
          }}></Button>):( <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {S
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Choose your List:</Text>
                  <FlatList
                    data={list}
                    renderItem={(ListData) => {
                      return (
                        <View >
                        
                          <Pressable onPress ={()=>{
                            pressedList(ListData.item.id)
                            addComponentMode1(ListData.item.id,item.id) 
                          }}>
                          <Text style={styles.listContainer}>{ListData.item.name}</Text>
                          </Pressable>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => {
                      return item.id;
                    }}
                />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Done</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() =>{ 
                setModalVisible(true)
              }}>
              <Text style={styles.textStyle}>Add to List</Text>
            </Pressable>
          </View>)
        }
      </View>
    </View>
  );
};

export default ViewItemScreen;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  listContainer: {
    flexDirection:'row',
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#537188",
    color: "white",
    height: 35,
    justifyContent: "center",
    paddingLeft: 15,
  },
});
