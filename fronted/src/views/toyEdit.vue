

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
            <button>Save</button>
            <button @click="goBack">Cancel</button>
        </form>
    </section> 
</template>

<script>
import {toyService} from '../services/toy.service.js'
import { showMsg } from '../services/eventBus.service.js'

export default {
   data() {
        return {
            toyToEdit: null
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
        }
    },
    computed: {
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
    }
}
</script>

