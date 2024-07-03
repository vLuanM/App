import React, {createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthenticationContext} from './Authentication';


export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const {getUser, sair} = useContext(AuthenticationContext);

  const save = async (user, urlDevice) => {
    try {

      

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({nome: user.nome}, {merge: true});
      //renew user in session
      if (await getUser(user.pass)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('users').doc(uid).delete();
      await auth().currentUser.delete();
      await sair();
      return true;
    } catch (e) {
      return false;
    }
  };

  async function updatePassword(pass) {
    try {
      await auth().currentUser.updatePassword(pass);
      return true;
    } catch (e) {
      console.error('updatePassword' + e);
      return false;
    }
  }

  return (
    <UserContext.Provider value={{save, del, updatePassword}}>
      {children}
    </UserContext.Provider>
  );
};