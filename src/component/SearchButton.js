import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { VideoContext } from '../../App';
import { useNavigation } from '@react-navigation/native';

const SearchButton = () => {
const navigation = useNavigation();
  const {appTheme} = useContext(VideoContext)
  return (
    <Pressable style={styles.searchbar} onPress={()=> navigation.navigate('Search')}>

        <View style={{backgroundColor: appTheme,padding:15}}>
          <EvilIcons name="search" size={24} color="white" />  
        </View>

     <View style={{backgroundColor: '#ced4da',flex:1,padding:15}}>
      <Text style={{color:'black'}}>Search for a video....</Text>  
     </View>
  
    </Pressable>
  )
}

export default SearchButton

const styles = StyleSheet.create({
    searchbar:{
        flexDirection: 'row',
        padding:10,
        marginVertical:10,
        borderRadius:10
    }
})