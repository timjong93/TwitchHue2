var options = {
    options: {
        debug: false // Change this to true if you want to see chat logs
    },
    identity: {
        apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IkI4OUUyRDdGNTRGODA5QTFCNzg4IiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiMzYyMDM4MDAifQ.ZuPPTz98CRJiYP1uTuIIyI9xZnXkPlwOSZ88brmrU_w", // Enter streamlab API key
    },
};

var hueIP = '192.168.0.124' //Enter Hue bridge IP inside of the quotes

var hueUsername = 'ORF7o14-Dlj0mbaqwziXVUG6ErB2-aV1gXEW1RNy' //Enter Hue username inside of the quotes. You can get your username from setup.js

var cheerOptions = {
  cheerTier1: 100,
  cheerTier2: 1000,
  cheerTier3: 5000,
  cheerTier4: 10000
  //cheerTier5: 10 (EXAMPLE)
}

var hueLamps = [2] // You can put multiple Lamp ID's. (Example: var hueLamps = [2, 4])

var colorLoop = {
  colors : [65527,12306,20738,42928], // colors to cycle
  transitionRate : 20, // delay between colorsteps in sec
  pollingRate : 100 // pollingRate in ms
}

module.exports =
{
  options,
  hueIP,
  hueUsername,
  cheerOptions,
  timeBetweenAlerts,
  hueLamps,
  colorLoop
};
