

<template>
<!-- <ul class="toy-list"> 
    <li v-for="toy in toys" :key="toy._id" class="toy-list-container"> 
        <toy-preview :toy="toy" />
        <div class="actions-container">
                <button class="btn" @click="remove(toy._id)">X</button> 
                <button class="btn"><router-link :to="'/toy/'+toy._id">Details</router-link></button>
                <button class="btn"><router-link :to="'/toy/edit/'+toy._id">Edit</router-link></button>
        </div>
    </li>
</ul> -->



    <el-row class="toy-list">
        <el-col :span="3" v-for="toy in toys" :key="toy._id" :offset="4">
        <!-- <el-col :span="3" v-for="(toy, index) in toys" :key="toy._id" :offset="index > 0 ? 6 : 0"> -->
            <el-card class="card-container" shadow="hover" >
                <!-- <img v-if="require('../assets/img/' + toy.name +'.jpg')" :src="require('../assets/img/' + toy.name +'.jpg')" class="image"> -->
                <div style="padding: 14px;">
                    <toy-preview :toy="toy" />
                    <div class="bottom clearfix">
                        <!-- <el-button type="text" class="button btn" @click="remove(toy._id)">X</el-button> -->

                        <el-popconfirm
                            confirm-button-text='OK'
                            cancel-button-text='No, Thanks'
                            icon="el-icon-info"
                            icon-color="red"
                            title="Are you sure to delete this?"
                            >
                            <el-button slot="reference" @click="remove(toy._id)">Delete</el-button>
                        </el-popconfirm>

                        <button class="btn"><router-link :to="'/toy/'+toy._id">Details</router-link></button>
                        <button class="btn"><router-link :to="'/toy/edit/'+toy._id">Edit</router-link></button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>


              
</template>

<script>
import toyPreview from './toyPreview'

export default {
    props: ['toys'],
    methods: {
        remove(toyId) {
            this.$emit('remove', toyId)
        },
    },
    components:{
        toyPreview
    }
}
</script>
