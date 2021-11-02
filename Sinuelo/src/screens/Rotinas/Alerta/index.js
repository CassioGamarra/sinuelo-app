import React, { useState } from 'react'; 

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
  Input
} from 'native-base';
  
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

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
    height: 80,
    padding: 8, 
    backgroundColor: '#ffffff',  
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
    color: '#004725'
  }
});


export default function Rotinas() { 
  const navigation = useNavigation();
  const route = useRoute();
  const codigoBrinco = route.params.codigoBrinco; 
  const [alerta, setAlerta] = useState('');

  const alertas = [
    {
      id: 1,
      descricao: 'teste'
    },
    {
      id: 2,
      descricao: 'teste2'
    }, 
  ]

  return (
    <NativeBaseProvider theme={theme}> 
        <VStack space={4} marginTop={1} padding={2} >  
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
          >
            {
              alertas.map((v) => {
                return (<Select.Item key={v.id} label={v.descricao} value={v.id}/>)
              })
            }
          </Select>
          <HStack space={3}>
            <Pressable style={styles.pressableButton} onPress={() => console.log('pru')}>
              <VStack space={3} alignItems="center">
                <FontAwesome5
                  name="save"
                  size={30}
                  color="#004725"
                />
                <Text style={styles.textButton}>
                  Salvar
                </Text>
              </VStack>
            </Pressable> 
          </HStack>  
        </VStack> 
    </NativeBaseProvider>
  );
}