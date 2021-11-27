import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import { Card, CardItem, Body, Button } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListCommande = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.43.177:5000/api/commande`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.Commande);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const id = props.navigation.getParam("id");
  console.log(id);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.43.177:5000/api/commande`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.Commande);
    };
    sendRequest();
  }, []);
  console.log(list);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((row) => (
          <View>
            <Card>
              <CardItem header>
                <Text>Date: {row.date}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Prix: {row.prix}DT</Text>
                  <Text>Livraison: {row.livraison}</Text>
                  <Text>
                    Adresse: {row.adresse} {row.gouvernerat}
                  </Text>
                  <Text>Statut: {row.statut}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <View
                  
                >
                  <Text>Voir listes des articles</Text>
                  <Entypo name="list" size={25} color="#212121" onPress={() => {
                    props.navigation.navigate({
                      routeName: "ListArticleCommande",
                      params: {
                        id: row._id,
                      },
                    });
                  }}/>
                </View>
              </CardItem>
            </Card>
          </View>
        ))}
    </ScrollView>
  );
};

ListCommande.navigationOptions = (navData) => {
  return {
    headerTitle: "Mes Commandes",
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: "100%",
    height: 265,
  },
});

export default ListCommande;
