import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
import OutlineButton from '../../componentes/OutlineButton';
import { COLORS } from '../../assets/colors';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: COLORS.primaryDark,
      backgroundColor: COLORS.primary,
    },
    title: {
      color: COLORS.white,
    },
    divider: {
      width: 260,
    },
    div_estudante: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    foto: {
      width: 50,
      height: 50,
      marginRight: 20,
      borderRadius: 50 / 2,
    },
    nome: {
      textAlign: 'center',
      color: COLORS.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={COLORS.primary} style={styles.divider} />
      <View style={styles.div_servico}>
        <Text style={styles.nome}>{item.descricao}</Text>
        <Text style={styles.nome}>{item.preco}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};