import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import Card from "../../components/Card";
import { Spinner } from "native-base";
import { Authcontext } from "../../context/auth-context";
import { useContext } from "react";


const LoginA = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useContext(Authcontext);

  const submit = async () => {
    console.log(email);
    console.log(password);

    setLoading(true);

    let response = await fetch(
      "http://192.168.1.185:5000/api/agriculteur/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert(
        'Message',
        responsedata.message,
        [{ text: 'fermer' }]
      );
      setLoading(false);
      throw new Error(responsedata.message);
    }

    let responsedata = await response.json();
    setLoading(false);
    console.log(responsedata.condidat._id)
    auth.loginA(responsedata.agriculteur._id, responsedata.token);
  };
  return (
    <Card style={styles.authContainer}>
      
      {loading && <Spinner />}
      <ScrollView>
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
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="password"
            placeholderTextColor="dark"
            passwordRules
            label="password"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Valider"
            color="#a5d6a7"
            onPress={() => {
              submit();
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Créé un compte"
            color="#a5d6a7"
            onPress={() => {
              props.navigation.navigate({
                routeName: "SignupA",
              });
            }}
          />
        </View>
      </ScrollView>
    </Card>
  );
};

LoginA.navigationOptions = {
  headerTitle: "Connextion Agriculteur",
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
    marginTop: "40%",
  },
  buttonContainer: {
    marginTop: 10,
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

export default LoginA;
