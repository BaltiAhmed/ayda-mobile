import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import Card from "../../components/Card";
import { Spinner } from "native-base";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [tel, setTel] = useState();
  const [adresse, setAdresse] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    let response = await fetch(
      "http://192.168.42.17:5000/api/client/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          nom: nom,
          prenom:prenom,
          adresse:adresse,
          tel:tel,
          password:password
        }),
      }
    );
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }
    setLoading(false);
    Alert.alert(
      "Message",
      "Votre compte est crée",
      [{ text: "fermer" }]
    );
  };

  return (
    <Card style={styles.authContainer}>
      {loading && <Spinner />}
      <ScrollView>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={(text) => {
              setNom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="nom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Prenom</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={(text) => {
              setPrenom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="prenom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

       

        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="email"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Tel</Text>
          <TextInput
            style={styles.input}
            value={tel}
            onChangeText={(text) => {
              setTel(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="tel"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.input}
            value={adresse}
            onChangeText={(text) => {
              setAdresse(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="adresse"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="passsword"
            placeholderTextColor="dark"
            label="E-mail"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Valider" color="#a5d6a7" onPress={submit} />
        </View>
      </ScrollView>
    </Card>
  );
};

Signup.navigationOptions = {
  headerTitle: "Inscription Client",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 600,
    padding: 20,
    marginLeft: "10%",
    marginTop: "20%",
  },
  buttonContainer: {
    marginTop: 20,
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
  },
});

export default Signup;
