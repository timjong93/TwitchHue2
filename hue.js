let huejay = require('huejay');
const config = require('./config');
// const colorArray = require('./db/color.json');
// const colorEffects = require('./db/effect_colors.json');
const scenes = require('./db/scenes.json');
const sleep = require('system-sleep');

var status = 0;
var jobQueue = [];
var colorLoopColors = config.colorLoop.colors;
var colorLoopIndex = 0;

let client = new huejay.Client({
  host:     config.hueIP,
  port:     80,               // Optional
  username: config.hueUsername,
  timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
});

colorLoop();

function hueLamp(alertType){

  if(status === 1){ // If there is an alert happening put the new alert to queue
    jobQueue.push(alertType);
    console.log("New job request (" + alertType + ") has been added to queue as there is an ongoing process");
  }
  else {
      status = 1; // Lock alert to this one
      console.log("Active job: " + alertType);

      var alertName = ""; // Used later
      playScene(alertType);
      let sleepTime = 0;
      scenes[alertType].cues.map(function(c){
        sleepTime = sleepTime + c.transitionTime*1000;
      })
      sleep(sleepTime)

      while(jobQueue > 0){
        console.log('next in queue');
        playScene(jobQueue[0]);
        let sleepTime = 0;
        scenes[alertType].cues.map(function(c){
          sleepTime = sleepTime + c.transitionTime*1000;
        })
        sleep(sleepTime);
        jobQueue.shift();
      }
      console.log('no jobs in queue');
      colorLoop();
      status = 0;
    }
  };

  function colorLoop(){
    console.log('colorLoop');
    colorStep();
    let colorInterval = setInterval(function(){
      let statusPol = setInterval(function () {
        if(status === 1){
          console.log('event!')
          clearInterval(statusPol);
          clearInterval(colorInterval)
        }
      }, config.colorLoop.pollingRate);
      colorStep();
    }, config.colorLoop.transitionRate*1000)
  };

  function colorStep(){
    config.hueLamps.map(lampID => {
      client.lights.getById(lampID)
      .then(light => {
        light.hue = colorLoopColors[(colorLoopIndex + lampID) % colorLoopColors.length];
        light.transitionTime = config.colorLoop.transitionRate;
        return client.lights.save(light)
      });
    });
    
    if(colorLoopIndex < colorLoopColors.length - 1){
      colorLoopIndex ++;
    }else{
      colorLoopIndex = 0;
    }
    
  }

  function playScene(sceneName){
    let scene = scenes[sceneName];
    let cueStep = 0;
    let time = 0;
    config.hueLamps.map(function(lampID) { playCue(lampID, scene.cues[cueStep]); });
    cueStep ++;
    while (cueStep < scene.cues.length -1) {
      time = time + scene.cues[cueStep-1].transitionTime*1000;
      let cue = scene.cues[cueStep];
      setTimeout(function(){
        config.hueLamps.map(function(lampID) { playCue(lampID, cue); });
      }, time);
      cueStep ++;
    }
  }

  function playCue(lampID, cue){
    client.lights.getById(lampID)
    .then(light => {
      for (var k in cue){
        if (cue.hasOwnProperty(k)) {
          light[k] = cue[k];
        }
      }
      return client.lights.save(light)
    })
  }

  module.exports =
  {
    hueLamp
  };
