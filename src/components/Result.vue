<template lang="html">
  <div >
    <div class="charts">
      <highcharts v-if="chartOptions.series[0].data.length > 0" :options="chartOptions"/>
    </div>
    <div class="dropdown">
      <date-history :footprints="footprints" />
    </div>
  </div>
  </template>

  <script>
  import UserDataService from '@/services/UserDataService.js'
  import {eventBus} from '@/main.js'
  import {Chart} from 'highcharts-vue'
  import Highcharts from 'highcharts'
  import drilldown from 'highcharts/modules/drilldown'
  import DateHistory from './DateHistory';

  drilldown(Highcharts)
  export default {

    data(){
      return{
        footprints: [],
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
      highcharts: Chart,
      'date-history': DateHistory
    },
    methods: {
      percentage(footprint){
        let travelPercentage = (footprint.travelTotal / footprint.combinedTotal) * 100
        let energyPercentage = (footprint.energyTotal /footprint.combinedTotal) * 100
        let dietPercentage = (footprint.dietTotal / footprint.combinedTotal) * 100

        //drilldown
        let travelDrillCar = (footprint.car / footprint.travelTotal) * 100
        let travelDrillTrain = (footprint.train / footprint.travelTotal) * 100
        let travelDrillPlane = (footprint.plane / footprint.travelTotal) * 100

        let energyDrillElectricity = (footprint.electricity / footprint.energyTotal) * 100
        let energyDrillGas = (footprint.gas / footprint.energyTotal) * 100
        let energyDrillHybrid = (footprint.hybrid / footprint.energyTotal) * 100

        let dietDrillMeat = (footprint.meat / footprint.dietTotal) * 100
        let dietDrillVeg = (footprint.veg / footprint.dietTotal) * 100



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
mounted(){
  UserDataService.getUserData()
  .then(footprints => this.footprints = footprints)



  eventBus.$on('footprint-added', (footprint)=> {
    this.footprints.push(footprint)
    this.chartOptions.series[0].data.length = 0
    this.chartOptions.title = {text: `CO2 Footprint for ${footprint.date}`}
    this.percentage(footprint)

  })

}
}


</script>

<style lang="css" scoped>
.div {
  /* background-color: lightslategrey; */
  padding: 20px;
  margin: 10px;
  align-content: flex-end;

}

.charts{
  display: inline-flex;
}
</style>
