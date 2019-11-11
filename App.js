import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import NumberContainer from './Components/NumberContainer';

export default function App() {
  const [value, setValue] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  var firebase = require('firebase');

  var config = {
    databaseURL: 'https://gms-database.firebaseio.com/',
    projectId: 'gms-database'
  };
  // firebase.initializeApp(config);

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  // const setStatusHandler = () => {

  // };
  const getStatusHandler = () => {
    setIsLoading(true)
    firebase
      .database()
      .ref('/')
      .update({
        Status: 1
      });
    var va;
    setTimeout(() => {
      console.log('Loading.....');
      setIsLoading(false);
      firebase
        .database()
        .ref('/Gvalue/')
        .on('value', function(snapshot) {
          console.log(snapshot.val());
          va = (((35 - parseInt(snapshot.val())) / 35) * 100).toFixed(1);

          setValue(va);
        });
    }, 2000);
  };
  var message = null;
  if(value>75)
  {
    message=<View style={styles.messageContainer}><Text style={styles.message}>Don't worry! dumping is in process</Text></View>
  }
  if(value<75)
  {
    message = <View style={styles.messageContainer2}><Text style={styles.message2}>All Clean! Garbage under Control</Text></View>
  }
  var load = null;
  if(isLoading === true)
  {
    load = <View style={styles.loading}><Text style={styles.loadingText}>Loading......</Text></View>
  }
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Garbage Manager</Text>
      </View>
      <Image style={styles.stretch} source={require('./assets/green.png')} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Get status" onPress={getStatusHandler} />
        </View>
        {/* <View>
          <Button title="Set Status" onPress={setStatusHandler} />
        </View> */}
      </View>
      <View style={styles.numberContainer}>
        {load}
        {message}
        <NumberContainer>{value} %</NumberContainer>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    paddingTop: '10%',
    flex: 1
  },
  textContainer: {
    backgroundColor: 'brown',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  numberContainer: {
    marginTop: 30
  },
  loadingText:{
    fontSize: 15,
    color: 'black'
  },
  text: {
    fontSize: 20,
    color: '#fff'
  },
  message:{
    backgroundColor:'red',
    color:'white',
    padding:7
  },
  messageContainer:{
    alignItems:'center',
    backgroundColor:'red'
  },
  message2: {
    backgroundColor: 'green',
    color: 'white',
    padding:7
  },
  messageContainer2: {
    alignItems: 'center',
    backgroundColor: 'green'
  },
  stretch: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch'
  },
  loading:{
    alignItems:'center',
    marginBottom:10
  },
  button: {
    padding: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  }
});
