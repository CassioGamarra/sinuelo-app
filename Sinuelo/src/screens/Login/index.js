import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import { setToken, setUser, getToken, getUser } from '../../services/auth';

import {
  extendTheme,
  NativeBaseProvider,
  Center,
  Image, 
  Box,
  VStack,
  FormControl,
  Input,
  Link,
  Button
} from 'native-base';

import Toast from 'react-native-toast-message';

import logo from '../../../assets/imagens/logo_login.png'; 
import background from '../../../assets/imagens/background.png'
import SQLiteManager from '../../database/SQLiteManager';

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        color: '#004725',
        fontWeight: 600
      },
      defaultProps: { size: 'lg' }
    }
  }
});

export default function Login() { 
  const tokenFazenda = 'MV9mYXplbmRhX2VzcGVyYW5jYQ==';
  const navigation = useNavigation(); 
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  } 

  useEffect(() => {
    buscarDados(); 
    initDatabase();
  }, [])

  async function buscarDados() {
    try {
      const token = await getToken();
      const user = await getUser();
      if(token && user) {
        navigation.navigate('Home');
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function initDatabase() {  
    await SQLiteManager.initDB();
    await SQLiteManager.createTablesFromSchema();
  }

  async function handleLogin() {
    if(usuario.trim().length === 0 || senha.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: 'Por favor, preencha o usuário e senha',
        position: 'bottom'
      });
    } else {
      startLoading();
      try { 
        const data = {
          "usuario": usuario,
          "senha": senha,
          "tokenFazenda": tokenFazenda
        };

        const callBackPost = await api.post('/login', data);
        if(callBackPost) {  
          stopLoading();
          if(callBackPost.data.statusCode === 200) { 
            setToken(callBackPost.data.token); 
            setUser(callBackPost.data.usuario);
            navigation.navigate('Home');
          } else if (callBackPost.data.statusCode === 404) {
            Toast.show({
              type: "error",
              text1: callBackPost.data.title,
              text2: callBackPost.data.message,
              position: 'bottom'
            });
          } else if (callBackPost.data.statusCode === 403) {
            Toast.show({
              type: "error",
              text1: callBackPost.data.title,
              text2: callBackPost.data.message,
              position: 'bottom'
            });
          }
        }
        
      } catch (err) {
        console.log(err)
        stopLoading();
        Toast.show({
          type: "error",
          text1: 'Falha ao acessar, tente novamente mais tarde',
          position: 'bottom'
        });
      }
    }
  }

  return (
    <ImageBackground source={background} resizeMode="cover" style={{flex: 1, justifyContent: "center"}}> 
      <NativeBaseProvider theme={theme}>
        <Box safeArea flex={1} p="3" py="5" w="90%" mx="auto"> 
          <Center flex={0} px="1">
            <Image source={logo} alt="Logo Sinuelo" size="2xl"/>
          </Center>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label
                _text={{
                  color: 'white',
                  fontSize: 'xl',
                  fontWeight: 700,
                }}
              >
                Usuário
              </FormControl.Label>
              <Input 
                variant="filled" 
                value={usuario}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => setUsuario(text)}
              /> 
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: 'white',
                  fontSize: 'xl',
                  fontWeight: 700,
                }}
              >
                Senha
              </FormControl.Label>
              <Input 
                variant="filled"
                type="password" 
                maxLength={200}
                value={senha}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => setSenha(text)}
              />
              <Link
                _text={{ fontSize: '14px', fontWeight: '500', color: 'white' }}
                alignSelf="flex-end"
                mt="1">
                Esqueceu a senha?
              </Link>
            </FormControl>
            <Button 
              mt="2" 
              backgroundColor="#ffffff" 
              _text={{ color: '#004725', fontSize: '18px', fontWeight: 700 }}
              onPress={handleLogin}
              isLoading={loading}
            >
              ENTRAR
            </Button>
          </VStack> 
        </Box> 
        <Toast ref={(ref) => Toast.setRef(ref)} /> 
      </NativeBaseProvider>
    </ImageBackground>
  );
}