import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNav from './src/navigation/StackNav';
import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const VideoContext = createContext();
export default function App() {
  const [appTheme,setAppTheme] = useState('#07A081');
  const [openFirstTime,setOpenFirstTime] = useState();

  const checkIfOpenFirstTime = async() =>{
    const value = await AsyncStorage.getItem('key');
    if(value !== null){
      setOpenFirstTime(value);
    
    }
  }
  useEffect(()=>{
   checkIfOpenFirstTime();
   
  },[openFirstTime])





  return (
   <VideoContext.Provider value={{appTheme,openFirstTime,setOpenFirstTime}}>
    <StackNav />
   </VideoContext.Provider>
  );
}

