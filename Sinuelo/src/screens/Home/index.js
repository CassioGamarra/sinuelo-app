import React from 'react'; 

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  extendTheme,
  NativeBaseProvider,
  Center, 
  VStack, 
  Heading,
  Pressable,
  HStack,
  Text,
  Box
} from 'native-base';
 

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Toast from 'react-native-toast-message';  
import { buttonStyle } from 'styled-system';

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
    fontSize: 14,
    fontWeight: "700",
    color: '#004725'
  }
});

export default function Home() {
  const navigation = useNavigation();

  function rotinas() {
    navigation.navigate('Rotinas');
  }

  return (
    <NativeBaseProvider theme={theme}> 
        <VStack space={4} marginTop={1} padding={2} >  
          <Heading color="#004725">
            Bem vindo @usuario
          </Heading> 
          <HStack space={3}>
            <Pressable style={styles.pressableButton}> 
                <VStack space={3}  alignItems="center">
                  <FontAwesome
                    name="list-alt"
                    size={30}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Listar
                  </Text>
                </VStack>  
            </Pressable>

            <Pressable style={styles.pressableButton} onPress={rotinas}>
              <VStack space={3} alignItems="center"> 
                  <MaterialCommunityIcons
                    name="cow"
                    size={30}
                    color="#004725"
                  /> 
                  <Text style={styles.textButton}>
                    Rotinas
                  </Text>
              </VStack>
            </Pressable>

            <Pressable style={styles.pressableButton}>
              <VStack space={3} alignItems="center"> 
                  <FontAwesome
                    name="gears"
                    size={30}
                    color="#004725"
                  />  
                  <Text style={styles.textButton}>
                    Configurações
                  </Text> 
              </VStack>
            </Pressable>
          </HStack> 
        </VStack> 
    </NativeBaseProvider>
  );
}