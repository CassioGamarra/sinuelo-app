import React, { useState, useEffect } from 'react'; 

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
  Heading, 
  TextArea
} from 'native-base';
  
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import { getToken } from '../../../services/auth';
import SQLiteManager from '../../../database/SQLiteManager'; 
import Toast from 'react-native-toast-message';

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

  const [medicamento, setMedicamento] = useState('');
  const [observacao, setObservacao] = useState('');
  const [data, setData] = useState([]); 

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  } 

  useEffect(() => {
    listarMedicamentos(); 
  }, [])
 
  async function listarMedicamentos() {
    startLoading();
    try {
      const token = await getToken();
      if(token) { 
        try { 
          const getMedicamentos = await SQLiteManager.getMedicamentos();
          let data = [];
          for(let i = 0; i < getMedicamentos.rows.length; i++) {
            data.push(getMedicamentos.rows.item(i));
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

  async function cadastrarMedicamento() {
    if(medicamento === '') {
      Toast.show({
        type: "error",
        text1: 'Selecione um medicamento',
        position: 'bottom'
      });
    } else { 
      startLoading();
      try {
        const data = {
          idMedicamento: Number(medicamento),
          idAnimal: idAnimal, 
          observacao: observacao !== '' ? observacao : null
        }
        const id = await SQLiteManager.addMedicamento(data);
        stopLoading();
        if (id) {
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
            selectedValue={medicamento}
            placeholder="Selecione um medicamento" 
            onValueChange={(value) => setMedicamento(value)}
            style={{borderWidth: 1, borderColor: '#004725'}}
          >
            {
              data.map((v) => {
                return (<Select.Item key={v.ID} label={v.DESCRICAO} value={v.ID}/>)
              })
            }
          </Select>
          <TextArea  
            h={20}
            placeholder="Observação"
            value={observacao}
            style={{ borderColor: '#004725'}}
            onChangeText={(text) => setObservacao(text)}
            maxLength={500}
          />
        </VStack>    
      }
      {
        !loading &&
        <Center space={1} style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <Pressable style={styles.pressableButton} onPress={cadastrarMedicamento}> 
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
      <Toast ref={(ref) => Toast.setRef(ref)} /> 
    </NativeBaseProvider>
  );
}