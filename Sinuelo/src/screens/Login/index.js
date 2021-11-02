import React, { useState } from 'react';
import { ImageBackground, StatusBar, AsyncStorage } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
 
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
  Button, 
  useToast
} from 'native-base';

import Toast from 'react-native-toast-message';

//import Icon from 'react-native-vector-icons';

import logo from '../../../assets/imagens/logo_login.png'; 
import background from '../../../assets/imagens/background.png'

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
  const navigation = useNavigation();
  const toast = useToast();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  } 

  async function handleLogin() {
    if(usuario.trim().length === 0 || senha.trim().length === 0) {
      Toast.show({
        type: "error",
        text1: 'Por favor, preencha o usuário e senha',
        position: 'bottom'
      });
    } else {
      navigation.navigate('Home'); 
      /*startLoading();
      try { 
        const data = {
          "usuario": usuario,
          "senha": senha
        };

        const callBackPost = await api.post('/admin/login', data);
        if(callBackPost) {
          if(callBackPost.data.statusCode === 200) {

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
        stopLoading();
        Toast.show({
          type: "error",
          text1: 'Falha ao acessar, tente novamente mais tarde',
          position: 'bottom'
        });
      }*/
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