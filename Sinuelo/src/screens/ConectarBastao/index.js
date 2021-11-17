import React, { useState, useEffect } from 'react';  
 

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button, 
  FlatList,
  TouchableHighlight, 
} from 'react-native'; 


import { 
  VStack, 
  Heading,  
  Spinner, 
  Center, 
  extendTheme, 
  NativeBaseProvider
} from 'native-base';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
 
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import Toast from 'react-native-toast-message';   

import Bastao from '../../bastao/Bastao'; 

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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default function Home() { 
  const [list, setList] = useState([]); 
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(!loading);
  }
  const stopLoading = () => {
    setLoading(false);
  } 

  async function getDispositivosPareados() {
    startLoading();
    try {
      let bonded = await RNBluetoothClassic.getBondedDevices(); 
      setList(bonded);
      stopLoading();
    } catch (error) { 
      stopLoading();
      console.log(error)
    }
  }
 
  async function verificaConexao(item) {
    if(item.name !== 'HC-06') {
      Toast.show({
        type: "error",
        text1: 'Por favor, selecione o bastão (HC-06).',
        position: 'bottom'
      });
      return;
    } else { 
      startLoading();
      try { 
        const connection = await item.isConnected();
        if (!connection) {
          connection = await item.connect({ DELIMITER: '\r' });
        }
        const bastao = Bastao.getInstance();
        bastao.setBastao(item);
        Toast.show({
          type: "success",
          text1: 'Bastão conectado.',
          position: 'bottom'
        });
        stopLoading();
      } catch (error) {
        // Handle error accordingly
        stopLoading();
        console.log(error)
      }
    }
  }  

  const renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => verificaConexao(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return ( 
    <> 

      {
        loading &&
        <NativeBaseProvider theme={theme}> 
          <Center flex={1} px="3">
            <VStack space={2} alignItems="center">
              <Spinner accessibilityLabel="Loading posts" color="#004725" size="lg" />
              <Heading color="#004725" fontSize="lg">
                Carregando
              </Heading>
            </VStack>
          </Center>
        </NativeBaseProvider>
      }
      {
        !loading &&
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>

              <View style={{ margin: 10 }}>
                <Button color="#004725" title="Buscar dispositivos" onPress={() => getDispositivosPareados()} />
              </View>

              {(list.length == 0) &&
                <View style={{ flex: 1, margin: 20 }}>
                  <Text style={{ textAlign: 'center' }}>Nenhum dispositivo encontrado</Text>
                </View>
              }

            </View>
          </ScrollView>
          <FlatList
            data={list}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      }           
      <Toast ref={(ref) => Toast.setRef(ref)} />  
    </>
  );
}