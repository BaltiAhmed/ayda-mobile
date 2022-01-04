import React, { useState, useContext } from "react";
import { View, Image, Text, StyleSheet, Alert, ScrollView } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Textarea,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { H2, Button } from "native-base";
import { Authcontext } from "../../context/auth-context";
import mime from "mime";
import IconAntDesign from "react-native-vector-icons/AntDesign";

const AjoutProduit = (props) => {
  const [image, setImage] = useState();
  const [nom, setNom] = useState();
  const [region, setRegion] = useState();
  const [prix, setPrix] = useState();
  const [quantite, setQuantite] = useState();
  const [Description, setDescription] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(image);
    props.onImageTaken(image.uri);
  };
  const auth = useContext(Authcontext)

  const postDocument = async () => {
    const url = "http://192.168.43.177:5000/api/produit/ajout";
    const fileUri = image.uri;
    const newImageUri = "file:///" + fileUri.split("file:/").join("");
    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("nom", nom);
    formData.append("region", region);
    formData.append("prix", prix);
    formData.append("quantite", quantite);
    formData.append("description", Description);
    formData.append("Agriculteur", auth.userIdA);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    let response = await fetch(url, options);

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    Alert.alert("Message", "Votre demande est enregistré", [
      { text: "fermer" },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.imagePicker}>
        <H2>Ajouter un produit</H2>

        <View style={styles.imagePreview}>
          {!image ? (
            <Text>image de votre produit</Text>
          ) : (
            <Image style={styles.image} source={{ uri: image.uri }} />
          )}
        </View>
        <IconAntDesign
          name="upload"
          size={30}
          color="#2196f3"
          onPress={takeImage}
        />
        <Text>Choisir une image </Text>
      </View>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Nom</Label>
            <Input
              value={nom}
              onChangeText={(text) => {
                setNom(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Région</Label>
            <Input
              value={region}
              onChangeText={(text) => {
                setRegion(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Prix</Label>
            <Input
              keyboardType="numeric"
              value={prix}
              onChangeText={(text) => {
                setPrix(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Quantitée</Label>
            <Input
              keyboardType="numeric"
              value={quantite}
              onChangeText={(text) => {
                setQuantite(text);
              }}
            />
          </Item>

          <View style={{ marginTop: 20 }}>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Description"
              value={Description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>
        </Form>

        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          block
          onPress={() => {
            postDocument();
          }}
        >
          <Text>Envoyer</Text>
        </Button>
      </Content>
    </ScrollView>
  );
};

AjoutProduit.navigationOptions = {
  headerTitle: "Ajout Produit",
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AjoutProduit;
