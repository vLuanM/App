
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from '@rneui/themed';
import { COLORS } from '../assets/colors';

export default ({texto, onClick}) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
      marginBottom: 0,
      borderRadius: 50,
    },
    button: {
      backgroundColor: COLORS.accent,
      borderColor: COLORS.primary,
      borderWidth: 1,
    },
    title: {color: COLORS.primary},
  });

  return (
    <Button
      title={texto}
      type="outline"
      containerStyle={styles.container}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={onClick}
    />
  );
};