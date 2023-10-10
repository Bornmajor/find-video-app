import { StyleSheet, Text, View,ScrollView ,FlatList, ActivityIndicator, Pressable} from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import { VideoContext } from '../../App';
import { Searchbar } from 'react-native-paper';
import { styles } from '../component/Style';
import VideoItem from '../component/VideoItem';
import SearchButton from '../component/SearchButton';
import pexelapi from '../api/pexelapi';
import { Button } from 'react-native-paper';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../component/Loader';



const HomeScreen = () => {
   const {appTheme} = useContext(VideoContext);
   const [list,setList] = useState([]);
   const [error,setError] = useState('');
   const [results,setResults] = useState();
   const [currPage,setCurrPage] = useState(1);
   const [prevBtn,setPrevBtn] = useState(false);
   const navigation = useNavigation();

   useEffect(()=>{
    navigation.setOptions({
     headerRight:()=>(
        <Pressable style={{margin:10}} onPress={() => getPopularVideos()}>
          <Ionicons name="refresh" size={30} color="white" />
        </Pressable>
     )
    })
   },[])
   const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

   const getPopularVideos = async ()=>{
    setResults('');
    try{
    let response = await pexelapi.get(`videos/popular?per_page=80&page=${currPage}`);
    console.log('Called');
    setList(response.data.videos);
    setResults('Ok');

    } catch(err){
        console.log(err);
    setError('Something went wrong');
    }
   }
   const nextPage = () =>{

    if(currPage <= 4933){
     
     setCurrPage(currPage+1);
    }else{
    showToast('This is the last page')
    }
   }

   const prevPage = () =>{
    if(currPage > 1){
     setCurrPage(currPage-1);
    }else{
     setPrevBtn(true);
    }
   }

   useEffect(()=>{
    getPopularVideos();
   },[currPage],[results])

 


  return (
    <ScrollView contentContainerStyle={styles.container}>
        {results ?
        <ScrollView contentContainerStyle={styles.container}>

        <SearchButton />
        <Text style={{fontSize:20,marginHorizontal:10}}>Popular videos</Text>
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


      <View style={styles.pagination}>
        <Button 
        buttonColor={appTheme}
        style={{marginHorizontal:10,borderRadius:0}}
        textColor='white'
        disabled={currPage == 1 && true}
        onPress={() => prevPage()}
        >
            Prev page
            </Button>

        <Text style={{fontSize:22,marginHorizontal:10}}>{currPage}</Text>


        <Button  buttonColor={appTheme}
        style={{marginHorizontal:10,borderRadius:0}}
        textColor='white'
        onPress={() => nextPage()}
        disabled={currPage == 4933 && true}
        >
            Next page
            </Button>
       
        </View>
    

     </ScrollView>
        : 
        <Loader color={appTheme}/>
        }
       
      

    </ScrollView>
  )
}


export default HomeScreen

