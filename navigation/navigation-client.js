import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Catalogue from "../screens/client/catalogue";
import Detail from "../screens/client/details";
import Panier from "../screens/client/panier";
import ListCommande from "../screens/client/listeCommande";
import ListArticleCommande from "../screens/client/listArticleCommande";


const LandingNav = createStackNavigator(
  {
    Catalogue: Catalogue,
    Detail:Detail
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

const PaniereNav = createStackNavigator(
  {
    Panier: Panier,

  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2286c3",
      },
      headerTintColor: "white",
    },
  }
);

const CommandeNav = createStackNavigator(
  {
    ListCommande: ListCommande,
    ListArticleCommande: ListArticleCommande,

  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2286c3",
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
    Panier: {
      screen: PaniereNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontAwesome name="cart-plus" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Commandes: {
      screen: CommandeNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Entypo name="list" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
