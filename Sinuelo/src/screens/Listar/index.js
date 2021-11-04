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
import { getToken } from '../../services/auth';
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
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  } 

  useEffect(() => {
    listarAnimais();
  }, [])
 
  async function listarAnimais() {
    startLoading();
    try {
      const token = await getToken();
      if(token) { 
        try { 
          const getAnimais = await SQLiteManager.getAnimais();
          const data = [];
          for(let i = 0; i < getAnimais.rows.length; i++) {
            data.push(getAnimais.rows.item(i));
          }  
          setData(data); 
          stopLoading();
        } catch (err) {  
          stopLoading(); 
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
            {
              data.length > 0 &&
              <HStack w="100%" justifyContent="space-between">
                <Text style={styles.textTitle}>Animal</Text> 
                <Text style={styles.textTitle}>Brinco</Text>
              </HStack>
            }
            {
              data.length > 0 &&
              data.map((v) => {  
                return (
                  <HStack key={v.ID} w="100%" justifyContent="space-between"> 
                    <Text style={styles.text}>{v.NOME}</Text> 
                    <Text style={styles.text}>{v.BRINCO}</Text>
                  </HStack>
                ) 
              })
            }
            {
              data.length === 0 &&
              <Text style={styles.textTitle}>Nenhum animal cadastrado</Text> 
            }
          </VStack>  
        </VStack> 
      } 
    </NativeBaseProvider>
  );
}