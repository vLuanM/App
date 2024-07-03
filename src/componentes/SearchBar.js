import React from 'react';
import {Platform} from 'react-native';
import {useTheme, SearchBar} from '@rneui/themed';
import { COLORS } from '../assets/colors';

export default ({text, setSearch}) => {
  return (
    <SearchBar
      placeholder={text}
      platform={Platform.OS === 'android' ? 'android' : 'ios'}
      searchIcon={{
        type: 'ionicon',
        name: 'search',
        size: 20,
        color: COLORS.accent,
      }}
      clearIcon={{
        type: 'ionicon',
        name: 'close',
        size: 20,
        color: COLORS.accent,
      }}
      cancelIcon={{
        type: 'ionicon',
        name: 'arrow-back',
        size: 20,
        color: COLORS.accent,
      }}
      containerStyle={{height: 50}}
      returnKeyType="next"
      onChangeText={t => setSearch(t)}
    />
  );
};