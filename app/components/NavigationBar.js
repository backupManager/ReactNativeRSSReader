import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  View,
  Navigator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const backIcon = (<Icon name="ios-arrow-back" size={25} color="royalblue" />);
const closeIcon = (<Icon name="ios-close" size={30} color="royalblue"/>);
const searchIcon = (<Icon name="ios-search" size={25} color="royalblue"/>);


exports.routeMapper={

   LeftButton: (route, navigator, index, navState) =>{
     const previousRoute = navState.routeStack[index - 1];
     let buttonText ="";
     switch (route.key) {
       case "FeedList": // home View
         buttonText = (
             <Text>{backIcon} {/*previousRoute.title*/}</Text>
         );
         break;
       case "FeedBoxes"://the feedBoxes View
         return null
         break;
       case "FeedDetails":
       case "FeedSearch"://feedDetails View
          buttonText = (<Text>{closeIcon}</Text>);
     }

     return(
       <TouchableOpacity
         style={styles.all}
         onPress={
           ()=>navigator.pop()}>
         {buttonText}
       </TouchableOpacity>
     )
   },

   RightButton: (route, navigator, index, navState) =>{
     let rightBtn="";
     switch (route.key) {
       case "FeedBoxes":
         rightBtn = (
           <TouchableOpacity onPress={
               ()=>navigator.push({key:"FeedSearch",title:"Search"})}>
             {searchIcon}
           </TouchableOpacity>
         )
         break;
       default:
         return null
     }
     return(
       <View style={styles.all}>
         {rightBtn}
       </View>
     )

   },

   Title: (route, navigator, index, navState) =>{

     return (<Text style={[styles.all,styles.title]}>{route.title}</Text>)
   }

}



const styles = StyleSheet.create({
  all:{
    marginTop:10,
    paddingHorizontal:10,
  },
  leftBtn:{
  },
  title:{
    marginTop:15,
    fontSize:15,
    fontWeight:'bold'
  }
})
