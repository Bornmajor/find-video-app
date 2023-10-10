import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import { Searchbar } from 'react-native-paper'
import { styles } from '../component/Style'
import pexelapi from '../api/pexelapi'
import VideoItem from '../component/VideoItem'
import {Button} from 'react-native-paper'
import { useContext } from 'react'
import { VideoContext } from '../../App'

const SearchScreen = () => {
  const {appTheme} = useContext(VideoContext);
  const [searchQuery,setSearchQuery] = useState('');
  const [results,setResults] = useState();
  const [list,setList] = useState([]);
  const [currPage,setCurrPage] = useState(1);
  const [error,setError] = useState();

  const getVideoResult = async(query)=>{
    setResults('');
    setSearchQuery(query)
    console.log(query);
    try{
    let response = await pexelapi.get(`videos/search?query=${query}per_page=80&page=${currPage}`);
    console.log('Called');
    setList(response.data.videos);
    setResults('Ok');

    } catch(err){
    console.log(err);
    setError('Something went wrong');
    }
  }

  


  useEffect(()=>{
  
  },[currPage],[results])

  
  return (
    <ScrollView contentContainerStyle={{marginVertical:10}}>

       <Searchbar 
       placeholder='Search for a video'
       value={searchQuery}
       onChangeText={getVideoResult}
       />
       
       {searchQuery ? <Text style={{margin:10}}>{searchQuery}</Text> : null}
       {list.length !==0}
       <FlatList 
         initialNumToRender={5}
        // horizontal
        // showsHorizontalScrollIndicator={false}
       data={list}
       keyExtractor={item => item.id}
       renderItem={({item}) =>{
        return(
          <VideoItem
         vid_id={item.id}
         user={item.user.name}
        img_url={item.image}
        duration={item.duration}
        />
        )
       }}
       />
      



    </ScrollView>
  )
}

export default SearchScreen

