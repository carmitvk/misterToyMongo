<template>
  <div class="app-container">

    <app-header/>
    <router-view/>
  </div>
</template>


<script>

import appHeader from './cmps/appHeader' 
export default{

  created(){
    this.$store.dispatch({type:'loadToys', showLoading:true})
    // this.$store.dispatch({type:'loadAllToys', showLoading:true})
  },
  components:{
    appHeader
  },
}
</script>


