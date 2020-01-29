<template>
  <div class="dropdown">
    <div class="dropdown_label">
      <label for="api-thing"><b>Choose a previous date: </b></label>
      <select class="dropdown" @change="handleChange" id="api-thing"v-model="selectedDate">
        <option disabled selected value> -- select an option -- </option>
        <option v-for="(foot, index) of footprints" :key="index" :value="foot">
          Footprint for {{foot.date}}
        </option>

      </select>
      <div class="breakdown_chart">
        <breakdown :breakdown="selectedDate" :chartProp="chartOptions"/>
        <div class="please">
          <highcharts v-if="chartOptions.series[0].data.length > 0" :options="chartOptions"/>
        </div>
      </div>
      </div>
  </div>
  </template>

  <script>
  import Breakdown from './Breakdown.vue';
  import {eventBus} from '../main.js';
  import HotelService from '@/services/UserDataService';
  import {Chart} from 'highcharts-vue'
  import Highcharts from 'highcharts'
  import drilldown from 'highcharts/modules/drilldown'
  drilldown(Highcharts)
  export default {
    props: ['footprints'],
    data(){
      return{
        // show: true,
        selectedDate: null,
        chartOptions:{
          chart: {
            type: 'pie'
          },
          title: {
          },
          subtitle: {
            text: 'Click the slices to view a breakdown of your footprint'
          },
          accessibility: {
            announceNewData: {
              enabled: true
            },
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.1f}%'
              }
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of Total Footprint<br/>'
          },
          series: [
            {
              name: "Footprint",
              colorByPoint: true,
              data: [
              ]
            }
          ],
          drilldown: {
            series: [
            ]
          }
        }
      }
    },
    components:{
      'breakdown': Breakdown,
      highcharts: Chart
    },
    methods: {
      handleChange(e){
        eventBus.$emit('selected-date', this.selectedDate)
        this.chartOptions.series[0].data.length = 0
        this.chartOptions.title = {text: `CO2 Footprint for ${this.selectedDate.date}`}
        this.percentage()
        // this.show
      },
      percentage(){

        let travelPercentage = (this.selectedDate.travelTotal / this.selectedDate.combinedTotal) * 100
        let energyPercentage = (this.selectedDate.energyTotal /this.selectedDate.combinedTotal) * 100
        let dietPercentage = (this.selectedDate.dietTotal / this.selectedDate.combinedTotal) * 100
        //drilldown
        let travelDrillCar = (this.selectedDate.car / this.selectedDate.travelTotal) * 100
        let travelDrillTrain = (this.selectedDate.train / this.selectedDate.travelTotal) * 100
        let travelDrillPlane = (this.selectedDate.plane / this.selectedDate.travelTotal) * 100
        let energyDrillElectricity = (this.selectedDate.electricity / this.selectedDate.energyTotal) * 100
        let energyDrillGas = (this.selectedDate.gas / this.selectedDate.energyTotal) * 100
        let energyDrillHybrid = (this.selectedDate.hybrid / this.selectedDate.energyTotal) * 100
        let dietDrillMeat = (this.selectedDate.meat / this.selectedDate.dietTotal) * 100
        let dietDrillVeg = (this.selectedDate.veg / this.selectedDate.dietTotal) * 100
        this.chartOptions.series[0].data.push({
          name: "Travel",
          y: travelPercentage,
          drilldown: "Travel"
        })
        this.chartOptions.series[0].data.push({
          name: "Energy",
          y: energyPercentage,
          drilldown: "Energy"
        })
        this.chartOptions.series[0].data.push({
          name: "Diet",
          y: dietPercentage,
          drilldown: "Diet"
        })
        this.chartOptions.drilldown.series.push(
          {
            name: "Travel",
            id: "Travel",
            data: [
              ["Car",
              travelDrillCar
            ],
            ["Train",
            travelDrillTrain],
            ["Plane",
            travelDrillPlane]
          ]
        },
        {
          name: "Energy",
          id: "Energy",
          data: [
            ["Electricity",
            energyDrillElectricity
          ],
          ["Gas",
          energyDrillGas],
          ["Hybrid",
          energyDrillHybrid]
        ]
      },
      {
        name: "Diet",
        id: "Diet",
        data: [
          ["Meat",
          dietDrillMeat
        ],
        ["Veg",
        dietDrillVeg]
      ]
    }
  )
}
},

}


</script>
<style lang="css" scoped>
.dropdown{
  cursor: pointer;
}

.breakdown_chart{
  display: flex;
}

.highcharts-container{
  position: relative;
    overflow: hidden;
    width: 450px;
    height: 651px;
    text-align: left;
    line-height: normal;
    z-index: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin: 25px;
    width: 500px;
    padding-top: 25px;
}

#highcharts-qw53ocy-6{
  position: relative;
    overflow: hidden;
    width: 450px;
    height: 651px;
    text-align: left;
    line-height: normal;
    z-index: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin: 25px;
    width: 500px;
    padding-top: 25px;
}

.please{
  margin:25px;
}

</style>
