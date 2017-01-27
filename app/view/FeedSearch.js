import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  Image,
  Button,
  Text,
} from 'react-native';

import API from './../API'
import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons';
const addIcon = (<Icon name="ios-add" size={30}/>)
const checkIcon = (<Icon name="ios-checkmark" size={30}/>)

export default class FeedSearch extends Component {
  constructor() {
    super();
    this.state={
      isLoading:false,
      searchKeyWords:null,
      searchResults:[],
      feedArchive:[]
    }
    this.feedlySearchFeed = this.feedlySearchFeed.bind(this);
    this.saveFeed = this.saveFeed.bind(this);
    this.checkDuplicated = this.checkDuplicated.bind(this);
    this.getFeedArchive = this.getFeedArchive.bind(this);
    this.getFeedArchive();
  }

  feedlySearchFeed(keywords){
    console.log(keywords);
    API.feedlySearchFeed(keywords)
      .then((data)=>{
        console.log(data);
        this.setState({searchResults:data})
        setTimeout(()=>this.setState({isLoading:false}),0)
      })
  }

  saveFeed(feed){
    feedArchive = this.state.feedArchive;
    if(this.checkDuplicated(feed,feedArchive)){
      return Alert.alert('Already Subscribed', 'This RSS has been subscribed before' )
    }
    feedArchive.push(feed);
    this.setState({
      feedArchive:feedArchive
    })
    AsyncStorage.setItem('feedArchive',JSON.stringify(feedArchive))
    Alert.alert('Success', 'this RSS is now in your FeedBoxes');

  }

  getFeedArchive(){
    AsyncStorage.getItem('feedArchive')
      .then(
        (allFeeds)=>{
          console.log("get",JSON.parse(allFeeds));
          if(allFeeds){
            this.setState({
              feedArchive:JSON.parse(allFeeds)
            })
            console.log(this.state.feedArchive)
          }
        }
      )
  }

  checkDuplicated(feed, feedArchive){
    for(let i=0; i< feedArchive.length; i++){
      if(feed.feedId == feedArchive[i].feedId){
        return true;
      }
    }
    return false;
  }

  componentWillReceiveProps(newProps) {
     this.getFeedArchive();
     console.log('Component WILL RECIEVE PROPS!')
  }

  render(){
    return(
      <ScrollView style={styles.container}>
        <TextInput style={styles.input}
          placeholder="search feed"
          returnKeyType="search"
          onChangeText={(text)=>this.setState({searchKeyWords:text})}
          onSubmitEditing={()=>{
            this.setState({isLoading:true})
            this.feedlySearchFeed(this.state.searchKeyWords)
          }}
          />
        <Text style={{marginHorizontal :10}}>
          RESULTS:
        </Text>
        <View >
          {this.state.isLoading && (
            <ActivityIndicator
              size="large"
            />
          )}
          {
            this.state.searchResults.map((obj, i)=>(
              <TouchableOpacity key={i}
                style={styles.row}
                onPress={
                    ()=>{
                      this.props.navigator.push(
                      {key:"FeedList",title:obj.title,
                        passProps:{feedURL:obj.feedId.slice(5)}
                      })
                    }
                  }>
                  <Image style={styles.logo} source={{uri:obj.visualUrl}}/>
                  <View style={{flex:8,marginHorizontal:10}}>
                    <Text style={styles.title}>{obj.title}</Text>
                    <Text>lastUpdated: {moment.unix(obj.lastUpdated/1000).format('YYYY-MM-DD HH:mm')}</Text>
                    <Text style={styles.description}
                        numberOfLines={3}>
                      {obj.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={()=>{this.saveFeed(obj)}}
                    style={styles.checkmark}>

                    {this.checkDuplicated(obj,this.state.feedArchive) ? checkIcon : addIcon }

                  </TouchableOpacity>
              </TouchableOpacity>

            ))
          }

        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:65
  },
  input:{
    height:40,
    borderColor:'grey',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:10,
    margin:20
  },
  title:{
    fontWeight:'bold',
    fontSize:15
  },
  logo:{
    flex:3,
    maxWidth:60,
    maxHeight:60,
    borderRadius:5
  },
  checkmark:{
    flex:0.5,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  row:{
    flex:1,
    flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'space-between',
    padding:10,
    minHeight:80,
  },
  description:{
    color:'grey'
  }
})
