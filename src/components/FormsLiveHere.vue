<template>
  <div>
    <form class="forms" action="index.html" method="post" v-on:submit="handleSubmit">
        <h3 for="Date"><u>Date:</u></h3>
        <input type="date" name="date" v-model="date" required>
        <h4>Hover over categories for more information.</h4>
        <h3 @mouseover="hovertravel = true" @mouseleave="hovertravel = false"><u>Travel</u></h3>
          <li v-if="hovertravel">Average user daily car miles: 20</li>
          <li v-if="hovertravel">Average user daily train miles: 14</li>
          <li v-if="hovertravel">Average user daily plane miles: 0</li>
          <p>Enter miles traveled by:</p>
          <label for="car">Car:</label>
          <input type="number" name="car" @input="handleRunningTravel" v-model="car">
          <br>
          <label for="train">Train:</label>
          <input type="number" name="train" @input="handleRunningTravel" v-model="train">
          <br>
          <label for="plane">Plane:</label>
          <input type="number" name="plane" @input="handleRunningTravel" v-model="plane">
        <h3 @mouseover="hoverenergy = true" @mouseleave="hoverenergy = false"><u>Energy</u></h3>
          <li v-if="hoverenergy">Average user daily electricity used: 5</li>
          <li v-if="hoverenergy">Average user daily gas used: 10</li>
          <li v-if="hoverenergy">Average user daily hybrid used: 18</li>
          <p>Enter kilowatts used:</p>
          <label for="electricity">Electricity:</label>
          <input type="number" name="electricity" @input="handleRunningEnergy" v-model="electricity">
          <br>
          <label for="gas">Gas:</label>
          <input type="number" name="gas" @input="handleRunningEnergy" v-model="gas">
          <br>
          <label for="hybrid">Hybrid:</label>
          <input type="number" name="hybrid" @input="handleRunningEnergy" v-model="hybrid">
        <h3 @mouseover="hoverdiet = true" @mouseleave="hoverdiet = false"><u>Diet</u></h3>
          <li v-if="hoverdiet">Average user daily meat eaten: 800</li>
          <li v-if="hoverdiet">Average user daily veg eaten: 1000</li>
          <p>Enter kcal eaten in:</p>
          <label for="meat">Meat:</label>
          <input type="number" name="meat" @input="handleRunningDiet" v-model="meat">
          <br>
          <label for="veg">Veg:</label>
          <input type="number" name="veg" @input="handleRunningDiet" v-model="veg">
      <br>

      <br>
      <button class="submit" type="submit" alt="Submit"><img src="https://images.vexels.com/media/users/3/151082/isolated/preview/56bd227524ed2184915800eb5a586a2d-left-foot-footprint-silhouette-by-vexels.png" width="60px"height="60px"></button>
      <br>
      <label for="button">Submit</label>

    </form>
    <br>
  </div>
</template>
<script>
import EmissionFactorsService from '@/services/EmissionFactorsService.js';
import UserDataService from '@/services/UserDataService.js'
import { eventBus } from '../main.js';

export default {
  name: "forms-live-here",
  data(){
    return{
      date: null,
      car: null,
      train: null,
      plane: null,
      electricity: null,
      gas: null,
      hybrid: null,
      meat: null,
      veg: null,
      travelTotal: null,
      energyTotal: null,
      dietTotal: null,
      combinedTotal: null,
      hovertravel: false,
      hoverenergy: false,
      hoverdiet: false,
      emissions: []
    }
  },
  mounted(){
    EmissionFactorsService.getEmissionFactors()
    .then(emissions => this.emissions = emissions)


    eventBus.$on('travel-calculated', result => this.travelTotal = result)
    eventBus.$on('energy-calculated', result => this.energyTotal = result)
    eventBus.$on('diet-calculated', result => this.dietTotal = result)
    eventBus.$on('combined-calculated', result => this.combinedTotal = result)
    eventBus.$on('combined-calculated', result => this.combinedTotal = result)
    eventBus.$on('emissions-getter', result => this.emissions = result)



    },
  methods: {
  handleSubmit(e){
    e.preventDefault()
    const newFootprint = {
      date: this.date,
      car: ((this.car * this.emissions[0].travel.car)/ 365),
      train: ((this.train * this.emissions[0].travel.train)/ 365),
      plane: ((this.plane * this.emissions[0].travel.plane)/ 365),
      electricity: ((this.electricity * this.emissions[0].energy.electricity)/ 365),
      gas: ((this.gas * this.emissions[0].energy.gas)/ 365),
      hybrid: ((this.hybrid * this.emissions[0].energy.hybrid)/ 365),
      meat: ((this.meat * this.emissions[0].diet.meat)),
      veg: ((this.veg * this.emissions[0].diet.veg)),
      travelTotal: this.travelTotal,
      energyTotal: this.energyTotal,
      dietTotal: this.dietTotal,
      combinedTotal: this.combinedTotal
      }

      UserDataService.postFootprint(newFootprint)
      .then((res) => {
        e.target.reset()
        eventBus.$emit('footprint-added', res)
        eventBus.$emit('totals-cleared', true)
      })
  },

  handleRunningTravel(){
    const runningFootprint = {
      car: this.car,
      train: this.train,
      plane: this.plane
        }
      eventBus.$emit('running-total-travel', runningFootprint)
  },
  handleRunningEnergy(){
    const runningFootprint = {
      electricity: this.electricity,
      gas: this.gas,
      hybrid: this.hybrid
        }
      eventBus.$emit('running-total-energy', runningFootprint)
  },
  handleRunningDiet(){
    const runningFootprint = {
      meat: this.meat,
      veg: this.veg
        }
      eventBus.$emit('running-total-diet', runningFootprint)
  },
}
}
</script>

<style lang="css" scoped>
h2 {
	margin: 10px 0;
	padding: 0;
}
form {
	width: auto;
	margin: 0 auto;
	background: rgba(255, 255, 255, 0.7);
	padding: 20px;
	margin-bottom: 40px;
  border-color: black;
  border-style: solid;
  border-width: thin;
}
label {
	min-width: 100px;
	display: inline-block;
}
.submit {
  cursor: pointer;
}
</style>
