## YARRD
a simple RSS reader written in React Native.   

![YARRD RSS reader](Screenshot.gif)

### Key Features
* YARRD uses feedly.com's API to search RSS feed.
* All the RSS data are fetch via digg.com's API in order for  data format accordance.
* Because digg.com can't be access in mainland China, So YARRD uses Yahoo Query Language to request data from digg.com'API.

### Remain Issues
* **HTML contents don't render well.** Some rss data contain HTML contents, like `<p>` and `<img>`, but these HTML contents don't render well, Both in React Native { WebView } Component and 3rd party library react-native-htmlview . Currently using react-native-htmlview.
* **Data response from YQL sometimes differ from the data response from original url.**

[YARRD中文介绍](https://chasecs.github.io/2017/01/30/yaardIntroduction.html)
