import React from 'react';
import { View, Image, Animated } from 'react-native'
import MapView from 'react-native-maps'

class Driver extends React.Component {
    constructor(props) {
        super(props)

        const driver = props.driver ? props.driver :
            {
                uid: 'noDriverPassed',
                location: { latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 }
            }

        const coordinate = new MapView.AnimatedRegion({
            latitude: driver.location.latitude,
            longitude: driver.location.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0
        })

        this.state = {
            driver: driver,
            coordinate: coordinate,
            anim: new Animated.Value(0)
        }
    }
    animate() {
        Animated.timing(
            this.state.anim, {
            toValue: 1,
            duration: 200
        }
        ).start(() => Animated.timing(
            this.state.anim, {
            toValue: 1,
            duration: 200
        }
        ).start(() => Animated.timing(
            this.state.anim, {
            toValue: 1,
            duration: 200
        }
        ).start(() => Animated.timing(
            this.state.anim, {
            toValue: 1,
            duration: 200
        }
        ).start(() => Animated.timing(
            this.state.anim, {
            toValue: 0,
            duration: 200
        }
        ).start()))))
    }
    componentDidMount() {
        setInterval(() => {
            this.animate()
        }, 1000);
    }
    render() {
        const spin = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-5deg', '5deg']
        }
        )
        return (
            <MapView.Marker.Animated
                coordinate={this.state.coordinate}
                anchor={{ x: 0.35, y: 0.32 }}
                ref={marker => { this.marker = marker }}
                style={{ width: 50, height: 50 }}
            >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Image
                        source={require('../assets/gmsi.png')}
                        style={
                            {
                                width: 12,
                                height: 17
                            }
                        } />
                </Animated.View>

            </MapView.Marker.Animated>
        )
    }
}

export default Driver;