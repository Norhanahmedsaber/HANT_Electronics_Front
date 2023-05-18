import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import config from "../../Config/config";
import { openBrowserAsync } from "expo-web-browser";

const ViewItemScreen = ({ navigation, route }) => {
  const [item, setItem] = useState({});
  const [mode, setMode] = useState(2);
  const [modalVisible1 , setModalVisible1]=useState(false)
  const [modalVisible2, setModalVisible2]=useState(false)
  const [list, SetList] = useState([]);

  function itemHandler(item) {
    return setItem(item);
  }
  useEffect(() => {
    setMode(route.params.mode);
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
      });
  }, []);

  useEffect(() => {
    fetch(config.BASE_URL + "/component/" + route.params.id)
      .then((res) => res.json())
      .then((result) => {
        setItem(result);
      });
  }, []);

  const addComponentMode1 = (listId, itemId) => {
    console.log(listId, itemId);
    fetch(config.BASE_URL + "/item/add/" + listId + "/" + itemId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      });
  };

  const addComponentMode2 = (itemId) => {
    console.log(route.params.listId, itemId);
    fetch(config.BASE_URL + "/item/add/" + listId + "/" + itemId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      });
  };
  const pressedList = (ListId) => {
    navigation.navigate("ListScreen", {
      id: ListId,
      token: route.params.token,
    });
  };

  return (
    <View>
      <View>
        <Text>Item Name:{item.name}</Text>
      </View>
      <View>
        <Text>Item Description : {item.description}</Text>
      </View>
      <View>
        <Button
          title="Download"
          onPress={() => {
            openBrowserAsync(item.datasheet_url);
          }}
        ></Button>
        <Button title="Stores"></Button>
        {mode == 2 ? (
          <Button
            title="+"
            onPress={() => {
              addComponentMode2(item.id);
            }}
          ></Button>
        ) : (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {S
                setModalVisible1(!modalVisible1);
              }}>
              <View style={styles.centeredView1}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Choose your List:</Text>
                  <FlatList
                    data={list}
                    renderItem={(ListData) => {
                      return (
                        <View>
                          <Pressable
                            onPress={() => {
                              pressedList(ListData.item.id);
                              addComponentMode1(ListData.item.id, item.id);
                            }}
                          >
                            <Text style={styles.listContainer}>
                              {ListData.item.name}
                            </Text>
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
                    onPress={() => setModalVisible1(!modalVisible1)}>
                    <Text style={styles.textStyle}>Done</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() =>{ 
                setModalVisible1(true)
              }}>
              <Text style={styles.textStyle}>Add to List</Text>
            </Pressable>
          </View>)
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Suggested Stores:</Text>
                <Image style={{width: 60, height: 60 , resizeMode:'stretch'}} source={{uri:'https://en.wikipedia.org/wiki/555_timer_IC#/media/File:Signetics_NE555N.JPG'}}  />
                <Pressable onPress={()=>{console.log("tt")}}>
                  <Text>component name</Text>
                  <Text>prize</Text>
                </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible2(!modalVisible2)}>
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible2(true)}>
        <Text style={styles.textStyle}>Suggested Stores</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default ViewItemScreen;
const styles = StyleSheet.create({
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "row",
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#537188",
    color: "white",
    height: 35,
    justifyContent: "center",
    paddingLeft: 15,
  },
  Image:{
    height:50,
    width:50


  }
});
