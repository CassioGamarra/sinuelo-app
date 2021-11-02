import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const setToken = async (value) => {
  try {
    await AsyncStorage.setItem('TOKEN', value);
  } catch(e) {
    console.log(e);
  }
}

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    if(value) {
      return value;
    }
  } catch(e) {
    console.log(e);
  }
} 

export const setUser = async (value) => {
  try {
    await AsyncStorage.setItem('USER', value);
  } catch(e) {
    console.log(e);
  }
}

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('USER');
    if(value) {
      return value;
    }
  } catch(e) {
    console.log(e);
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch(e) {
    console.log(e);
  }
}