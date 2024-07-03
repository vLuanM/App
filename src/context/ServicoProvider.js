import React, {createContext, useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {ApiContext} from '../context/ApiProvider';


export const ServicoContext = createContext({});

export const ServicoProvider = ({children}) => {
  const [servicos, setServicos] = useState([]);
 /* const {api} = useContext(ApiContext);*/

  useEffect(() => {
    const listener = firestore()
      .collection('Servico')
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
/*
  useEffect(() => {
    if (api) {
      getServicos();
    }
  }, [api]);

  const getServicos = async () => {
    try {
      const response = await api.get('/servicos');
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pddm-39d5b/databases/(default)/documents/servicos/',
        );
        data.push({
          nome: d.fields.nome.stringValue,
          descricao: d.fields.descricao.stringValue,
          preco: d.fields.preco.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => {
        if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
          return -1;
        }
        if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
          return 1;
        }
        return 0;
      });
      setServicos(data);
    } catch (response) {
      console.error('Erro em getCompanies via API:');
      console.error(response);
    }
  };

  const save = async val => {
    try {
      await api.post('/servicos/', {
        fields: {
          nome: {stringValue: val.nome},
          descricao: {stringValue: val.descricao},
          preco: {stringValue: val.preco},
        },
      });
      getServicos();
      return true;
    } catch (response) {
      console.error('Erro em saveCompany via API: ' + response);
      return false;
    }
  };

  const update = async val => {
    try {
      await api.patch('/servicos/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          descricao: {stringValue: val.descricao},
          preco: {stringValue: val.preco},
        },
      });
      getServicos();
      return true;
    } catch (response) {
      return false;
    }
  };

  const del = async val => {
    try {
      await api.delete('/servicos/' + val);
      getServicos();
      return true;
    } catch (response) {
      console.error('Erro em deleteCompany via API: ' + response);
      return false;
    }
  };
*/
  return (
    <ServicoContext.Provider value={{servicos, save, update, del}}>
      {children}
    </ServicoContext.Provider>
  );
};