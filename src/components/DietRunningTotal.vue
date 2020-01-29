<template lang="html">
    <div v-if="emissionsProp && dietProp">
      <h4>Diet Total: {{dietTotal}} kg CO2e/day</h4>
    </div>
    <div v-else>
      <h4>Diet Total: </h4>
    </div>
</template>

<script>
import {eventBus} from "@/main.js"

export default {
  props: ['emissionsProp', 'dietProp'],
  computed:{
    dietTotal(){
      let dietArray =[]
      dietArray.push(this.dietProp.meat * this.emissionsProp[0].diet.meat)
      dietArray.push(this.dietProp.veg * this.emissionsProp[0].diet.veg)

      const sumDiet = function(someArray){
        return someArray.reduce((total, diet) => {
            return total + diet
        }, 0)
      }
    eventBus.$emit('diet-calculated', sumDiet(dietArray))
    return sumDiet(dietArray).toPrecision(2)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
