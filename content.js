const STYLE = `
.reverb-button {
	background-color:#272727;
	border-radius:28px;
	border:0px;
	display:flex;
    align-items: center;
  justify-content: center;
	cursor:pointer;
	color:#ffffff;
	font-family: Roboto;
    font-weight: 500;
    

	font-size:15px;
	
	text-decoration:none;
	margin-left: 5px;
    height: 35px;

    
  padding-left: 10px;
  padding-right: 10px;
}
.reverb-button:hover {
	background-color:#404040;
    
}

.reverb-button:active {
	position:relative;
	top:1px;
}


`;

const audioCtx = new AudioContext();
let buffer;
let source;

setTimeout(() => {
  //add  css
  const styleElement = document.createElement("style");
  styleElement.textContent = STYLE;
  document.head.appendChild(styleElement);
  //

  const divButtons = document.getElementById("top-level-buttons-computed"); // top-level-buttons-computed

  const reverbButton = document.createElement("button");
  //reverbButton.textContent = "Reverb";
  reverbButton.innerHTML = `<input type="checkbox" id="scales" name="scales"  />
  <label for="scales">Reverb</label>`;

  reverbButton.className = "reverb-button";

  divButtons?.appendChild(reverbButton);
  //alert(` "Loaded" ${divButtons !== null}`);
  //alert(`win loaded`);
  SetUpAudio();
  ApplyReverb();
}, 1000);

window.addEventListener("load", (event) => {});

function ApplyReverb() {}

function SetUpAudio() {
  const videoElement = document.getElementsByClassName(
    "video-stream html5-main-video"
  )[0];

  const sourceNode = audioCtx.createMediaElementSource(videoElement);

  // Slow motion effect
  videoElement.playbackRate = 0.5; // half speed for example

  // Reverb effect (this is a simplified example and assumes you have an impulse response buffer)
  const convolver = audioCtx.createConvolver();
  convolver.buffer = yourImpulseResponseBuffer; // you need to load an impulse response buffer first
  sourceNode.connect(convolver);

  // Connect the convolver (or any other nodes you set up) to the destination (speakers)
  convolver.connect(audioCtx.destination);

  // Ensure video audio is muted, so you only hear the processed audio
  videoElement.muted = true;

  // Start playing the video
  videoElement.play();
}

// function ApplyReverb() {
//   const context = new AudioContext();

//   // Create audio source from video element
//   const video = document.getElementsByClassName(
//     "video-stream html5-main-video"
//   )[0];
//   const audioSource = context.createMediaElementSource(video);

//   // Create a gain node to control the wet (effected) signal level
//   const wetGain = context.createGain();

//   // Create a delay node for the reverb effect
//   const delay = context.createDelay();
//   delay.delayTime.value = 0.2; // Adjust this value to control the reverb time

//   // Create a feedback gain node to control the feedback amount
//   const feedbackGain = context.createGain();
//   feedbackGain.gain.value = 0.5; // Adjust this value for the desired reverb intensity

//   // Connect the delay to the feedback loop
//   delay.connect(feedbackGain);
//   feedbackGain.connect(delay);

//   // Connect the feedback loop to the wet gain
//   delay.connect(wetGain);

//   // Connect the wet gain to the destination (speakers)
//   wetGain.connect(context.destination);

//   // Connect the dry audio source directly to the destination (bypassing the reverb)
//   audioSource.connect(context.destination);

//   audioSource.playbackRate.value = 0.5;
// }
