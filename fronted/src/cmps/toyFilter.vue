<template>
  <section class="toy-filter">
    <form>
      <label> Search a toy: </label>
      <input ref="txtInput" type="text" @input="debounce" placeholder="Search...." v-model="filterBy.name"/>
      <label> inStock: </label>
      <input type="checkbox" v-model="filterBy.inStock" @change="setFilter" />

      <el-select v-model="filterBy.toyType" @change="setFilter" multiple placeholder="Toy type">
      <!-- <el-select v-model="filterBy.toyType" @change="setFilter" multiple default-first-option placeholder="Toy type"> -->
            <el-option label="All" value="all" ></el-option>
            <el-option label="Funny" value="funny" ></el-option>
            <el-option label="Baby" value="baby" ></el-option>
      </el-select>

      <!-- <select name="toyType" @change="setFilter" v-model="filterBy.toyType">
        <option value="all">All</option>
        <option value="funny">Funny</option>
        <option value="baby">Baby</option>
      </select> -->

      <el-select v-model="filterBy.sortBy" @change="setFilter" placeholder="Select">
            <el-option label="Name" value="name" ></el-option>
            <el-option label="Price" value="price"></el-option>
      </el-select>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: { ...this.$store.getters.filterBy },
      timerId: null,
    };
  },
  methods: {
    setFilter() {
      console.log("in setFilter");
      this.$store.dispatch({
        type: "setFilter",
        filterBy: JSON.stringify(this.filterBy),
      });
    },
    debounce() {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.setFilter();
      }, 500);
    },
  },
  mounted() {
    this.$refs.txtInput.focus();
  },
};
</script>



