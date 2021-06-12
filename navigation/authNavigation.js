import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginA from "../screens/agriculteur/login";
import SignupA from "../screens/agriculteur/signup";
import Login from "../screens/client/login";
import Signup from "../screens/client/signup";

const Auth = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
    LoginA: LoginA,
    SignupA:SignupA
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#75a478",
      },
      headerTintColor: "white",
    },
  }
);

export default createAppContainer(Auth);
