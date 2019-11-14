import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps'
import CurrentLocationButton from './CurrentLocation'
import Driver from './Driver'
export default class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: null,
            errorMessage: null,
        }
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0093,
            longitudeDelta: 0.0093
        }
        this.setState({ region: region });
    };
    centerMap = () => {
        const {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta } = this.state.region;

        this.map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        })
    }
    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return (
            <View style={styles.container}>
               
                <MapView
                    initialRegion={this.state.region}
                    showsCompass={true}
                    ref={(map) => { this.map = map }}
                    showsUserLocation={true}
                    rotateEnabled={false}
                    style={styles.map}
                >
                    {/* <CurrentLocationButton cb={() => { this.centerMap() }} /> */}

                    <Driver driver={{
                        uid: 'null',
                        location: {
                            latitude: 28.706198,
                            longitude: 77.2837946
                        }
                    }} />
                    <Driver driver={{
                        uid: 'null',
                        location: {
                            latitude: 28.706983,
                            longitude: 77.282728
                        }
                    }} />
                    <Driver driver={{
                        uid: 'null',
                        location: {
                            latitude: 28.705694,
                            longitude: 77.282610
                        }
                    }} />
                    <Driver driver={{
                        uid: 'null',
                        location: {
                            latitude: 28.7055037,
                            longitude: 77.281284
                        }
                    }} />
                    <Driver driver={{
                        uid: 'null',
                        location: {
                            latitude: 28.705499,
                            longitude: 77.283478
                        }
                    }} />
                    <Driver driver={{
                        uid: 'null',
                        location: {
                            latitude: 28.7069487,
                            longitude: 77.2795939
                        }
                    }} />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    map: {
        flex: 1,
        width: '100%',
        zIndex: 0,
        height:'60%'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});





























// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { MapView, Permissions, Location } from 'react-native-maps';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       region: null
//     };
//     this._getLocationAsync();
//   }
//   _getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       console.log('Permission Denied!!');
//     }
//     let location = await Location.getCurrentPositionAsync({
//       enabledHighAccuracy: true
//     });
//     let region = {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.045,
//       longitudeDelta: 0.045
//     };
//     this.setState({ region: region });
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           initialRegion={this.state.region}
//           showsCompass={true}
//           showsUserLocation={true}
//           rotateEnabled={false}
//           style={{ flex: 1 }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   }
// });
