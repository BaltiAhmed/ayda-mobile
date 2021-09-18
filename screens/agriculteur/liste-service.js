import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  ListItem,
  Body,
  Right,
  Form,
  Item,
  Input,
  Label,
  H2,
  Content,
  Button,
} from "native-base";
import { Authcontext } from "../../context/auth-context";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  RefreshControl,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  Text,
} from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListeService = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const auth = useContext(Authcontext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/service`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.service);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/service`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.service);
    };
    sendRequest();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [idService, setIdService] = useState(null);
  const [prixService, setPrixService] = useState(null);
  const [nbrJour, setNbrJour] = useState(null);
  const [prixTotal, setPrixTotal] = useState(null);

  const submit = async () => {
    console.log(idService);

    let response = await fetch("http://192.168.1.185:5000/api/demandeService/ajoutDemandeService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId: idService,
        agriculteurId: auth.userIdA,
        nbrJour:nbrJour,
        prix:prixTotal
      }),
    });

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

      throw new Error(responsedata.message);
    }

    Alert.alert("Message", "Votre demande est enregistrer", [
      { text: "fermer" },
    ]);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
            <H2>Ajouter le nombre de jours de location</H2>
            <View style={styles.formControl}>
              <TextInput
                style={styles.input}
                value={nbrJour}
                onChangeText={(text) => {
                  setNbrJour(text);
                  setPrixTotal(text * prixService);
                }}
                keyboardType="numeric"
                keyboardAppearance="light"
                autoCapitalize="none"
                placeholder="Nombre de jour"
                placeholderTextColor="dark"
                label="E-mail"
              />
            </View>
            <Text>le prix total de location sera {prixTotal}</Text>
            <Button
              style={{ marginTop: 20, marginBottom: 20 }}
              block
              onPress={() => {
                submit();
              }}
            >
              <Text>Envoyer</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <View>
        {list &&
          list.map((item, index) => (
            <ListItem avatar>
              <Body>
                <View style={{ marginTop: 20 }}>
                  <Text note>Titre: {item.nom}</Text>
                  <Text note>Type: {item.type}</Text>
                  <Text note>Prix: {item.prix}DT</Text>
                  <Text note>DEscription: {item.description}</Text>
                </View>
              </Body>
              <Right>
                <MaterialCommunityIcons
                  name="target"
                  size={25}
                  color="#006db3"
                  onPress={() => {
                    setModalVisible(true);
                    setIdService(item._id);
                    setPrixService(item.prix);
                  }}
                />
              </Right>
            </ListItem>
          ))}
      </View>
    </ScrollView>
  );
};

ListeService.navigationOptions = (navData) => {
  return {
    headerTitle: "Mes Services",
  };
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default ListeService;
