<template lang="html">
    <div v-if=" this.combinedTotal > 0">
      <h3>Combined Total:{{ combinedTotal }}kg CO2e/day</h3>
    </div>
    <div v-else>
      <h3>Combined Total:</h3>
    </div>
</template>

<script>
import TravelRunningTotal from '@/components/TravelRunningTotal'
import EnergyRunningTotal from '@/components/EnergyRunningTotal'
import DietRunningTotal from '@/components/DietRunningTotal'
import { eventBus } from '../main.js';

export default {
  name: 'combined-running-total',
  data() {
    return {
      travelTotal: 0,
      energyTotal: 0,
      dietTotal: 0
    }
  },
  methods: {
    resetTotals(){
      this.travelTotal = 0,
      this.energyTotal = 0,
      this.dietTotal = 0
      }
  },
  mounted(){
    eventBus.$on('travel-calculated', result => this.travelTotal = result)
    eventBus.$on('energy-calculated', result => this.energyTotal = result)
    eventBus.$on('diet-calculated', result => this.dietTotal = result)
    eventBus.$on('totals-cleared', (banana) => {
    this.resetTotals()
    })

  },
  computed:{
    combinedTotal(){
      let resultCombined = this.dietTotal + this.energyTotal + this.travelTotal
      eventBus.$emit('combined-calculated', resultCombined)
      return resultCombined.toPrecision(5)
    }
  }
}

</script>

<style lang="css" scoped>
</style>
