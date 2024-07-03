import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { COLORS } from '../../assets/colors';
import MeuButtom from '../../componentes/MeuButtom';
import { AuthenticationContext } from '../../context/Authentication';

const ForgotPassWord = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const { forgotPass } = useContext(AuthenticationContext);

  const recover = async () => {
    if (email !== '') {
      setIsLoading(true); // Define isLoading como verdadeiro para mostrar o preload

      const msgError = await forgotPass(email);
      if (msgError === 'ok') {
        Alert.alert(
          'Atenção',
          'Enviamos um email de recuperação de senha para o seguinte endereço:\n' +
            email,
          [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
      } else {
        Alert.alert('Ops!', msgError);
      }

      setIsLoading(false); // Define isLoading como falso após a operação
    } else {
      Alert.alert('Ops!', 'Por favor, digite um email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setEmail(t)}
        autoFocus={true}
      />
      {/* Mostra preload após clicar em recuperar */}
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.accent} style={{ marginTop: 20 }}/>
        
      ) : (
        <MeuButtom texto="Recuperar" aoClicar={recover} cor={COLORS.accent} />
      )}
    </View>
  );
};
export default ForgotPassWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 40,
  },
});
