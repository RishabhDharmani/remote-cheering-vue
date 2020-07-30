<template>
	<div>
		<!-- Div for all the graphs -->
		<div class="history" v-for="(data,i) in datas" :key="i">
			<br><br><br><br>
			<!-- Graph data is iterated -->
			<line-example :chart-data="data" :width="1500" :height="300"></line-example>
		</div>
	</div>
</template>

<script>
import lineExample from '@/components/graph.js'
import store from '@/store/index'

export default {
	components: {
		lineExample
	},
	data() {
		return{
			datas: [],		//all graph plotting data
		}
	},
	mounted() {
		this.updateArray();		//updating data of all graphs dynamically

	},
	methods: {
		updateArray(){
			store.state.graph_array = [];
			for(var j=0; j<store.state.data_array.length; j++){

				var dataObject;
				var label_array = [];
				label_array.push(store.state.startTime[j]);
				for(var k=1; k< store.state.data_array[j].length -1; k++){
					label_array[k] = ""; 
				}
				label_array.push(store.state.endTime[j]);

				var datasets= [
				{
					label: "Audio "+(j+1),
					data: store.state.data_array[j],
				}
				]

				dataObject = {
					labels: label_array,
					datasets: datasets,
				}

				this.datas.push(dataObject);
			}
		},
	}
}
</script>