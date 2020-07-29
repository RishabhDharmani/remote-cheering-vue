import {Line} from 'vue-chartjs'
import store from '@/store/index'

var label_array = [];
label_array.push(store.state.startTime[0]);
for(var i=1; i< store.state.data_array[0].length -1; i++){
  label_array[i] = ""; 
}

label_array.push(store.state.endTime[0]);
// label_array.push("");
// label_array.push("");
// label_array.push("");
// label_array.push("");

console.log(store.state.data_array);

export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: label_array,
      datasets: [
        {
          label: 'Data One',
          data: store.state.data_array[0],
        },
      ],
    },{
      responsive: true, 
      maintainAspectRatio: false, 
      scales:{
        xAxes: [{
          ticks: {
            autoSkip: false,
            minRotation: 90            
          }
        }],
        yAxes: [{
            scaleLabel: {
              labelString: 'Average Frequency / frame',
              display: true
            }
        }]
      }
    })

  }
}