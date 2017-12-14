/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import "./shim";
const bitcoin = require("./bitcoinjs-lib");
import HDNode from "./bitcoinjs-lib/src/hdnode";
const litecoin = bitcoin.networks.litecoin;


/*
Example test transaction
var key = bitcoin.ECPair.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
var tx = new bitcoin.TransactionBuilder();
tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
tx.addOutput("12idKQBikRgRuZEbtxXQ4WFYB7Wa3hZzhT", 149000);
tx.sign(0, key);
alert(tx.build().toHex());
*/

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    /*
    try {
//Test Xpub Functionality
      const xpub = "xpub6AoynT2YixgjHK2yNTDPJGmbFaNfiKTVNb4zVygVmSfhWktotj8woL2nT7FALSFEhggNemiy5KEGWxRpNYtsHVVvWCC99WuhzvAvZTJD1SH";
      let node = "";
      let address = "";
      try {
        node = HDNode.fromBase58(xpub);
        let address = node.derive(1).getAddress();
        alert(address);
      } catch (e) {
        alert(JSON.stringify(e));
      }
      //alert(address);
    } catch (e) {
      alert("Unable to generate xpub.");
      alert(JSON.stringify(e));
    }
    */
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
