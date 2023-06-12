import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { processArgs } from './process-args';
import { registerApis } from './api/register';

require('./midi/virtual-player');

const args = processArgs();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);
const config = require(args['midi-router-config']);
registerApis(app, config);

console.log('\n------------------------------');
console.log('. Welcome to MIDI Router .');
console.log(`. Current Time is ${new Date().toLocaleString()} .`);
console.log('------------------------------\n');

const port = +args['port'];
const aggregatorUrl = args['aggregator-ws-url'];

export function startServer(port: number, aggregatorUrl: string) {
  // transport.start();

  server.listen(port, () => {
    console.log(`App Server Started on *:${port}`);
  });

  // console.log('Setting up MIDI Devices');
  // setupMidiDevices();
  // connectToAggregator(aggregatorUrl);
}

// export function connectToAggregator(url: string) {
//   const aggregator = io(url);

//   aggregator.onAny((_, data) => {
//     onAggregatorData(data);
//     // console.log('Received Data', data);
//   });
// }

startServer(port, aggregatorUrl);
