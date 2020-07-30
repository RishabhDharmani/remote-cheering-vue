<template>
  <v-main id="controls" fluid>

      <br><br><br>	
      <h1>Remote Cheering</h1>

      <!-- Buttons -->

      <button class="recordbuttons" @click="record" :disabled="recordToggle">Record</button>
      <button class="recordbuttons" @click="pause" :disabled="pauseToggle">{{pauseText}}</button>  
      <button class="recordbuttons" @click="stop" :disabled="stopToggle">Stop</button> 

      <!-- Visualizer -->

      <canvas id="slide"></canvas>
  </v-main>
</template>




<script>

	import store from '@/store/index'
	import Vue from 'vue'

	//global variables defined

	var gumStream;
	var flag;
	var analyser;
	var average_array =[];
	var fbc_array;


	//new Vue object for recording functions
	var fl = new Vue ({
		data() {
			return{
				count: 0,
				count2: 0,
				websocket: new WebSocket("wss://localhost:8080"),
			}
		},
		methods: {

			//Loops and collects audio frames to be used
			frameLooper: function frameLooper() {
				if(flag) return;

				//start taking frames as inputs		
				window.requestAnimationFrame(frameLooper);

				//array to store frequency data of each frame
				fbc_array = new Uint8Array(256);
				analyser.getByteFrequencyData(fbc_array);
				
				//count of frames
				fl.count2+=1;

				//bin 119 chosen for clap detection (closest frequency of clap)
				//if amplitude of bin 119 is more than 140, it is noted
				if(fbc_array[119]>140) fl.count++;

				//if we find 10 frames with clap in 2000 frames then clap signal sent 
				if(fl.count===10 && fl.count2<=4000) {
					console.log("clap");
					if(fl.websocket.readyState===WebSocket.OPEN)
					{
						fl.websocket.send("clap");
					}
					//reset count
					fl.count=0;
				}
				
				//reset both counts
				if(fl.count2===4000)
				{
					fl.count=0;
					fl.count2=0;
				}

				// Call Visualizer
				fl.Visualizer(fbc_array);

				// Average of frequencies per audio frame
				average_array.push(fl.average(fbc_array));
			},

			Visualizer(fbc_array){

				//defining canvas
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

			// Average Function

			average(fbc_array){

				//defining variables
				var sum1=0;
				var sum2=0;
				var avg=0;
				
				//looping per audio frame	
				//taking weighted mean for frequency according to loudness
				for(var i =0; i<256; i++){
					sum1+=(fbc_array[i]*(i+1));
					sum2+=fbc_array[i];
				}

				if(sum2===0)
					avg=0;
				else
					avg=((sum1)*22000)/(256*(sum2));

				return avg;		
			}
		}
	})

	export default {
	data() {
		return{

			//states of buttons for disable/enable
			recordToggle: false,
			pauseToggle: true,
			stopToggle: true,

			//Pause button state for text change
			pauseText: 'Pause',

			//timestamp variables
			startTime: 0,
			endTime: 0,

			audioContext: window.AudioContext || window.webkitAudioContext,
			input: 0,

		}		
	},	

	//store for Vuex state storage
	store,
	methods: {

		// Begin recording
		record: function() {

			console.log("recordButton clicked");
			var constraints = { audio: true, video:false }

			//state changes 
			this.recordToggle = true;
			this.pauseToggle = false;
			this.stopToggle = false;
			flag= false;

			//initializing average data array
			average_array=[0];

			//recording starting time
			this.startTime = new Date();

			fl.websocket = new WebSocket("wss://localhost:8080");

			navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

				console.log("getUserMedia() success");

				//storing time in a readable format
				var time = this.startTime.getHours() + ":" + this.startTime.getMinutes() + ":" + this.startTime.getSeconds();

				//saving the starting timestamp
				store.dispatch('startTime', time);

				console.log(time);

				//New audiocontext object
				this.audioContext = new AudioContext();

				//analyser for frequency analysis
				analyser = this.audioContext.createAnalyser();

				gumStream = stream;

				//defining input
				this.input = this.audioContext.createMediaStreamSource(stream);

				//connecting input to analyser node
				this.input.connect(analyser);

				//frequency data array size
				analyser.fftSize = 512;

				//Frame looper function called
				fl.frameLooper(average_array, analyser, flag);

			})
		},

		//Pause or Resume Recording

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

		//Stop Recording

		stop: function() {

			console.log("stopButton clicked");

			//stop recording
			gumStream.getAudioTracks()[0].stop();

			//changing states back to initial
			this.pauseText = 'Pause';
			flag= true;
			this.recordToggle = false;
			this.pauseToggle = true;
			this.stopToggle = true;

			//storing average data array using Vuex management
			//console.log(average_array);
			store.dispatch('addArray', average_array);

			if (fl.websocket.readyState === WebSocket.OPEN){

				fl.websocket.close();
				console.log("Websocket Closed");
			}

			//taking ending time
			this.endTime = new Date();

			//storing time in a readable format
			var time = this.endTime.getHours() + ":" + this.endTime.getMinutes() + ":" + this.endTime.getSeconds();

			//saving the ending timestamp
			store.dispatch('endTime', time);
			console.log(time);
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