import { useState, useCallback, useEffect } from "react";



export const UserAuthAgriculteur = () => {
  const [tokenA, setToken] = useState(false);
  const [userIdA, setUserId] = useState(false);

  const loginA = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logoutA = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);


  return { tokenA, loginA, logoutA, userIdA };
};
