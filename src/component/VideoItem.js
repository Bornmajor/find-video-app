import { Pressable, StyleSheet, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useContext } from 'react'
import { VideoContext } from '../../App'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { styles } from './Style'
import { AntDesign } from '@expo/vector-icons';
const VideoItem = ({vid_id,img_url,user,duration}) => {
    const {appTheme} = useContext(VideoContext);
    const navigation = useNavigation()
    const [visible,setVisible] = useState()
    const [load,setLoad] = useState(false);

    useEffect(()=>{
      if(img_url){
        setLoad(true);
        //console.log('Loaded')
      }
    },[])

    // const loadErrorImg = () =>{
    //   setLoad(false);
    // }

  return (
    <Pressable style={styles.videoItem} onPress={() => navigation.navigate('Video',{vid_id:vid_id}) }
    onLongPress={()=> console.log('pressed')}
    >

     {load == true ?
     <View style={{position:'relative'}}>
      <Image style={{width:'100%',height:250}}  
       onLoad={() => setLoad(true)} 
       onError={() => setLoad(false)}
       source={{uri: img_url}}
      />
      <Ionicons style={styles.playIcon} name="play-circle" size={60} color={appTheme} />

     </View>
     
     :
     
    <View style={{backgroundColor:"#d1e7dd",width:'100%',height:200,justifyContent:'center',alignItems:'center'}}>
      <Entypo name="controller-play" size={65} color="black" />
      </View> 
    }
    <View style={{marginVertical:10}}>
       <Text><AntDesign name="clockcircle" size={17} color="black" /> {duration} secs</Text>
       <Text style={{fontWeight:600,fontSize:18}}>By {user}</Text>
    </View>
      

    </Pressable>
   
  )
}

export default VideoItem;

