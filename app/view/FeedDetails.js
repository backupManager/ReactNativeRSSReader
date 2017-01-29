import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  WebView,
  Alert,
  Dimensions,
  Platform,
  Linking,
} from 'react-native'
var HTMLView = require('react-native-htmlview')

const {width, height} = Dimensions.get('window');
import moment from 'moment';

export default class FeedDetails extends Component {
  constructor(props){
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });

  }
  render(){
    return(
      <ScrollView style={styles.container}>
          <View style={{flex:1}}>
            <Text style={styles.title}>
              {this.props.feedDetails.content.title}
            </Text>
            <Text style={styles.infos}>
              {moment.unix(this.props.feedDetails.publish_date).format('YYYY-MM-DD HH:mm')}
            </Text>

          </View>

          <View style={styles.webViewContent}>
            <HTMLView
              onLinkPress={()=>(Alert.alert(`I\'M SORRY`, "Not Supported"))}
              value={this.props.feedDetails.content.body}
              />
          </View>

          <View
            style={styles.linkButton}>
            <Button
              onPress={()=>this._handleClick(this.props.feedDetails.content.url)}
              title={"view on "+ this.props.feedDetails.content.domain}
              color="royalblue"
            />
          </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:65,
    paddingHorizontal:15,
  },
  title:{
    marginVertical:10,
    fontSize:20,
    fontWeight:'bold',
  },
  infos:{
    color:'grey'
  },
  webViewContent:{
    // maxWidth:width,
    // height:height,
    marginVertical:15,
  },
  linkButton:{
    borderWidth:(Platform.OS === 'ios') ? 1 : 0,
    borderRadius:5,
    // borderColor:'royalblue',
    marginHorizontal:40,
    marginBottom:50,
  }
})
