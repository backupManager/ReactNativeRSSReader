import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  ListView,
} from 'react-native'
import API from './../API';
import FeedItem from './../components/FeedItem';
var COUNT = 10;
export default class FeedList extends Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    this.state = {
      refreshing:true,
      loadmore:false,
      publisher:null,
      dataSource:ds.cloneWithRows([]),
      nextPosition:null,
      count:COUNT,
    };

    this.getFeeds = this.getFeeds.bind(this);
    this.getFeeds(this.props.feedURL, COUNT )
  }

  getFeeds(feedURL, count){
    API.getFeedList(feedURL, count)
      .then((data)=>{
        console.log(data);
        let publisher = {
          domain:data.feed[0].content.domain,
          domainName:data.feed[0].content.domain_name,
        }
        this.setState({
          title:publisher.domainName,
          rsslink:publisher.domain,
          dataSource:this.state.dataSource.cloneWithRows(data.feed),
          nextPosition:data.next_position,
          count:count+10
        });
        setTimeout(()=>this.setState({refreshing:false, loadmore:false}), 0);
      })
  }

  render(){
    return(
        <ListView
          style={styles.container}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          onEndReachedThreshold={20}
          onEndReached={()=>{

            if(!this.state.refreshing){
              console.log("endReached");
              this.setState({loadmore:true})
              this.getFeeds(this.props.feedURL, this.state.count)

            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=>{
                console.log("refresh");
                this.setState({refreshing:true})
                this.getFeeds(this.props.feedURL,COUNT)
              }}
              />
          }
          renderRow={(rowData, sectionID)=>(
            <FeedItem feed={rowData}
              title={this.state.title}
              navigator = {this.props.navigator}
            />
          )}
          renderSeparator={
            (sectionID, rowID, adjacentRowHighlighted)=>
            <View key={rowID} style={{marginHorizontal:10}}>
              <View style={{height:1, backgroundColor:'#efefef'}}/>
            </View>
          }
          renderFooter ={()=>(
            this.state.loadmore && <ActivityIndicator style={{padding:10}}size="large"/>)}
        />

    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:5,
    marginTop:65,
  }
})
