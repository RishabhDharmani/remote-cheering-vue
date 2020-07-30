import {Line, mixins} from 'vue-chartjs'

//for reactive data
const {reactiveProp} = mixins

export default {
  extends: Line,
  //reactive data
  mixins: [reactiveProp],
  data(){
    return{
      //options common for all graphs
      options: {
      responsive: true, 
      maintainAspectRatio: false, 

      // scales of axes
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
      }
    }
  },
  mounted () {
      this.renderChart(this.chartData,this.options);   
  }
}