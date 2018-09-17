/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Root} from "native-base" ;
import Navigation from "./src" ;
import JMessage from "jmessage-react-plugin" ;
export default class App extends Component {
    componentDidMount(){
        JMessage.init({
            appkey: "0d5de1ff3773f591c7250f27",
            isOpenMessageRoaming: false, // 是否开启消息漫游，默认不开启
            isProduction: true, // 是否为生产模式
        });
    }
    render() {
        return (
            <Root>
                <View style={styles.container}>
                    <Navigation/>
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1}
});
