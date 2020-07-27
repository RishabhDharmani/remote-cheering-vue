<script>
	import vz from '@/components/visualizer'
	import Vue from 'vue'

	var fl = new Vue ({
		data() {
			return{
				audioContext: window.AudioContext || window.webkitAudioContext,
				fbc_array: [],
			}		
		},
		methods: {

			//Loops and collects audio frames to be used

			frameLooper: function frameLooper(average_array, analyser, flag) {
				if(flag) return;

				//start taking frames as inputs		
				window.requestAnimationFrame(frameLooper);

				//array to store frequency data of each frame
				this.fbc_array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(this.fbc_array);
				console.log(this.fbc_array);

				// Call Visualizer
				vz.Visualizer(this.fbc_array);

				// Average of frequencies per audio frame
				average_array.push(this.average(this.fbc_array));
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
					avg=(sum1)/(sum2);

				return avg;		
			}
		}
	})

	export default{
		fl
	}
</script>