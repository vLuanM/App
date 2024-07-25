import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const ServicoContext = createContext({});

export const ServicoProvider = ({children}) => {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('servicos') 
      .orderBy('nome')
      .onSnapshot(snapShot => {
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              descricao: doc.data().descricao,
              preco: doc.data().preco,
            });
          });
          setServicos(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const save = async (servico) => {
    try {
      await firestore().collection('servicos').doc().set(
        {
          nome: servico.nome,
          descricao: servico.descricao,
          preco: servico.preco,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('ServicoProvider, salvar: ' + e);
      return false;
    }
  };

  const update = async (servico) => {
    try {
      console.log(servico);
      await firestore().collection('servicos').doc(servico.uid).set(
        {
          nome: servico.nome,
          descricao: servico.descricao,
          preco: servico.preco,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('ServicoProvider, update: ', e);
      return false;
    }
  };

  const del = async (uid) => {
    try {
      await firestore().collection('servicos').doc(uid).delete();
      return true;
    } catch (e) {
      console.error('ServicoProvider, del: ', e);
      return false;
    }
  };

  return (
    <ServicoContext.Provider value={{servicos, save, update, del}}>
      {children}
    </ServicoContext.Provider>
  );
};
