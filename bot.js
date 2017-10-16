//const tmi = require("tmi.js");
const chalk = require('chalk');
const config = require('./config');
const hue = require('./hue');
const StreamlabsSocketClient = require('streamlabs-socket-client');

//streamlabs    
const client = new StreamlabsSocketClient({
  token: config.options.identity.apiKey,
  emitTests: true // true if you want alerts triggered by the test buttons on the streamlabs dashboard to be emitted. default false.
});
 
client.on('follow', (data) => {
  console.log(data);
  hue.hueLamp("follow")
});

client.on('subscription', (data) => {
  console.log(data);
  hue.hueLamp("sub1");
});

client.on('bits', (data) => {
  console.log(data);
  if(amount >= 50){
  	hue.hueLamp("bits_50");
  }else{
  	hue.hueLamp("bits");
  }
});

client.on('donation', (data) => {
  console.log(data);
});

client.on('resubscription', (data) => {
  console.log(data);
});

client.on('host', (data) => {
  console.log(data);
});
 
client.connect();
