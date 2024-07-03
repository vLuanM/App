import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import { CommonActions } from '@react-navigation/native';
import {ServicoContext} from '../../context/ServicoProvider';
import Item from './Item';
import FloatButtonAdd from '../../componentes/FloatButtonAdd';
import SearchBar from '../../componentes/SearchBar';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {servicos} = useContext(ServicoContext);
  const [servicosTemp, setServicosTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let s = [];
    
      s.push(
        ...servicos.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (s.length > 0) {
        setServicosTemp(s);
      }
    } else {
      setServicosTemp([]);
    }
  };

  const routeServico = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Servico',
        params: {servico: item},
      }),
    );
  };
/*
  const routeAddServico = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Servico',
        params: {
          servico: {
            nome: '',
            descricao: '',
            latitude: '',
            longitude: '',
          },
        },
      }),
    );
  };
*/
  return (
    <Container>
      <SearchBar text="Qual Serviço desejas contratar?" setSearch={filterByName} />
      {}
      <FlatList
        data={servicosTemp.length > 0 ? servicosTemp : servicos}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeServico(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={() => routeServico(null)} />
    </Container>
  );
};