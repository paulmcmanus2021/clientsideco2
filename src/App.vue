<template>
  <div id="app">
    <img class="pic"src="https://ya-webdesign.com/transparent250_/carbon-footprint-logo-png-1.png">
    <h1 class="head">CO2/BY/U</h1>
    <div class="about">
      <p>CO/2/BY/U is a daily activity tracker designed to help you keep track of your carbon footprint.</p>
        <p>To calculate your footprint enter all relevant details in fields below.</p>
    </div>
    <br>
  <div class="form-running">
    <forms-live-here/>
    <result/>
    <footprint-running-total/>

  </div>
  <hr>
  <p>SoggyBottomBoys/Apps&#169;</p>
  </div>
</template>
<script>
import CombinedRunningTotal from '@/components/CombinedRunningTotal';
import EmissionFactorsService from '@/services/UserDataService.js';
import FootprintRunningTotal from '@/components/FootprintRunningTotal';
import FormsLiveHere from '@/components/FormsLiveHere';
import Result from '@/components/Result';
import {eventBus} from '@/main.js'

export default {
  name: "app",
  data() {
    return {

    }
  },
  components: {
    'footprint-running-total': FootprintRunningTotal,
    'forms-live-here': FormsLiveHere,
    'result': Result
  },
  mounted(){


      // this.getUserData()
      //   eventBus.$on('emission-added', (emission) => {
      //     this.emission.push(emission)
      //   });
  }
}
</script>
<style lang="css" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightslategrey;
  background-color: stretch;
  overflow-x: hidden;
  background-size: cover;
  padding: 10px;
  background-image: url('http://blog.hostbaby.com/wp-content/uploads/2014/03/Trees_1400x900.png');

}

/* .heading {
  padding: 10px;
  text-align: center;
  background: lightslategrey;
  color: white;
  font-size: 30px;
} */
.head{
  font-family: times;
  font-size: 80px;
  padding: 0px;
  color: black;
  color: inherit;
}

.about {
  font-weight: bolder;
}

p {
  color: black;
}
.pic{
  padding-top: 20px;
}

.form-running {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}


</style>
