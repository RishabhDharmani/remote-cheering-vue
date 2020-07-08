import recordButtons from '@/components/recordButtons.vue'

<template>
  <v-main id="controls" fluid>

      <br><br><br>	
      <h1>Remote Cheering</h1>

      <button class="recordbuttons" @click="record">Record</button> 
      <button class="recordbuttons" @click="stop">Stop</button>  

     <canvas id="slide"></canvas>                               <!--- Visualizer ---->
    </v-main>
</template>

<script>

	var gumStream;
	var AudioContext= window.AudioContext || window.webkitAudioContext;
	//var bufferLength;

	export default {

	methods: {
		record: function() {

			console.log("recordButton clicked");
			var constraints = { audio: true, video:false }

			navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

				console.log("getUserMedia() success");

				var audioContext= new AudioContext();

				var analyser = audioContext.createAnalyser();

				gumStream = stream;

				var input = audioContext.createMediaStreamSource(stream);

				input.connect(analyser);

				analyser.fftSize = 1024;
				//bufferLength = analyser.frequencyBinCount;

			}

				console.log("Recording started");
			})
		},

		stop: function() {
			console.log("stopButton clicked");
			gumStream.getAudioTracks()[0].stop();
		}
	}
}
</script>

<style scoped>

h1 {
  font-size: 520%;
  font-weight: bold;
  font-family: 'Open Sans';
  padding: 30px;
  color: #17252a;
  margin: 0 auto;
}

/************* Div with Recording Buttons ****************/

#controls {
  
  text-align: center;
  background-color: #3aafa9;
  padding: 40px 0px 40px;

}

/*************** Styling for all buttons ******************/

.recordbuttons {
  flex-grow: 1;
  height: 5.5rem;
  width: 15rem;
  min-width: 2rem;
  border-radius: 0.15rem;
  background: #17252a;
  margin-left: 2px;
  margin-bottom: 5px;
  box-shadow: inset 0 -0.15rem 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: inline;
  justify-content: center;
  align-items: center;
  color:#ffffff;
  font-weight: 600;
  font-family: 'Open Sans';
  font-size: 2rem;
}

/***************** Buttons when hover ********************/

.recordbuttons:hover, .recordbuttons:focus {
  outline: none;
  background: #2b7a78;
}

/************* Inner Focus ring - Buttons ****************/

.recordbuttons::-moz-focus-inner {
  border: 0;
}

/******************* Pressable Button **********************/

.recordbuttons:active {
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
  line-height: 3rem;
}

/***************** Non-pressable Button ********************/

.recordbuttons:disabled {
  pointer-events: none;
  background-color: white;
  color: #def2f1;
}

/***************** First Button Margin *********************/

.recordbuttons:first-child {
  margin-left: 0;
}

/********************* Visualizer *************************/

#slide {
    background-color: #3aafa9;
    height: 200px;
    width: 100%;
}
</style>