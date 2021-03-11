
<template>
    <section class="toy-preview">
        <div style="padding-right:5px">{{toy.name}}</div>
        <div style="padding-right:5px">{{toy.price}}</div>
        <div v-if="toy.inStock">Is in stock!</div>
        <div v-else>Out of stock!</div>
    </section>
</template>

<script>
export default {
props:['toy'],
}
</script>


