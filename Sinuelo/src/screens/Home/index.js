import React, { useState, useEffect } from 'react'; 

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import {
  extendTheme,
  NativeBaseProvider, 
  VStack, 
  Heading,
  Pressable,
  HStack,
  Text, 
  Center,
  Spinner,
} from 'native-base';
 

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons';  
import Toast from 'react-native-toast-message';
import { getUser, getToken } from '../../services/auth'; 
import api from '../../services/api';
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
    width: 120,
    height: 80,
    padding: 8, 
    backgroundColor: '#ffffff', 
  },
  textButton: {
    fontSize: 13,
    fontWeight: "700",
    color: '#004725'
  }
});

export default function Home() {
  const navigation = useNavigation();    
  const [usuario, setUsuario] = useState(''); 

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  } 

  useEffect(() => {
    buscarUsuario(); 
  }, [])

  async function buscarUsuario() {
    try {
      const user = await getUser();
      if(user) {
        setUsuario(user);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function sincronizar() {
    startLoading();  
    try { 
      const token = await getToken();
      /*Histórico de alertas*/ 
      const getHistoricoAlertas = await SQLiteManager.getHistoricoAlertas(); 
      const historicoAlertas = [];

      if(getHistoricoAlertas && getHistoricoAlertas.rows) {
        for(let i = 0; i < getHistoricoAlertas.rows.length; i++) {
          historicoAlertas.push(getHistoricoAlertas.rows.item(i));
        }
      }
      
      const historicoPesagens = [];
      const historicoVacinas = [];
      const historicoDoencas = [];
      const historicoMedicamentos = [];

      const dados = {
        historicoAlertas: historicoAlertas,
        historicoPesagens: historicoPesagens,
        historicoVacinas: historicoVacinas,
        historicoDoencas: historicoDoencas,
        historicoMedicamentos: historicoMedicamentos
      } 
      
      const callBackPost = await api.post('/sincronizar', dados, {
        headers: { Authorization: "Bearer " + token }
      }); 

      if(callBackPost && callBackPost.data.statusCode === 200) {   
        try {
          SQLiteManager.dropTables();
          SQLiteManager.createTablesFromSchema();  
          if(token) { 
            try {
              const getDados = await api.get('/sincronizar', {
                headers: { Authorization: "Bearer " + token }
              });   
     
              for(let animal of getDados.data.animais) {
                await SQLiteManager.addTableAnimal(animal);
              }
    
              for(let brinco of getDados.data.brincos) {
                await SQLiteManager.addTableBrinco(brinco);
              }
    
              for(let alerta of getDados.data.alertas) {
                await SQLiteManager.addTableAlerta(alerta);
              }

              for(let vacina of getDados.data.vacinas) {
                await SQLiteManager.addTableVacina(vacina);
              }

              for(let doenca of getDados.data.doencas) {
                await SQLiteManager.addTableDoenca(doenca);
              }

              for(let medicamento of getDados.data.medicamentos) {
                await SQLiteManager.addTableMedicamento(medicamento);
              }

              Toast.show({
                type: "success",
                text1: 'Aplicativo sincronizado.',
                position: 'bottom'
              }); 
              stopLoading();   
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
                stopLoading(); 
                Toast.show({
                  type: "error",
                  text1: 'Falha na conexão!',
                  position: 'bottom'
                });
              }
            } 
          }
        } catch (e) {
          stopLoading();
          console.log(e);
        } 
      } 
    } catch (err) { 
      stopLoading();
      Toast.show({
        type: "error",
        text1: 'Falha ao acessar, tente novamente mais tarde',
        position: 'bottom'
      });
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
            Bem vindo {usuario}
          </Heading> 
          <HStack space={3}>
            <Pressable style={styles.pressableButton} onPress={() => navigation.navigate('Listar')}> 
                <VStack space={1}  alignItems="center">
                  <Ionicons
                    name="list-circle-outline"
                    size={35}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Listar
                  </Text>
                </VStack>  
            </Pressable>

            <Pressable style={styles.pressableButton} onPress={() => navigation.navigate('Rotinas')}>
              <VStack space={1} alignItems="center"> 
                  <MaterialCommunityIcons
                    name="cow"
                    size={35}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Rotinas
                  </Text>
              </VStack>
            </Pressable>

            <Pressable style={styles.pressableButton} onPress={sincronizar}>
              <VStack space={1} alignItems="center"> 
                  <MaterialCommunityIcons
                    name="cloud-sync-outline"
                    size={35}
                    color="#004725"
                  />  
                  <Text style={styles.textButton}>
                    Sincronizar
                  </Text> 
              </VStack>
            </Pressable>
          </HStack> 
          <HStack space={3}>
            <Pressable style={styles.pressableButton} onPress={() => navigation.navigate('Listar')}> 
                <VStack space={1}  alignItems="center">
                  <Ionicons
                    name="color-wand-outline"
                    size={35}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Conectar Bastão
                  </Text>
                </VStack>  
            </Pressable>   

            <Pressable style={styles.pressableButton}>
              <VStack space={1} alignItems="center"> 
                  <FontAwesome
                    name="gears"
                    size={35}
                    color="#004725"
                  />  
                  <Text style={styles.textButton}>
                    Configurações
                  </Text> 
              </VStack>
            </Pressable>
          </HStack>
        </VStack> 
      }
      <Toast ref={(ref) => Toast.setRef(ref)} /> 
    </NativeBaseProvider>
  );
}