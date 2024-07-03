import React, {useContext} from 'react';
import {FlatList, Alert} from 'react-native';
import {AuthenticationContext} from '../../context/Authentication';
import {CommonActions} from '@react-navigation/native';
import {useTheme, ListItem, Icon} from '@rneui/themed';
import {COLORS} from '../../assets/colors';

export default ({navigation}) => {
  const {sair} = useContext(AuthenticationContext);
  const {theme} = useTheme();

  function processar(opcao) {
    switch (opcao) {
      case 'Perfil':
        navigation.navigate('PerfilUsuario');
        break;
      case 'Sair':
        signOut();
        break;
    }
  }

  function signOut() {
    if (sair()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      Alert.alert(
        'Ops!',
        'Estamos com problemas para realizar essa operação.\nPor favor, contate o administrador.',
      );
    }
  }

  return (
    <FlatList
      data={[
        {key: 1, opcao: 'Perfil', iconName: 'person'},
        {key: 2, opcao: 'Sair', iconName: 'log-in-sharp'},
      ]}
      renderItem={({item}) => (
        <ListItem bottomDivider onPress={() => processar(item.opcao)}>
          <Icon
            type="ionicon"
            name={item.iconName}
            color={COLORS.primary}
            size={20}
          />
          <ListItem.Content>
            <ListItem.Title>{item.opcao}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
      keyExtractor={item => item.key}
      style={{margin: 10, marginTop: 20}}
    />
  );
};