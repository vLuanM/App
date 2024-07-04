import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MeuButtom from '../../componentes/MeuButtom';
import OutlineButton from '../../componentes/OutlineButton';
import Loading from '../../componentes/Loading';
import {ServicoContext} from '../../context/ServicoProvider';
import {useTheme, Input, Icon} from '@rneui/themed';
import { COLORS } from '../../assets/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

export default ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [uid, setUid] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, update, del} = useContext(ServicoContext);

  useEffect(() => {
    if (route.params.value) {
      setUid(route.params.value.uid);
      setNome(route.params.value.nome);
      setDescricao(route.params.value.descricao);
      setPreco(route.params.value.preco);
    }
  }, [route]);

  const salvar = async () => {
    if (nome && descricao && preco) {
      let servico = {};
      servico.uid = uid;
      servico.nome = nome;
      servico.descricao = descricao;
      servico.preco = preco;
      setLoading(true);
      if (servico.uid) {
        if (await update(servico)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await save(servico)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir o serviço?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            if (await del(uid)) {
              ToastAndroid.show(
                'Show! Você excluiu com sucesso.',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
            }
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <Scroll>
      <Container>
        <Input
          placeholder="Tipo de produto"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="bag-handle-sharp"
              size={22}
              color={COLORS.primary}
            />
          }
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <Input
          placeholder="Produto"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="chevron-forward-sharp"
              size={22}
              color={COLORS.primary}
            />
          }
          onChangeText={t => setDescricao(t)}
          value={descricao}
        />
        <Input
          placeholder="Preço"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="pricetags"
              size={22}
              color={COLORS.primary}
            />
          }
          onChangeText={t => setPreco(t)}
          value={preco}
        />
        <MeuButtom aoClicar={salvar} texto="Salvar" cor={COLORS.accent}/>
        {uid ? <OutlineButton texto="Excluir" onClick={excluir} /> : null}
      </Container>
    </Scroll>
  );
};