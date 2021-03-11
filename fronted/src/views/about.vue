<template>
  <div class="about">
    Branches:
    <google-maps :pos="pos"/>
    <button @click="setPos('tel-aviv')">Tel-Aviv</button>
    <button @click="setPos('jerusalem')">Jerusalem</button>
    <button @click="setPos('ashkelon')">Ashkelon</button>
  </div>
</template>

<script>
import googleMaps from "@/cmps/googleMaps";

export default {
  name: 'about',
  data() {
    return {
      pos: {lat:32.109333, lng:34.855499}
    }
  },
  methods: {
    setPos(name) {
      if (name === 'tel-aviv') this.pos = {lat:32.109333, lng:34.855499} 
      if (name === 'ashkelon') this.pos = {lat:31.66926 , lng:34.57149}
      if (name === 'jerusalem') this.pos = {lat:31.771959, lng:35.217018}
}

  },
  components: {
    googleMaps,
  },
}
</script>