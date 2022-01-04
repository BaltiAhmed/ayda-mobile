import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import Landing from "../screens/agriculteur/landing";
import AjoutProduit from "../screens/agriculteur/ajout-produit";
import ListeService from "../screens/agriculteur/liste-service";
import ChatScreen from "../screens/agriculteur/chat";
import AntDesign from "react-native-vector-icons/AntDesign";

const LandingNav = createStackNavigator(
  {
    Landing: Landing,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const AjoutProduitNav = createStackNavigator(
  {
    AjoutProduit: AjoutProduit,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const ServiceNav = createStackNavigator(
  {
    ListeService: ListeService,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const ChatNav = createStackNavigator(
  {
    ChatScreen: ChatScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#006400",
      },
      headerTintColor: "white",
    },
  }
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="home" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Produit: {
      screen: AjoutProduitNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconFontAwesome name="product-hunt" size={25} color="#fafafa" />
          );
        },
        tabBarColor: "#0086c3",
      },
    },
    Service: {
      screen: ServiceNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconMaterialIcons name="room-service" size={25} color="#fafafa" />
          );
        },
        tabBarColor: "#0086c3",
      },
    },
    Chat: {
      screen: ChatNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <AntDesign name="message1" size={25} color="#fafafa" />;
        },
        tabBarColor: "#006400",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
