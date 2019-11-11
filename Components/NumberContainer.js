import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YellowBox } from 'react-native';
import _ from 'lodash';

const NumberContainer = props => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#f7287b',
        padding: 50,
        marginVertical: 10,
        marginHorizontal:80
    },
  
    number: {
        fontSize: 35,
        color: 'green'
    }
});

export default NumberContainer;
