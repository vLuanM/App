import React, {createContext, useContext, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const AuthenticationContext = createContext({});

export const AuthenticationProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function storeUserSession(email, pass) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email,
          pass,
        }),
      );
    } catch (error) {
      console.error('SignIn, storeUserSession' + error);
    }
  }
  async function logar(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      if (!auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await storeUserSession(email, pass);
      await getUser(pass);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function registrar(localUser, pass) {
    try {
      await auth().createUserWithEmailAndPassword(localUser.email, pass);
      await auth().currentUser.sendEmailVerification();
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set(localUser);
      return 'ok';
    } catch (e) {
      console.log('Error during registration:', e);
      console.log(e);
      return launchServerMessageErro(e);
    }
  }

  async function getUser(pass) {
    try {
     let doc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      if (doc.exists) {
        doc.data().uid = auth().currentUser.uid;
        doc.data().pass = pass;
        setUser(doc.data());
        return doc.data();
      }
      return null;   
    } catch (e) {
      return "erro";
    }
  }

  async function forgotPass(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }

  async function sair() {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  //função utilitária
  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthenticationContext.Provider value={{
    storeUserSession, 
    logar, 
    registrar, 
    forgotPass,
    retrieveUserSession,
    sair,
    user,
    getUser
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}