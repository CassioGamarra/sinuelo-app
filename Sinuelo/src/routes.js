import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

import Login from './screens/Login';
import Home from './screens/Home';
import Listar from './screens/Listar';
import ConectarBastao from './screens/ConectarBastao';
/*Rotinas com Animais*/ 
import Rotinas from './screens/Rotinas'; //HOME
import Alerta from './screens/Rotinas/Alerta';
import Peso from './screens/Rotinas/Peso';
import Vacina from './screens/Rotinas/Vacina';
import Doenca from './screens/Rotinas/Doenca';
import Medicamento from './screens/Rotinas/Medicamento'; 

const Stack = createNativeStackNavigator();
  
const homeOptions = {  
  title: 'Sinuelo',
  headerStyle: {
    backgroundColor: '#004725',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const generalOptions = {  
  headerStyle: {
    backgroundColor: '#004725',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
} 

export default function Routes() {   
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>   
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> 
        <Stack.Screen name="Home" component={Home} options={homeOptions}/>
        <Stack.Screen name="Listar" component={Listar} options={generalOptions}/> 
        {/*Rotas para configuracoes*/}
        <Stack.Screen name="Conectar Bastão" component={ConectarBastao} options={generalOptions}/> 
        {/*Rotas para rotinas*/}
        <Stack.Screen name="Rotinas" component={Rotinas} options={generalOptions}/>
        <Stack.Screen name="Alertas" component={Alerta} options={generalOptions}/> 
        <Stack.Screen name="Peso" component={Peso} options={generalOptions}/>
        <Stack.Screen name="Vacinas" component={Vacina} options={generalOptions}/>
        <Stack.Screen name="Doenças" component={Doenca} options={generalOptions}/>
        <Stack.Screen name="Medicamentos" component={Medicamento} options={generalOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}