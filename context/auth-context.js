import { createContext } from "react";

export const Authcontext = createContext({
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  userIdA: null,
  tokenA: null,
  loginA: () => {},
  logoutA: () => {}
});
