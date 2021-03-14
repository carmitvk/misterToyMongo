

<template>
   <section v-if="toyToEdit" class="toy-edit app-main">
        <h3>{{title}}</h3>
        <form @submit.prevent="save">
            <input type="text" placeholder="Toy name" v-model="toyToEdit.name">
            <input type="text" placeholder="price" v-model="toyToEdit.price">
            Toy type:<el-select v-model="toyToEdit.toyType" placeholder="Select">
                    <el-option label="Funny" value="funny" ></el-option>
                    <el-option label="Baby" value="baby"></el-option>
            </el-select>
            In Stock?<input type="checkbox" id="inStock" v-model="toyToEdit.inStock">

            <img class="picture" v-if="imgUrl" :src="toyToEdit.imgUrl" alt="image"/>
            <label v-if="!isLoading" for="imgUploader" >
                <img class="upload" src="../assets/img/drag-icon.png" alt="">
            </label>
            <img class="loading" v-else src="../assets/img/loading-gif.gif" alt="">
            <input class="input-file" type="file" id="imgUploader" @change="onUploadImg" />

            <button>Save</button>
            <button @click="goBack">Cancel</button>
        </form>
    </section> 
</template>

<script>
import {toyService} from '../services/toy.service.js'
import { showMsg } from '../services/eventBus.service.js'
import { uploadImg } from "../services/img-upload.service.js";

export default {
   data() {
        return {
            toyToEdit: null,
            isLoading: false
        }
    },
    methods: {
        save() {
            this.$store.dispatch({ type: 'saveToy', toy:this.toyToEdit })
            .then(() => {
                showMsg('toy was saved successfully');
                this.$router.push('/toys')//CR
                
            })
            .catch(err => {
                showMsg('Cannot save toy', 'danger')
            })

            // this.$router.push('/')CR
               
        },
        goBack(){
            this.$router.push('/toys')
        },
        async onUploadImg(ev) {
            this.isLoading = true
            const res = await uploadImg(ev)
            this.toyToEdit.imgUrl = res.url
            // this.$emit('save', res.url)
            console.log('onUploadImg -> res', res)
            this.isLoading = false
        },
    },
    computed: {
        imgUrl(){
            return this.toyToEdit.imgUrl
        },
        title() {
            return this.toyId ? 'Toy Edit' : 'Toy Add'
        },
        toyId() {
            return this.$route.params.toyId
        }
    },
    created() {
        if (this.toyId) {//edit
            toyService.getById(this.toyId)
            .then((data)=>{
                // showMsg('getById processed successfully')
                var origToy =data;
                this.toyToEdit = JSON.parse(JSON.stringify(origToy)); //copy
            })
            .catch(err => {
                showMsg('Cannot get current id to edit', 'danger')
            })

        } else {
            this.toyToEdit = toyService.getEmptyToy();
            
        }
    },
   components: {
  }, 
}
</script>

