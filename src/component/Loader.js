import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import NetInfo from '@react-native-community/netinfo';

const Loader = ({color}) => {
    const [netState,setNetState] = useState('');

    useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
       // console.log('Connection type', state.type);
       // console.log('Is connected?', state.isConnected);
        if(state.isConnected == false || state.isInternetReachable == false){
         setNetState('No internet');
        }else{
         setNetState('');
        }
    //    console.log(state.isInternetReachable)
    });
    },[])
  return (
    <View style={{alignItems:'center',justifyContent:'center'}}>
   <ActivityIndicator size={100} color={color}/>
   <Text style={{fontSize:20}}>{netState}</Text>
    </View>
  )
}

export default Loader

