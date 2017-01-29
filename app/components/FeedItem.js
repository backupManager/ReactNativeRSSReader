import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import moment from 'moment';

export default class FeedItem extends Component {
  constructor(props){
    super(props);

  }
  render(){
    return (
      <TouchableOpacity
        onPress={()=>{
          this.props.navigator.push(
                {key:"FeedDetails", passProps:{feedDetails:this.props.feed}})
        }}>
          <View style={{padding:10}}>
            <Text style={styles.feedTitle}>{this.props.feed.content.title}</Text>
            <Text style={styles.feedInfo}>{this.props.title}    {moment.unix(this.props.feed.publish_date).format('YYYY-MM-DD HH:mm')}</Text>
            <Text style={styles.feedDescription}
              numberOfLines={3}
              >{this.props.feed.content.description}</Text>
            <Image></Image>
          </View>
      </TouchableOpacity>
    )}
}

var styles = StyleSheet.create({
    feedTitle:{
      fontSize:15,
    },
    feedInfo:{
      paddingVertical:5,
    },
    feedDescription:{
      color:'gray',
      fontSize:15,
      lineHeight:20
    }

})
