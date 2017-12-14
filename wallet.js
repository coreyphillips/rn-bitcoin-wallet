import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';

import './shim.js';
const bitcoin = require("./bitcoinjs-lib");
import HDNode from "./bitcoinjs-lib/src/hdnode";

_getUnspentUtxos = (fromAddress) => {
	return new Promise(async (resolve) => {
		try {
			let response = await fetch(`https://blockchain.info/unspent?active=${fromAddress}`);
			let responseJson = await response.json();
			resolve(responseJson);
		} catch(error) {
			console.error(error);
			resolve({ error: true });
		}
	});
};

_getHashFromPhrase = (phrase) => {
	let hash = bitcoin.crypto.hash256(phrase);
	hash = bigi.fromBuffer(hash);
	return hash;
};

_createTransaction = async (fromAddress, toAddress, privateKey, amount, fee) => {
	/*
	 Used the following url to generate the following:
	 https://blockchain.info/fromAddress/1JhrYxxuniGsevExFBg6fbzompShtGrMBX?format=json
	 txId = hash
	 script = script
	 outputIndex = n
	 satoshi = satoshi
	 */

	/*
	 In order to get insight working do the following:
	 https://github.com/bitpay/bitcore/issues/1454

	 Example found here:
	 https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/transactions.js#L46
	 */
	const unspentUtxos = await this._getUnspentUtxos(fromAddress);
	if (err) {
		console.log(err);
	} else {
		var tx = new bitcoin.TransactionBuilder("testnet");
		let walletBalance = 0;
		//Add Inputs
		unspentUtxos.map((utxo) => {
			console.log("Logging UTXO");
			console.log(utxo);
			const scriptBuffer = new Buffer(utxo.scriptPubKey);
			walletBalance = walletBalance + Number(utxo.satoshis);
			tx.addInput(utxo.txId, 0, undefined, getHashFromPhrase(scriptBuffer));
		});
		tx.addOutput(toAddress, amount); // the actual "spend"
		tx.addOutput(fromAddress, walletBalance - (amount + fee)); // Alice's change
		// (in)(4e4 + 2e4) - (out)(1e4 + 3e4) = (fee)2e4 = 20000, this is the miner fee

		// Sign each input with the respective private keys
		unspentUtxos.map((utxo, i) => {
			tx.sign(i-1, privateKey);
		});

		/*
		 tx.from(unspentUtxos);
		 tx.to(toAddress, 10000);
		 tx.change(fromAddress);
		 tx.fee(1000);
		 tx.sign(privateKey);
		 tx.serialize();
		 */

		//console.log("Transaction...");
		//The following tx is used to broadcast the transaction
		//console.log(tx);


		/*
		 //Broadcast Transaction. Make sure tx is a string
		 insight.broadcast(tx.toString(), function(err, returnedTxId) {
		 if (err) {
		 console.log(err);
		 } else {
		 console.log("Success!! Transaction Sent...");
		 console.log(returnedTxId);
		 }
		 });
		 */
	}
};

//Great example of how to create transactions using bitcoinjs-lib
// https://medium.com/@orweinberger/how-to-create-a-raw-transaction-using-bitcoinjs-lib-1347a502a3a
export const createBitcoinJsTransaction = (privateKey, address, payTo) => {
	var tx = new bitcoin.TransactionBuilder();
	/*
	 Used the following url to generate the following:
	 https://blockchain.info/address/1JhrYxxuniGsevExFBg6fbzompShtGrMBX?format=json
	 txId = hash
	 outputIndex = n
	 undefined
	 script = script
	 */
	const bufferTest = new Buffer("76a914de884b74b149144a21b8fa9aacd4445c5864ae8988ac");
	console.log(bufferTest);
	/*
	 tx.addInput("787d282a6294c95576833cd9cc7c6d70d55f7d4b9340ed608b993c70e5671d02", 0, undefined, bufferTest);

	 // Add the output (who to pay to):
	 // [payee's address, amount in satoshis]
	 tx.addOutput(payTo, 1500);

	 // Initialize a private key using WIF
	 var privateKeyWIF = privateKey;
	 //console.log("Private Key WIF: " + privateKeyWIF);
	 var keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF);

	//let privateKeyHex = bitcoin.crypto.hash256('foil refuse destroy vendor door save blouse shallow just orange gun awesome');
	//var seedHex = bigi.fromBuffer(privateKeyHex);
	//let keyPair = new bitcoin.ECPair(seedHex);

	// Sign the first input with the new key
	tx.sign(0, keyPair);
	//Or
	//Example of how to create an unsigned transaction
	 console.log(tx.buildIncomplete().toHex());

	 // Print transaction serialized as hex
	 console.log(`Transaction Build Hex: ${tx.build().toHex()}`);
	 */
};

//btcjsTest(priv, address, "15CWxHHC5jooBN2FupsDjY2AjteqViF46V");