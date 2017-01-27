/**
 *
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  View,
} from 'react-native';

import FeedBoxes from './view/FeedBoxes';
import FeedList from './view/FeedList';
import FeedDetails from './view/FeedDetails';
import FeedSearch from './view/FeedSearch';
import NavBar from './components/NavigationBar';

const routes = [{key:'FeedBoxes', title:"FeedBoxes"}];

export default class YARRD extends Component {
  constructor(){
    super();
    this._renderScene = this._renderScene.bind(this);
    this._configureScene =this._configureScene.bind(this);
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this._renderScene}
        configureScene={this._configureScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavBar.routeMapper}
            style={styles.navBar}
          />
          }
      />
    )
  }
  _configureScene(route, routeStack){
    switch (route.key) {
      case "FeedSearch":
      case "FeedDetails":
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.PushFromRight
    }

  }
  _renderScene(route,navigator){
      switch(route.key){
        case 'FeedList':
          return (
            <FeedList
              navigator={navigator}
              {...route.passProps}/>)
          break;
        case "FeedBoxes":
          return (
            <FeedBoxes route={route} navigator={navigator}/>
          )
          break;
        case "FeedDetails":
          return (
            <FeedDetails {...route.passProps}/>)
        case "FeedSearch":
          return(
            <FeedSearch navigator={navigator}/>
          )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorView:{
    flex:1,
  },
  navBar:{
    backgroundColor:"white",
    borderBottomWidth:1,
    paddingHorizontal:20,
    borderColor:'#dddddd'
  }

});


AppRegistry.registerComponent('YARRD', () => YARRD);
