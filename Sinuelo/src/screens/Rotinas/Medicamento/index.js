import React, { useState } from 'react'; 

import { StyleSheet, TouchableHighlight } from 'react-native';

import {
  extendTheme,
  NativeBaseProvider,
  Center, 
  VStack, 
  Heading,
  Pressable,
  HStack,
  Text,
  FormControl,
  Input
} from 'native-base';
 

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AndDesign from 'react-native-vector-icons/AntDesign';

import Toast from 'react-native-toast-message';  
import { buttonStyle } from 'styled-system';

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
    width: 120,
    height: 80,
    padding: 8, 
    backgroundColor: '#ffffff',  
  },
  textButton: {
    fontSize: 14,
    fontWeight: "700",
    color: '#004725'
  }
});


export default function Rotinas() {
  const [codigoBrinco, setCodigoBrinco] = useState(''); 

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
                Digite o código ou aproxime o brinco do leitor:
              </FormControl.Label>
              <Input 
                variant="outline" 
                value={codigoBrinco}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => setCodigoBrinco(text)}
                style={{borderColor: '#004725'}}
              /> 
            </FormControl>
          <HStack space={3}>
            <Pressable style={styles.pressableButton} onPress={() => console.log('pru')}>
              <VStack space={3} alignItems="center">
                <MaterialCommunityIcons
                  name="bell-plus"
                  size={30}
                  color="#004725"
                />
                <Text style={styles.textButton}>
                  Alerta
                </Text>
              </VStack>
            </Pressable>

            <Pressable style={styles.pressableButton}>
              <VStack space={3} alignItems="center"> 
                  <FontAwesome5
                    name="balance-scale"
                    size={30}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Peso
                  </Text>
              </VStack>
            </Pressable>

            <Pressable style={styles.pressableButton}>
              <VStack space={3} alignItems="center"> 
                  <FontAwesome5
                    name="syringe"
                    size={30}
                    color="#004725"
                  />  
                  <Text style={styles.textButton}>
                    Vacina
                  </Text> 
              </VStack>
            </Pressable>
          </HStack> 

          <HStack space={3}>
            <Pressable style={styles.pressableButton}> 
                <VStack space={3}  alignItems="center">
                  <FontAwesome5
                    name="viruses"
                    size={30}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Doença
                  </Text>
                </VStack>  
            </Pressable>

            <Pressable style={styles.pressableButton}>
              <VStack space={3} alignItems="center"> 
                  <FontAwesome5
                    name="prescription-bottle"
                    size={30}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Medicamento
                  </Text>
              </VStack>
            </Pressable>
 
          </HStack>
        </VStack> 
    </NativeBaseProvider>
  );
}