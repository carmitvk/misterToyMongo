
<template>
    <section class="review-preview">
        <div >Review:{{review.txt}}</div>
        <div >Rate:{{review.rate}}</div>
        <div >Reviewer:{{review.creatorFullName}}</div>
        <div >From date:{{review.createdAt}}</div>
    </section>
</template>

<script>
export default {
props:['review'],
}
</script>


