import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./screens/homeScreen";
export default class Movie extends React.Component{
   render(){
     return(
       <HomeScreen/>
     )
   }
}

