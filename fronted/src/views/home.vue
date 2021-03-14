<template>
  <div class="home">
    <div class="home-container">
        <div class="txt">Wellcome to toys application</div>
    </div>


    <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        Hello {{ loggedInUser.fullname }}
      </router-link>
      <!-- <span>{{ loggedInUser.score }}</span> -->
    </section>



    <!-- <div class="item-box"></div> -->
    <div class="item-sale-box"></div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <img class="logo" alt="logo of toy" src="../assets/img/logo.png">
  </div>
</template>



<script>
export default {
  name: 'home',
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    }
  },
};
</script>
