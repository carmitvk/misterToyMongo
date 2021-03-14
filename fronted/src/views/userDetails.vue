<template>
    <section v-if="user">
        <h1>User Details - {{user.username}}</h1>
        <pre>{{user}}</pre>
    </section>
</template>

<script>
import {userService} from '../services/user.service';

export default {
    data() {
        return {
            user: null
        }
    },
    async created() {
        const id = this.$route.params.id;
        const user = await userService.getById(id);
        this.user = user
    }
}
</script>