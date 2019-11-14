import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import NumberContainer from './Components/NumberContainer';
import getDirections from 'react-native-google-maps-directions';
import MapView from 'react-native-maps';
import Maps from './Components/Maps';

export default function App() {
  const [value, setValue] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 28.7065841,
        longitude: 77.2832001
      },
      destination: {
        latitude: 28.7065841,
        longitude: 77.2832001
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving' // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate' // this instantly initializes navigation using the given travel mode
        }
      ],
      waypoints: [
        {
          latitude: 28.7065841,
          longitude: 77.2832001
        },
        {
          latitude: 28.7065841,
          longitude: 77.2832001
        },
        {
          latitude: 28.7065841,
          longitude: 77.2832001
        }
      ]
    };

    getDirections(data);
  };

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
    setIsLoading(true);
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
  if (value > 75) {
    message = (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>please get there!!</Text>
      </View>
    );
  }
  if (value < 75) {
    message = (
      <View style={styles.messageContainer2}>
        <Text style={styles.message2}>All Clean! Garbage under Control</Text>
      </View>
    );
  }
  var load = null;
  if (isLoading === true) {
    load = (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading......</Text>
      </View>
    );
  }
  var locate = null;
  if (value > 75) {
    locate = (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            color="black"
            padding="10"
            onPress={this.handleGetDirections}
            title="Get Directions"
          />
        </View>
      </View>
    );
  }
  return (
    // <View>
    //   <Maps />
    // </View>

    
   
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Garbage Manager</Text>
      </View>
      <View style={styles.mapStyle}>
       <Maps />
     </View>
      <ScrollView>

        {message}
        {/* <Image style={styles.stretch} source={require('./assets/green.png')} /> */}
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

          <NumberContainer >{value} % </NumberContainer>
          {locate}
        </View>

      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    paddingTop: '6%',
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
  mapStyle: {
    height: '40%',
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  loadingText: {
    fontSize: 15,
    color: 'black'
  },
  text: {
    fontSize: 20,
    color: '#fff'
  },
  message: {
    backgroundColor: 'red',
    color: 'white',
    padding: 7
  },
  location: {
    backgroundColor: 'white'
  },
  locationText: {
    fontSize: 16,
    color: '#4267B2'
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: 'red'
  },
  message2: {
    backgroundColor: 'green',
    color: 'white',
    padding: 7
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
  loading: {
    alignItems: 'center',
    marginBottom: 10
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
