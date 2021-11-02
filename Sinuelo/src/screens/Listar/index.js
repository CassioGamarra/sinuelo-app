import React, { useState, useEffect } from 'react'; 

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import api from '../../services/api';

import {
  extendTheme,
  NativeBaseProvider, 
  VStack, 
  Heading, 
  Text, 
  Spinner, 
  Center,
  HStack
} from 'native-base';
 

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Toast from 'react-native-toast-message';
import { getToken } from '../../services/auth';

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

const styles = StyleSheet.create({
  pressableButton :{    
    padding: 8, 
    backgroundColor: '#ffffff', 
  }, 
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: '#004725'
  }
});

export default function Home() {
  const navigation = useNavigation();      
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarAnimais();
  }, [])
 
  async function listarAnimais() {
    try {
      const token = await getToken();
      if(token) { 
        try {
          const getAnimais = await api.get('/animais', {
            headers: { Authorization: "Bearer " + token }
          });  
          setData(getAnimais.data); 
          setLoading(false);
        } catch (err) { 
          if (err.response) {
            if (err.response.status === 401) { 
              Toast.show({
                type: "error",
                text1: 'Sua sessão expirou, por favor, realize login novamente!',
                position: 'bottom'
              });
            }
          } else { 
            setLoading(false); 
            Toast.show({
              type: "error",
              text1: 'Falha na conexão!',
              position: 'bottom'
            });
          }
        }

      }
    } catch (e) {
      console.log(e);
    } 
  }
  
  return (
    <NativeBaseProvider theme={theme}> 
      {
        loading &&
        <Center flex={1} px="3"> 
          <VStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" color="#004725" size="lg"/>
            <Heading color="#004725" fontSize="lg">
              Carregando
            </Heading>
          </VStack>
        </Center>
      }
      {
        !loading &&
        <VStack space={4} marginTop={1} padding={2} >  
          <Heading color="#004725">
            <MaterialCommunityIcons
              name="cow"
              size={30}
              color="#004725"
            />
            Animais cadastrados
          </Heading> 
          <VStack space={3} style={styles.pressableButton}>
            <HStack w="100%" justifyContent="space-between">
              <Text style={styles.textTitle}>Animal</Text> 
              <Text style={styles.textTitle}>Brinco</Text>
            </HStack>
            {
              data.map((v) => {  
                return (
                  <HStack key={v.id} w="100%" justifyContent="space-between"> 
                    <Text style={styles.text}> 
                      {v.nome}
                    </Text> 
                    <Text style={styles.text}>{v.brinco}</Text>
                  </HStack>
                ) 
              })
            }
          </VStack>  
        </VStack> 
      } 
    </NativeBaseProvider>
  );
}