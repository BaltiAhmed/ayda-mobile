import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Alert,
  Button,
  Picker,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { Authcontext } from "../../context/auth-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { set } from "react-native-reanimated";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Panier = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const auth = useContext(Authcontext);
  const [user, setUser] = useState([]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/produitfinal/panier/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingProduit);
    };
    sendRequest();
    const sendRequestUser = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/client/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setUser(responseData.client);
    };
    sendRequestUser();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/produitfinal/panier/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingProduit);
    };
    sendRequest();
    const sendRequestUser = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/client/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setUser(responseData.client);
    };
    sendRequestUser();
  }, []);

  const submit = async () => {
    let response = await fetch(`http://192.168.1.46:5000/api/commande/ajout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idClient: auth.userId,
        prix: user && user.prixT,
        frais: selectedValue == "Domicile" ? 5 : 0,
        livraison: selectedValue,
        payement: selectedValue1,
        adresse: adresse,
        gouvernerat: gouvernerat,
      }),
    });

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    let responsedata = await response.json();
    list.map((el) => addArticleToOrder(responsedata.Commande._id, el._id));
    Alert.alert("Message", "Commnade valider", [{ text: "fermer" }]);
  };

  const [valid, setValid] = useState(false);

  const [adresse, setAdresse] = useState("");
  const [gouvernerat, setGouvernerat] = useState("");

  const addArticleToOrder = async (id, idArticle) => {
    let response = await fetch(
      `http://192.168.1.46:5000/api/commande/article/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idArticle: idArticle,
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
  };
  const [selectedValue, setSelectedValue] = useState("Domicile");
  const [selectedValue1, setSelectedValue1] = useState("PL");

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((row) => (
          <View>
            <List>
              <ListItem
                avatar
                /* onPress={() => {
                  props.navigation.navigate({
                    routeName: "Detail",
                    params: {
                      id: row._id,
                    },
                  });
                }} */
              >
                <Left>
                  <Thumbnail
                    source={{ uri: `http://192.168.1.46:5000/${row.image}` }}
                  />
                </Left>
                <Body>
                  <Text>{row.nom}</Text>
                  <Text note>{row.prix}</Text>
                </Body>
                <Right>
                  <Text note>
                    <AntDesign
                      name="delete"
                      size={30}
                      color="red"
                      onPress={async () => {
                        let response = await fetch(
                          `http://192.168.1.46:5000/api/produitfinal/supprimerPanier`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              idProduit: row._id,
                              idClient: auth.userId,
                              prix: row.prix,
                            }),
                          }
                        );
                        let responsedata = await response.json();
                        if (!response.ok) {
                          Alert.alert("Message", "Failed !!", [
                            { text: "fermer" },
                          ]);
                          throw new Error(responsedata.message);
                        }
                        setList(list.filter((el) => el._id !== row._id));
                        Alert.alert("Message", "Article suprimer du panier", [
                          { text: "fermer" },
                        ]);
                      }}
                    />
                  </Text>
                </Right>
              </ListItem>
            </List>
          </View>
        ))}

      <Text style={{ marginLeft: "2%", marginTop: 20, fontSize: 20 }}>
        Prix Total: {user && user.prixT}DT
      </Text>
      {selectedValue == "Domicile" ? (
        <Text style={{ marginLeft: "2%", marginTop: 20, fontSize: 20 }}>
          Frais de livraison 5DT
        </Text>
      ) : (
        <Text style={{ marginLeft: "2%", marginTop: 20, fontSize: 20 }}>
          Frais de livraison 0DT
        </Text>
      )}

      <View style={styles.buttonContainer}>
        {!valid ? (
          <Button
            title="Valider la commande"
            color="#1e88e5"
            onPress={setValid(true)}
          />
        ) : (
          <View>
            <Item floatingLabel>
              <Label>Adresse</Label>
              <Input
                value={adresse}
                onChangeText={(text) => {
                  setAdresse(text);
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Gouvernerat</Label>
              <Input
                value={gouvernerat}
                onChangeText={(text) => {
                  setGouvernerat(text);
                }}
              />
            </Item>
            <Text style={{ fontSize: 20 }}>Livraison</Text>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Domicile" value="Domicile" />
              <Picker.Item label="Société" value="Société" />
            </Picker>
            <Text style={{ fontSize: 20 }}>Payement</Text>
            <Picker
              selectedValue={selectedValue1}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue1(itemValue)
              }
              style={{ with: 40 }}
            >
              <Picker.Item label="Payement à la livraison" value="PL" />
              <Picker.Item label="Payement par carte" value="PC" />
            </Picker>
            <Button
              title="Passer la commande"
              color="#1e88e5"
              onPress={submit}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

Panier.navigationOptions = (navData) => {
  return {
    headerTitle: "Panier",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Panier;
