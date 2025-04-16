let vars = [400, 500, 600, 700, 800, 900];
let sliders = [];

let index = 0;
let currentTime = 0;

let osc1, osc2, osc3, noiseGen;
let env1, env2, env3, envNoise;

function setup() {
  createCanvas(800, 300);
  textSize(14);
  fill(0);

  for (let i = 0; i < vars.length; i++) {
    let s = createSlider(100, 1000, vars[i], 10);
    s.position(30, 30 + i * 30);
     s.style('background', '#f8bfe0'); 
    s.style('accent-color', '#f48fb1');
    sliders.push(s);
  }

  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('triangle');
  osc3 = new p5.Oscillator('sawtooth');
  noiseGen = new p5.Noise('pink');

  osc1.start(); osc2.start(); osc3.start(); noiseGen.start();
  osc1.amp(0); osc2.amp(0); osc3.amp(0); noiseGen.amp(0);


  env1 = new p5.Envelope(0.01, 0.5, 0.2, 0.1);
  env2 = new p5.Envelope(0.01, 0.4, 0.3, 0.15);
  env3 = new p5.Envelope(0.02, 0.6, 0.4, 0.2);
  envNoise = new p5.Envelope(0.05, 0.3, 0.5, 0.3);
}

function draw() {
  background(255);
  text('Rhythm：', 180, 20);


  for (let i = 0; i < sliders.length; i++) {
    vars[i] = sliders[i].value();
    text(`Step ${i + 1}: ${vars[i]} ms`, 180, 50 + i * 30);
  }


  if (millis() > currentTime + vars[index]) {
    currentTime = millis();

    let choice = floor(random(4));
    let freq1 = random([220, 330, 440, 550, 660, 880]);

    if (choice === 0) {
      osc1.freq(33);
      env1.play(osc1);
    } else if (choice === 1) {
      osc2.freq(freq1 * 1.5);
      env2.play(osc2);
    } else if (choice === 2) {
      osc3.freq(freq1 * 0.85);
      env3.play(osc3);
    } else {
      envNoise.play(noiseGen);
    }

    index = (index + 1) % vars.length;
  }
}