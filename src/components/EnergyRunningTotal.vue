<template lang="html">
  <div v-if="emissionsProp && energyProp">
    <h4>Energy Total: {{energyTotal}}kg CO2e/day</h4>
  </div>
  <div v-else>
    <h4>Energy Total: </h4>
  </div>
</template>

<script>
import {eventBus} from "@/main.js"

export default {
  props: ['emissionsProp', 'energyProp'],
  computed:{
    energyTotal(){
      let energyArray = []
      energyArray.push((this.energyProp.electricity * this.emissionsProp[0].energy.electricity) / 365)
      energyArray.push((this.energyProp.gas * this.emissionsProp[0].energy.gas) / 365)
      energyArray.push((this.energyProp.hybrid * this.emissionsProp[0].energy.hybrid)/ 365)

    const sumEnergy = function(someArray){
      return someArray.reduce((total, energy) => {
          return total + energy
      }, 0)
    }
  eventBus.$emit('energy-calculated', sumEnergy(energyArray))
  return sumEnergy(energyArray).toPrecision(2)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
