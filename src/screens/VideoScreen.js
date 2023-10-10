import { StyleSheet, Text, View,ScrollView,Button,ActivityIndicator,FlatList,Image, Linking } from 'react-native'
import React,{useContext, useEffect, useState,useCallback} from 'react'
import { styles } from '../component/Style';
import { Video, ResizeMode } from 'expo-av';
import { useRef } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { ToastAndroid } from 'react-native';
import pexelapi from '../api/pexelapi';
import DropDownPicker from 'react-native-dropdown-picker';
import { VideoContext } from '../../App';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import  Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../component/Loader';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const VideoScreen = ({route}) => {
  const {appTheme} = useContext(VideoContext);
  const video = useRef(null); 
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [status, setStatus] = React.useState({});
  const {vid_id} = route.params;
  const [currVideo,setCurrVideo] = useState('');
  const [error,setError] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('sd');
  const [items, setItems] = useState([
    {label: 'HD', value: 'hd'},
    {label: 'SD', value: 'sd'}
  ]);

  const [results,setResults] = useState('');
  const [videoData,setVideoData] = useState();
  const navigation = useNavigation();


  const [isModalVisible, setModalVisible] = useState(false);
  const [imgUrl,setImgUrl] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const setImgModalUrl = (url) =>{
    setImgUrl(url);
    toggleModal();

  }

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  useEffect(()=>{
    navigation.setOptions({
     headerRight:()=>(
        <Pressable style={{margin:10}} onPress={() => getVideo()}>
          <Ionicons name="refresh" size={30} color="white" />
        </Pressable>
     )
    })
   },[])


   

  const getVideo = async ()=>{
    // setResults('');
    try{
    let response = await pexelapi.get(`/videos/videos/${vid_id}`);
    console.log('Called');
     setVideoData(response.data);
    //setCurrVideo(videoData.video_files.find(item => item.quality == 'sd'));
    
    setResults('Ok');
    
     
    } catch(err){
    console.log(err);
    setError('Something went wrong');
    }
   }



  const changeVideo = (value) => {
  setCurrVideo(videoData.video_files.find(item => item.quality == value).link);
  showToast(`Video switched to ${value}`)
  }

  useEffect(()=>{
   getVideo();
  },[results])

 
 

  const downloadVideo = async(mediaUrl) =>{
  //  const currUrl = `${currVideo ? currVideo : videoData.video_files.find(item => item.quality == 'sd').link}`;

  await FileSystem.downloadAsync(
   mediaUrl,
    FileSystem.documentDirectory + mediaUrl.substring(mediaUrl.lastIndexOf('/')+1),
    showToast('Downloading..')
  )
    .then(({ uri }) => {
      console.log('Finished downloading to ', uri);
     
      saveFile(uri);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const saveFile = async(uri) =>{
    try{
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if(status == 'granted'){
      const asset = await MediaLibrary.createAssetAsync(uri);
       console.log(asset.uri);
       showToast(`File saved at ${asset.uri}`)
    }
    }catch(err){
   console.log(err)
    }

   
  }



  return (
    <ScrollView contentContainerStyle={styles.container} >
      {results ? 
      <ScrollView>
        <Video 
      ref={video}
      onPlaybackStatusUpdate={status => setStatus(() => status)}
      
      style={{width:'100%',height:200}}
      source={{
        uri: currVideo ? currVideo : videoData.video_files.find(item => item.quality == 'sd').link
      }} 
      useNativeControls
     resizeMode={ResizeMode.CONTAIN}
     isLooping
     shouldPlay={true}  
      /> 

 
      
      <View>
        <Text style={{fontSize:20,margin:10}}>Video pictures</Text>
        <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
      data={videoData.video_pictures}
      keyExtractor={item => item.id}
      renderItem={({item})=>{
       return(
        <Pressable onPress={() => setImgModalUrl(item.picture)}>

         <Image style={{width:150,height:100,marginHorizontal:2}} source={{uri : item.picture}}/>  
         <View style={{position:'absolute',bottom:0,right:0,margin:5,backgroundColor:'black'}}>
           <AntDesign 
          name="download"
          size={25} color="white" 
          />
         </View>
        
        </Pressable>
        
         )
       
       
      }}

      /> 
      </View>

      <Modal
      isVisible={isModalVisible}
      // onBackdropPress={() => setModalVisible(false)}
      >
          <Pressable  onPress={toggleModal }>
           <AntDesign  style={styles.closeBtn}  name="close" size={30} color="white" />
        </Pressable>

        <View style={{flex:1}}>
         <Image style={{width:'100%',height:'45%'}} source={{uri: imgUrl}}/>

         <View  style={{margin:30,alignItems:'center'}}>
              <Pressable onPress={() => downloadVideo(imgUrl)} >
                <Entypo name="download" size={65} color="white" />
              </Pressable>
              <Text style={{textAlign:'center',fontSize:20,color:'white'}}>Download image</Text>  
        </View>

        </View>

      </Modal>
     

      <View style={{alignItems:'center',marginVertical:30}}>
 <DropDownPicker
    style={{width:250}}
    placeholder='Video quality'
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value) => {
        changeVideo(value);
      }}
      containerStyle={{
      width:250
      }}
    />  

     {/* <Text>{vid_id}</Text> */}
     <View style={{marginVertical:10}}>
       <Text style={{textAlign:'center'}}>Photographer</Text>
      <Text style={{fontSize:20}}>By {videoData.user.name}</Text>
     </View>
    
 
 <View  style={{margin:10,alignItems:'center'}}>
      <Pressable onPress={() => downloadVideo(`${currVideo ? currVideo : videoData.video_files.find(item => item.quality == 'sd').link}`)} >
        <Entypo name="download" size={65} color="black" />
      </Pressable>
      <Text style={{textAlign:'center',fontSize:20}}>Download video</Text>  
 </View>

</View>
       </ScrollView>
      : 
      <Loader color={appTheme}/>
      }
     


   
       
     
      

    </ScrollView>
  )
  
}

export default VideoScreen
