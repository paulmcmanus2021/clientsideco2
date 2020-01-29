<template>
  <div v-if="breakdown" class="break">
    <h2>CO2 Breakdown</h2>
    <h4>Travel</h4>

    <p>Car:{{breakdown.car}}kg CO2e/day</p>
    <p>Train:{{breakdown.train}}kg CO2e/day</p>
    <p>Plane:{{breakdown.plane}}kg CO2e/day</p>
    <p>Total: {{breakdown.travelTotal}}kg CO2e/day</p>
    <h4>Energy</h4>
    <p>Electricity:{{breakdown.electricity}}kg CO2e/day</p>
    <p>Gas:{{breakdown.gas}}kg CO2e/day</p>
    <p>Hybrid:{{breakdown.hybrid}}kg CO2e/day</p>
    <p>Total: {{breakdown.energyTotal}}kg CO2e/day</p>
    <h4>Diet</h4>
    <p>Meat:{{breakdown.meat}}kg CO2e/day</p>
    <p>Veg{{breakdown.veg}}kg CO2e/day</p>
    <p>Total: {{breakdown.dietTotal}}kg CO2e/day</p>




  </div>
</template>
<script>
import Result from './Result.vue'
import {eventBus} from '@/main.js'
import {Chart} from 'highcharts-vue'
import Highcharts from 'highcharts'
import drilldown from 'highcharts/modules/drilldown'
drilldown(Highcharts)
export default {
  props: ['breakdown', 'chartProp'],
  mounted(){
    eventBus.$on('history-pie', (banana) => {
      this.percentage()
    })
  }
}
</script>
<style lang="css" scoped>
.break{
  background-color: white;
  margin: 25px;
}
</style>
