
<script>
import { Doughnut } from 'vue-chartjs'
// npm install vue-chartjs chart.js --save

// import VueCharts from "vue-chartjs";
// import { Bar, Line, Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
