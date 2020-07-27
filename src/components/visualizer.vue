<template>
	<div>
		<canvas id="slide"></canvas>
  </div>
</template>

<script>
	
	export default {
		methods: {
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
		}
	}
</script>