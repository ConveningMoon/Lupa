import { createContext, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    idToken: '',
    infoUser: {},
    isAuthenticated: false,
    authenticate: (idToken) => {},
    currentUser: (user) => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState();

  function authenticate(idToken) {
    setAuthToken(idToken);    
  }

  function currentUser(userInfo) {
    setUser(userInfo);
    AsyncStorage.setItem('token', JSON.stringify(userInfo));
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    idToken: authToken,
    infoUser: user,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    currentUser: currentUser,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;