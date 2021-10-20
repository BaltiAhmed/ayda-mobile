import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Button,
  Alert,
} from "react-native";
import { Card, CardItem, Body, Row } from "native-base";
import { Authcontext } from "../../context/auth-context";
import { useContext } from "react";
import { Spinner } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import StarRating from "../../components/starRating";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Detail = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [quantite, setQuantite] = useState(1);

  const id = props.navigation.getParam("id");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.42.17:5000/api/produitfinal/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.produit);
      setPrixT(responseData.produit.prix);
      setPrix(responseData.produit.prix);
      setQuantite(1);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.42.17:5000/api/produitfinal/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.produit);
      setPrixT(responseData.produit.prix);
      setPrix(responseData.produit.prix);
    };
    sendRequest();
  }, []);

  const [PrixT, setPrixT] = useState();
  const [Prix, setPrix] = useState();

  const auth = useContext(Authcontext);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    let response = await fetch(
      "http://192.168.42.17:5000/api/parent/inscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdParent: auth.userId,
          IdJardin: id,
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }
    setLoading(false);
    Alert.alert("Message", "Votre demande est enregistrer", [
      { text: "fermer" },
    ]);
  };
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list && (
          <View>
            <Image
              source={{ uri: `http://192.168.42.17:5000/${list.image}` }}
              style={styles.image}
            />
            <View style={{marginTop:-45}}>
              <StarRating score={list.scoreT} id={list._id} />
            </View>
            <View style={styles.details}>
              <Text>{list.nom}</Text>
              <Text>{list.region}</Text>
              <Text>{list.prix}DT KG</Text>
            </View>
            <Card>
              <CardItem>
                <Body>
                  <Text>{list.description}</Text>
                </Body>
              </CardItem>

              <CardItem>
                <Body style={{ flexDirection: "row" }}>
                  <Entypo
                    name="circle-with-minus"
                    size={35}
                    color="#1a237e"
                    onPress={() => {
                      if (quantite > 1) {
                        setQuantite(quantite - 1);
                        setPrixT(parseInt(PrixT, 10) - parseInt(Prix, 10));
                      }
                    }}
                  />
                  <Text
                    style={{ fontSize: 30, marginLeft: 20, marginRight: 20 }}
                  >
                    {quantite}
                  </Text>
                  <Entypo
                    name="circle-with-plus"
                    size={35}
                    color="#1a237e"
                    onPress={() => {
                      if (quantite < list.quantite) {
                        setQuantite(quantite + 1);
                        setPrixT(parseInt(PrixT, 10) + parseInt(Prix, 10));
                      }
                    }}
                  />

                  <Text
                    style={{ fontSize: 30, marginLeft: 20, marginRight: 20 }}
                  >
                    {PrixT}DT
                  </Text>
                </Body>
              </CardItem>

              {auth.userId &&
                (loading ? (
                  <Spinner />
                ) : (
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Ajouter aux panier"
                      color="#1e88e5"
                      onPress={submit}
                    />
                  </View>
                ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

Detail.navigationOptions = {
  headerTitle: "Detail",
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
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
  buttonContainer: {
    marginTop: 10,
  },
});

export default Detail;
