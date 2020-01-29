<template lang="html">
  <div v-if="emissionsProp && travelProp">
      <h4>Travel Total: {{travelTotal}}kg CO2e/day</h4>
  </div>
  <div v-else>
    <h4>Travel Total: </h4>
  </div>
</template>

<script>
import {eventBus} from "@/main.js"

export default {
  name: 'travel-running-total',
  props: ['emissionsProp', 'travelProp'],
computed: {
  travelTotal(){
    let travelArray = []
    travelArray.push((this.travelProp.car * this.emissionsProp[0].travel.car) / 365)
    travelArray.push((this.travelProp.train * this.emissionsProp[0].travel.train) / 365)
    travelArray.push((this.travelProp.plane * this.emissionsProp[0].travel.plane)/ 365)

  const sumTravel = function(someArray){
    return someArray.reduce((total, travel) => {
        return total + travel
    }, 0)
  }
  eventBus.$emit('travel-calculated', sumTravel(travelArray))
  return sumTravel(travelArray).toPrecision(3)
}

}
}
</script>


<style lang="css" scoped>

</style>
