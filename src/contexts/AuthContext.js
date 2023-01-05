import { useContext, createContext, useEffect, useState } from 'react';
import {
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../firebase';
import useOauth from '../hooks/api/useOauth';
import UserContext from './UserContext';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const { logInWithOauth } = useOauth();
  const { setUserData } = useContext(UserContext);

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const oAuthSignIn = async() => {
    try {
      const data = await gitHubSignIn();
      const userData = await logInWithOauth(data.user.email);
      setUserData(userData);
      toast('Logado com sucesso!');
    } catch (error) {
      toast('Não foi possível entrar com o github!');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ gitHubSignIn, user, logOut, oAuthSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
