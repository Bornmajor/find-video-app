import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { styles } from '../component/Style'
import { Button } from 'react-native-paper'
import { useContext } from 'react'
import { VideoContext } from '../../App'
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
    const {appTheme,setOpenFirstTime,openFirstTime} = useContext(VideoContext)
    const [error,setError] = useState('');
    const navigation = useNavigation();
    
  

  const setOpenStatus = async()=>{
    try{   
      await AsyncStorage.setItem('key', 'false'); 
      setOpenFirstTime(false);
    }catch(err){
      setError('Something went wrong');
      console.log(err);
    }
   
   
   // navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
        <Image style={{width:280,height:250}} source={require('../../assets/logo.png')} />
      <Text style={{fontSize:25,textAlign:'center'}}>Welcome to stock video downloader</Text>
      <Text style={{textAlign:'center'}}>This application utilises pexels database which has a large stock footage library with over 3.2 million photos and videos.</Text>
      <Text style={{textAlign:'center',fontSize:20}}>Got it, great lets...</Text>
      <Button mode="contained"
      buttonColor={appTheme}
      style={{margin:10}}
       onPress={() => setOpenStatus()}>
        Get started
       </Button>

    </View>
  )
}

export default WelcomeScreen

