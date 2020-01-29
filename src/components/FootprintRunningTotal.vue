<template lang="html">
  <div  class="running-total-container">
      <travel-running-total  :emissionsProp="emissions" :travelProp="travelRunningTotal"/>
      <energy-running-total :emissionsProp="emissions" :energyProp="energyRunningTotal"/>
      <diet-running-total :emissionsProp="emissions" :dietProp="dietRunningTotal"/>
      <combined-running-total />
  </div>
</template>

<script>

import { eventBus } from '../main.js';
import EmissionFactorsService from '@/services/EmissionFactorsService';
import TravelRunningTotal from './TravelRunningTotal.vue';
import EnergyRunningTotal from './EnergyRunningTotal.vue';
import DietRunningTotal from './DietRunningTotal.vue';
import CombinedRunningTotal from './CombinedRunningTotal.vue';


export default {
  name: 'footprint-running-total',
  data(){
    return {
      travelRunningTotal: null,
      energyRunningTotal: null,
      dietRunningTotal: null,
      combinedRunningTotal: null,
      emissions: []
    }
  },
  components:{
    'travel-running-total': TravelRunningTotal,
    'energy-running-total': EnergyRunningTotal,
    'diet-running-total': DietRunningTotal,
    'combined-running-total': CombinedRunningTotal
    },
  methods: {
    resetTotals(){
      this.travelRunningTotal = null,
      this.energyRunningTotal = null,
      this.dietRunningTotal = null
      }
  },


  mounted() {

    EmissionFactorsService.getEmissionFactors()
    .then(emissions => this.emissions = emissions)

    eventBus.$on('running-total-travel', (changeFootprint)=> {
    this.travelRunningTotal = changeFootprint
    })
    eventBus.$on('running-total-energy', (changeFootprint)=> {
    this.energyRunningTotal = changeFootprint
    })
    eventBus.$on('running-total-diet', (changeFootprint)=> {
    this.dietRunningTotal = changeFootprint
    })
    eventBus.$on('totals-cleared', (banana) => {
    this.resetTotals()
    })


  }
}



</script>

<style lang="css" scoped>
.running-total-container {
  width: auto;
  height: 10%;
	background: rgba(255, 255, 255, 0.7);
	padding: 20px;
	margin-bottom: 40px;
  border-color: black;
  border-style: solid;
  border-width: thin;
}
</style>
