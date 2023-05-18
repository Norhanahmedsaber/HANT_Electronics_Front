import React, { useEffect, useState } from "react";
import config from "../../Config/config";
import AppLoader from "../AppLoader";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import SearchBar, { ButtonGroup } from "react-native-elements";

const CategoriesScreen = ({ navigation, route }) => {
  const [Categories, SetCategories] = useState([]);
  const [pending, setPending] = useState(false);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setPending(true);
    fetch(config.BASE_URL + "/categories")
      .then((res) => res.json())
      .then((response) => {
        SetCategories(response);
        setPending(false);
      });
  }, []);
  const categoryPressed = (categoryId) => {
    console.log(route.params.listId);
    navigation.navigate("ComponentsScreen", {
      token: route.params.token,
      id: categoryId,
      mode: route.params.mode,
      from: "category",
      listId: route.params.listId,
    });
  };

  const searchHandler = (value) => {
    setSearch(value);
  };
  const doneSearch = () => {
    navigation.navigate("ComponentsScreen", {
      token:route.params.token,
      search: search,
      mode: route.params.mode,
      from: "search",
      listId: route.params.listId,
    });
  };
  return (
    <View>
      {!pending ? (
        <View style={{ paddingT: 0, flexDirection: "column" }}>
          <View
            style={{
              padding: 15,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.textInputContainer}
              placeholder="Search..."
              onChangeText={searchHandler}
              onSubmitEditing={doneSearch}
            />
            <Pressable
              style={{
                backgroundColor: "cyan",
                borderRadius: 20,
                borderWidth: 1,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={doneSearch}
            >
              <Text>S</Text>
            </Pressable>
          </View>
          <FlatList
            data={Categories}
            renderItem={(CategoriesData) => {
              return (
                <Pressable
                  onPress={() => {
                    categoryPressed(CategoriesData.item.id);
                  }}
                >
                  <View style={styles.listContainer}>
                    <Text style={styles.listTextContainer}>
                      {CategoriesData.item.name}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      ) : (
        <AppLoader />
      )}
    </View>
  );
};
export default CategoriesScreen;
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
    padding: 8,
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
    height: 40,
    borderWidth: 1,
    width: "90%",
    margin: 5,
    paddingLeft: 10,
  },
});
