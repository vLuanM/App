import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import MeuButtom from '../../componentes/MeuButtom';
import { COLORS } from '../../assets/colors';

const Home = ({ navigation }) => {
  const [itensSupermercado, setItensSupermercado] = useState([
    { id: '1', nome: 'Arroz', checked: false },
    { id: '2', nome: 'Feijão', checked: false },
    { id: '3', nome: 'Macarrão', checked: false },
    { id: '4', nome: 'Carne', checked: false },
    { id: '5', nome: 'Frango', checked: false },
    { id: '6', nome: 'Leite', checked: false },
    { id: '7', nome: 'Ovos', checked: false },
    { id: '8', nome: 'Pão', checked: false },
    { id: '9', nome: 'Manteiga', checked: false },
    { id: '10', nome: 'Açúcar', checked: false }
  ]);

  const toggleCheckBox = (id) => {
    setItensSupermercado(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  function mudarDeScreen() {
    navigation.navigate('SignIn');
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleCheckBox(item.id)}>
      <View style={styles.item}>
        <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
          {item.nome}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Supermercado</Text>
      <FlatList
        data={itensSupermercado}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
     
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  itemText: {
    fontSize: 18,
    color: '#FF0000',
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: '#90ee90',
  },
});
