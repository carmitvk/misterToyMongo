<template>
	<GmapMap
    ref="gMap"
		:center="pos"
		:zoom="11"
		map-type-id="terrain"
		style="width: 500px; height: 300px"
	>
		<GmapMarker
			v-for="(m, index) in markers"
			:key="index"
			:position="m.position"
			:clickable="true"
			:draggable="true"
			@click="markerClicked(m.position)"
		/>
			<!-- @click="center = m.position" -->
	</GmapMap>
</template>

<script>
export default {
	props: {
		pos: {
			type: Object
		},
	},
	data() {
		return {
			markers: [
				{ position: { lat: 32.109333, lng: 34.855499 } },
				{ position: { lat: 31.66926, lng: 34.57149 } },
				{ position: { lat: 31.771959, lng: 35.217018 } }
			]
		}
	},
  methods:{
    markerClicked(pos){
      console.log(pos);
      this.$refs.gMap.panTo(pos);
    }
  }
}
</script>
