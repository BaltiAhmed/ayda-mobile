import { StatusBar } from "expo-status-bar";
import React from "react";
import Auth from "./navigation/authNavigation";
import LandingNavClient from "./navigation/navigation-client";
import LandingNavAgriculteur from "./navigation/navigation-agriculteur";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/auth";
import { UserAuthAgriculteur } from "./hooks/authA";

export default function App() {
  const { userId, token, login, logout } = UserAuth();
  const { userIdA, tokenA, loginA, logoutA } = UserAuthAgriculteur();
  let routes;
  if (token) {
    routes = <LandingNavClient />;
  } else if (tokenA) {
    routes = <LandingNavAgriculteur />;
  } else {
    routes = <Auth />;
  }
  return (
    <Authcontext.Provider
      value={{
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        userIdA: userIdA,
        tokenA: tokenA,
        loginA: loginA,
        logoutA: logoutA,
      }}
    >
      <LandingNavAgriculteur />
    </Authcontext.Provider>
  );
}
