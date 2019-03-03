// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
	(request, response) => {
		const agent = new WebhookClient({request, response});
		console.log(
			'Dialogflow Request headers: ' + JSON.stringify(request.headers)
		);
		console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

		//default handlers
		function welcome(agent) {
			agent.add(`Welcome to my agent!`);
		}

		function fallback(agent) {
			agent.add(`I didn't understand`);
			agent.add(`I'm sorry, can you try again?`);
		}

		// console.log(request.body.queryResult.queryText); // <--- what we write to the bot
		// console.log(request.body.queryResult.parameters.country); // <---the paramter and value
		// console.log(Object.keys(request.body.queryResult));
		//our intent handler - lets see if it works
		const makeTripHandler = (agent) => {
			/////////////////////////////////////////////////////////////////////////
			///       L O O K    H E R E   ||
			//                             vv
			////////////////////////////////////////////////////////////////////////
			const {country} = request.body.queryResult.parameters;
			agent.add(`This message is from Pete and Seb from  ${country}`);
		};

		// Run the proper function handler based on the matched Dialogflow intent name
		let intentMap = new Map();
		console.log('intentMap created');
		intentMap.set('Default Welcome Intent', welcome);
		console.log('Default Welcome Intent');
		intentMap.set('Default Fallback Intent', fallback);
		console.log('Default Fallback Intent');
		intentMap.set('Make Trip', makeTripHandler);
		console.log("Pete and Seb's agent >>>>>> ", agent);
		agent.handleRequest(intentMap);
	}
);
