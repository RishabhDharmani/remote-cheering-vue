<template>
  <v-main id="controls" fluid>

      <br><br><br>	
      <h1>Remote Cheering</h1>

      <button class="recordbuttons" @click="record" :disabled="recordToggle">Record</button>
      <button class="recordbuttons" @click="pause" :disabled="pauseToggle">{{pauseText}}</button>  
      <button class="recordbuttons" @click="stop" :disabled="stopToggle">Stop</button> 

      <canvas id="slide"></canvas>
  </v-main>
</template>




<script>

	import Vue from 'vue'

	var gumStream;
	var fbc_array;
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var flag;
	var analyser;
	var average_array =[];

	var vm = new Vue({
		methods: {
			frameLooper: function frameLooper() {
				if(flag) return;

				//start taking frames as inputs		
				window.requestAnimationFrame(frameLooper);

				//array to store frequency data of each frame
				fbc_array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(fbc_array);
				//console.log(fbc_array);

				vm.Visualizer(fbc_array);
				average_array.push(vm.average(fbc_array));
			},

			Visualizer(fbc_array){
				var canvas = document.getElementById("slide");
				var ctx = canvas.getContext("2d");

				//defines the width and height of the visualizer
				var WIDTH = canvas.width;
				var HEIGHT = canvas.height;

				//define width and height of each bar of frequency
				var barWidth = (WIDTH/256);
				var barHeight;
				var x = 0;

				//initial colour black
				ctx.fillStyle = "#3aafa9";
				ctx.fillRect(0, 0, WIDTH, HEIGHT);

				//loop for each frequency bar height
				for (var i = 0; i < 256; i++) {
					barHeight = fbc_array[i];

					//filling according to colors
					ctx.fillStyle = "#000";
					ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

					x += barWidth;
				}
			},

			average(fbc_array){

				var sum1=0;
				var sum2=0;
				var avg=0;

				for(var i =0; i<256; i++){
					sum1+=(fbc_array[i]*(i+1));
					sum2+=fbc_array[i];
				}

				if(sum2===0)
					avg=0;
				else
					avg=(sum1*22100)/(sum2*256);

				return avg;		
			}
		}
	})

	export default {
	data() {
		return{
			recordToggle: false,
			pauseToggle: true,
			stopToggle: true,

			pauseText: 'Pause',
		}		
	},	

	methods: {
		record: function() {

			console.log("recordButton clicked");
			var constraints = { audio: true, video:false }

			this.recordToggle = true;
			this.pauseToggle = false;
			this.stopToggle = false;
			flag= false;
			average_array=[0];

			navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

				console.log("getUserMedia() success");

				var audioContext = new AudioContext();

				analyser = audioContext.createAnalyser();

				gumStream = stream;

				var input = audioContext.createMediaStreamSource(stream);

				input.connect(analyser);

				analyser.fftSize = 512;

				vm.frameLooper();

			})
		},

		pause: function() {
			if (flag ===false){
				//pause
				this.pauseText="Resume";
				flag = true;
			}
			else{
				//resume
				this.pauseText="Pause";
				flag = false;
			}
		},

		stop: function() {
			console.log("stopButton clicked");
			gumStream.getAudioTracks()[0].stop();
			this.pauseText = 'Pause';
			flag= true;
			this.recordToggle = false;
			this.pauseToggle = true;
			this.stopToggle = true;

			//console.log(average_array);
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
	margin-top: 100px;
    background-color: #3aafa9;
    height: 300px;
    width: 100%;
}
</style>