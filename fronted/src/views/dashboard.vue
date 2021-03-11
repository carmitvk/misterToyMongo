<template>
  <main class="dashbord">
    <section class="doughnut-container">
      <h3>Prices per toy type(average):</h3>
      <doughnut class="doughnut-show" v-if="storeToysAvgByType" :data="toysDataForDisplay" />
    </section>
    <section class="doughnut-container">
      <h3> percentage of toys that are in stock by type:</h3>
      <doughnut class="doughnut-show" v-if="storeToysInStockByType" :data="toysInStockForDisplay" />
    </section>
  </main>
</template>

<script>
import doughnut from "@/cmps/doughnut";
export default {
   name:'dashboard',
  data() {
    return {
      // toysAvgByType: null,
      // toysInStockByType: null,
    };
  },
  computed: {
    toysDataForDisplay() {
       console.log('toysDataForDisplay', this.$store.getters.toysCountByType)
      return {
        datasets: [
          {
            backgroundColor: ['yellow','green'],
            data: this.$store.getters.toysCountByType,
          },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["baby", "funny"],
      };
    },
  
    toysInStockForDisplay() {
      console.log('toysInStockForDisplay', this.$store.getters.toysInStockByType)
      return {
        datasets: [
          {
            backgroundColor: ['yellow','green'],
            data: this.$store.getters.toysInStockByType,
          },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["baby", "funny"],
      };
    },
    storeToysAvgByType(){
      return this.$store.getters.toysCountByType;
    },
    storeToysInStockByType(){
      return this.$store.getters.toysInStockByType;
    }
  },
  created() {
    this.$store.dispatch({type:'loadAllToys', showLoading:true})  },
  components: {
    doughnut,
  },
};
</script>


<style>
.dashbord{
  height:100px;
}
</style>



