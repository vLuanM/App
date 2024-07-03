import React from 'react';
import {useTheme, FAB} from '@rneui/themed';
import { COLORS } from '../assets/colors';

export default ({onClick}) => {
  return (
    <FAB
      visible={true}
      icon={{type: 'ionicon', name: 'add', color: COLORS.white}}
      color={COLORS.accentSecundary}
      onPress={() => onClick()}
      containerStyle={{position: 'absolute', bottom: 10, right: 10}}
    />
  );
};