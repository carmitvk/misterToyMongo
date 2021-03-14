

<template>
      <section  class="app">
      <div v-if="isToysLoading" class="loading">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <span >Loading...</span>
          <!-- <img src="../assets/img/loading.gif"> -->
      </div>
      <div v-else>
      <!-- <div else="!isToysLoading"> -->
          <h1>Toy application:</h1> 
          <button><router-link :to="'/toy/edit/'">Add New Toy</router-link></button>
          <toy-filter/>
          <toy-list :toys="toys" @remove="removeToy" />  

<!-- <el-row>
  <el-col :span="8" v-for="(toy, index) in toys" :key="toy._id" :offset="index > 0 ? toys : 0">
    <el-card :body-style="{ padding: '0px' }" shadow="hover" >
      <img src="@/assets/img/`${name}`.png" class="image">
      <div style="padding: 14px;">
            <div style="padding:5px">{{toy.name}}</div>
            <div>{{toy.price}}</div>
            <div v-if="toy.isStock='true'">
                In stock!
            </div>
            <div class="bottom clearfix">
                <el-button type="text" class="button">Operating</el-button>
            </div>
      </div>
    </el-card>
  </el-col>
</el-row> -->


      </div>
      <div class="page-container">
          <button @click="prevPage">Prev</button>
          <span>{{pageIndex}}</span>
          <button @click="nextPage">Next</button>
      </div>
      <!-- <section class="page-container">
            <button @click="prevPage"><i class="fas fa-angle-left"></i></button>
            <button @click="nextPage"><i class="fas fa-angle-right"></i></button>
      </section> -->

      </section>
</template>

<script>
import toyFilter from '../cmps/toyFilter'
import toyList from '../cmps/toyList'
import { showMsg } from '../services/eventBus.service.js'

export default {
  name: 'app',
  computed: {
       toys(){
            return this.$store.getters.toys  
        },
        isToysLoading(){
            return this.$store.getters.loading
        },
        pageIndex(){
            return this.$store.getters.pageIdx
        },
    },
    methods: {
        removeToy(toyId){
            this.$store.dispatch({ type: 'removeToy', toyId })
            .then(() => {
                showMsg('toy removed successfully')
            })
            .catch(err => {
                showMsg('Cannot remove toy', 'danger')
            })
        },

        prevPage(){
            this.$store.dispatch({ type: 'setPageIndex', pageDiff:-1 });
        },

        nextPage(){
            this.$store.dispatch({ type: 'setPageIndex', pageDiff:1 }); 
        }
    },
    components: {
        toyFilter,
        toyList,
    }
}
</script>