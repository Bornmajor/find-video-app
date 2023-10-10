import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import VideoScreen from '../screens/VideoScreen';
import { useContext } from 'react';
import { VideoContext } from '../../App';

const Stack = createStackNavigator();



const StackNav = () => {
    const {appTheme,openFirstTime} = useContext(VideoContext);

  return (
    <NavigationContainer>
        <Stack.Navigator>
           {openFirstTime == true ? 
             <Stack.Screen  
            name="Welcome"
            component={WelcomeScreen}
             options={{
                title: '',
               headerShadowVisible:false ,
               headerStyle:{backgroundColor: '#f1f1f1'}      
             }}
           
            
            />
           :
           <>
             <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{
                title: 'Stock videos downloader',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: appTheme }
             }}
            />
               <Stack.Screen 
            name="Search"
            component={SearchScreen}
            options={{
                title: 'Search a video',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: appTheme }
             }}
            />
               <Stack.Screen 
            name="Video"
            component={VideoScreen}
            options={{
                title: 'Video',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: appTheme }
             }}
            />
            </>
           }
          
          


        </Stack.Navigator>
    </NavigationContainer>
      
  )
}

export default StackNav

const styles = StyleSheet.create({})