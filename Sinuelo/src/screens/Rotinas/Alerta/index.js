import React, { useState, useEffect, useRef } from 'react'; 

import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  extendTheme,
  NativeBaseProvider,
  Select, 
  VStack,  
  Pressable,
  HStack,
  Text,
  FormControl,
  Input,
  Center,
  Spinner,
  Heading
} from 'native-base';
  
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';  
import SQLiteManager from '../../../database/SQLiteManager'; 
import Toast from 'react-native-toast-message';

import Alerta from '../../../components/Alerta';

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        color: '#004725',
        fontWeight: 700, 
      },
      defaultProps: { size: 'lg' }
    }
  }
});

const styles = StyleSheet.create({
  pressableButton :{  
    width: '100%',
    height: 50,
    padding: 8, 
    backgroundColor: '#004725',  
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
    color: '#ffffff'
  }
});


export default function Rotinas() { 
  const navigation = useNavigation();
  const route = useRoute();
  const codigoBrinco = route.params.codigoBrinco;  
  const idAnimal = route.params.idAnimal;
  const [alerta, setAlerta] = useState('');
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  }  

  useEffect(() => { 
    verificarAlertas();
    listarAlertas(); 
  }, []);

  /*Alertas*/  
  const [alertOpen, setAlertOpen] = useState(false); 
  const [animal, setAnimal] = useState('');
  const [descricaoAlerta, setDescricaoAlerta] = useState('');
  const cancelRef = useRef(null); 
  const onAlertClose = () => setAlertOpen(false);

  async function verificarAlertas() {
    const alerta = await SQLiteManager.getAlertaByCodigo(codigoBrinco);
    if (alerta.rows.item(0)) {
      setAnimal(alerta.rows.item(0).NOME);
      setDescricaoAlerta(alerta.rows.item(0).DESCRICAO);
      setAlertOpen(true);
    }
  }

  async function listarAlertas() {
    startLoading();
    try { 
      const getAlertas = await SQLiteManager.getAlertas();
      let data = [];
      for(let i = 0; i < getAlertas.rows.length; i++) {
        data.push(getAlertas.rows.item(i));
      }  
      setData(data); 
      stopLoading();
    } catch (err) {  
      stopLoading();   
    }
  }

  async function cadastrarAlerta() {
    if(alerta === '') {
      Toast.show({
        type: "error",
        text1: 'Selecione um alerta',
        position: 'bottom'
      });
    } else { 
      startLoading();
      try {
        const data = {
          idAlerta: Number(alerta),
          idAnimal: idAnimal, 
        }
        const idAlerta = await SQLiteManager.verificarAlerta(data);
        
        if(idAlerta.rows.length > 0) {
          stopLoading();
          Toast.show({
            type: "error",
            text1: 'Alerta já cadastrado!',
            position: 'bottom'
          }); 
        } else {
          const id = await SQLiteManager.addAlerta(data); 
          stopLoading();
          if(id) {  
            Toast.show({
              type: "success",
              text1: 'Alerta salvo',
              position: 'bottom'
            }); 
          } else {
            Toast.show({
              type: "error",
              text1: 'Ocorreu um erro ao salvar!',
              position: 'bottom'
            });
          } 
        }  
      } catch(e) {
        console.log(e);
      } 
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
      { !loading && 
        <VStack space={3} marginTop={1} padding={3} >  
          <FormControl>
              <FormControl.Label
                _text={{
                  color: '#004725',
                  fontSize: 'xl',
                  fontWeight: 700,
                }}
              >
                Código do brinco:
              </FormControl.Label>
              <Input 
                variant="outline" 
                isReadOnly
                value={codigoBrinco}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => setCodigoBrinco(text)}
                style={{borderColor: '#004725'}}
              /> 
          </FormControl>
          <Select 
            selectedValue={alerta}
            placeholder="Selecione um alerta" 
            onValueChange={(value) => setAlerta(value)}
            style={{borderWidth: 1, borderColor: '#004725'}}
          >
            {
              data.map((v) => {
                return (<Select.Item key={v.ID} label={v.DESCRICAO} value={v.ID}/>)
              })
            }
          </Select>
        </VStack>    
      }
      {
        !loading &&
        <Center space={1} style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Pressable style={styles.pressableButton} onPress={cadastrarAlerta}> 
            <Center>  
              <HStack space={3} alignItems="center">
                <FontAwesome5
                  name="save"
                  size={30}
                  color="#ffffff"
                />
                <Text style={styles.textButton}>
                  Salvar
                </Text>
              </HStack> 
            </Center>  
          </Pressable> 
        </Center>
      } 
      <Alerta
        cancelRef={cancelRef}
        alertOpen={alertOpen}
        onAlertClose={onAlertClose}
        animal={animal}
        codigoBrinco={codigoBrinco}
        descricaoAlerta={descricaoAlerta}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} /> 
    </NativeBaseProvider>
  );
}