// let rootURL = "https://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20xml%20where%20url%3D"
// let rootYQL = `https://query.yahooapis.com/v1/public/yql?format=json&q=select * from json where url=`;
// var testurl = `https://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fdigg.com%2Fapi%2Freader%2Ffeed.json%3Ffeed_url%3Dhttp%253A%252F%252Fwww.solidot.org%2Findex.rss%26show%3Dall%26count%3D20%26_%3D1485091238986%22`;
const rootYQL = `https://query.yahooapis.com/v1/public/yql?format=json&q=select%20*%20from%20json%20where%20url%3D`

var setDiggAPI = function(feed_url,count,position){
  let diggAPIRoot = `http%3A%2F%2Fdigg.com%2Fapi%2Freader%2Ffeed.json%3Ffeed_url%3D`
  diggAPIRoot +=`${feed_url}%26show%3Dall%26count%3D${count}%26_%3D${Date.now()}`;
  //
  if(position){
    diggAPIRoot += `%26position%3D${position}`;
  }

  return `%22${diggAPIRoot}%22`;
}
/*
*digg API Sample
* http://digg.com/api/reader/feed.json?feed_url=http%3A%2F%2Ffeeds.feedburner.com%2Fsolidot&_=1485098633009
*/
exports.getFeedList = function(feed_url, count, position){
  let url = rootYQL+setDiggAPI(feed_url, count, position);

  return fetch(url)
          .then((response)=> {
            return response.json()
          }).then((jsonData)=>{
            return jsonData.query.results.json.data
          })
          .catch((e)=>{
            console.log('getFeedListError==='+e.message);
          })
}
// search API
const feedlySearchRoot = 'https://feedly.com/v3/search/feeds?n=20&q=';
const diggSearchRoot ="";
exports.feedlySearchFeed = function(keywords){
  let url = feedlySearchRoot+keywords;
  return fetch(url)
          .then((response)=>{
            return response.json();
          })
          .then((jsonData)=>{
            console.log('json',jsonData);
            return jsonData.results;
          })
          .catch((e)=>{
            console.log(e.message);
          })
}
