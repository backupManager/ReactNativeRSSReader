import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Image,
  Button,
  Text,
  Alert,
} from 'react-native';

import API from './../API';
import { SwipeListView } from 'react-native-swipe-list-view';

import Icon from 'react-native-vector-icons/Ionicons';
const myIcon = (<Icon name="logo-rss" size={18} />)

export default class FeedBoxes extends Component {
  constructor() {
    super();
    this.state={
      isLoading:true,
      feedArchive:[]
    }

    this.getFeedArchive = this.getFeedArchive.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.getFeedArchive();

  }

  getFeedArchive(){
    AsyncStorage.getItem('feedArchive')
      .then(
        (allFeeds)=>{
          if(allFeeds){
            this.setState({
              feedArchive:JSON.parse(allFeeds)
            })
            setTimeout(()=>this.setState({isLoading:false}),0)
          }

        }
      )
  }



   componentWillReceiveProps(newProps) {
      this.getFeedArchive();
      console.log('Component WILL RECIEVE PROPS!')
   }

   deleteFeed(feed){
     let feedArchive = this.state.feedArchive;
     let index = feedArchive.indexOf(feed);
     if(index > -1){
       feedArchive.splice(index, 1);
       this.setState({
         feedArchive:feedArchive
       })
       AsyncStorage.setItem('feedArchive',JSON.stringify(feedArchive))
      //  alert('delete success'+index);
     }else{
       Alert.alert('Delete Error','oop! something wrong happended');
     }
     Alert.alert('Delete Success','RSS delete from subscrition successfully',)
   }


  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(this.state.isLoading){
      return(
        <ActivityIndicator
          size="large"
        />
      )
    }
    if(this.state.feedArchive.length == 0){
      return(
        <View style={styles.container}>
          <Text style={styles.tipsText}>
            您还没有订阅rss
          </Text>
          <Text style={styles.tipsText}>
            点击右上角搜索rss订阅
          </Text>
        </View>
      )
    }
    return(
      <SwipeListView style={styles.container}
        enableEmptySections = {true}
        dataSource={ds.cloneWithRows(this.state.feedArchive)}
        rightOpenValue={-75}
        renderHiddenRow={ data => (
                <View style={styles.rowBackContainer}>
                  <TouchableOpacity style={styles.rowBack}
                    onPress={()=>{
                      this.deleteFeed(data);
                    }}>
                      <Text style={{color:'white'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
            )}
        renderRow={
          (data)=>(
            <TouchableHighlight
              underlayColor="#efefef"
              onPress={()=>{
                  this.props.navigator.push(
                      {key:"FeedList", title:data.title, passProps:{feedURL:data.feedId.slice(5)}})
              }}
              style={styles.row}>
              <Text style={styles.title}>{myIcon}  {data.title}</Text>
            </TouchableHighlight>)
        }
        />

    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingTop:85,
    marginHorizontal:15,
  },
  row:{
    flexDirection:'row',
    padding:10,
    borderBottomWidth:1,
    borderColor:'#efefef',
    backgroundColor:"white",
  },
  logo:{
    flex:1,
    width:50,
    height:50
  },
  title:{
    flex:10,
    fontWeight:"bold",
    fontSize:15
  },
  rowBackContainer:{
    alignItems:'flex-end',
    flex:1,

  },
  rowBack:{
    flex:1,
    backgroundColor:"red",
    padding:12,
  },
  tipsText:{
    color:'grey',
    fontSize:15,
    margin:10,
    textAlign:'center'
  }
})
