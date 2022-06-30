<template>
    <ul class="spoil">
        <li v-for="(spoil, sIndex) in childSpoil" :key="sIndex">
            <p>{{ spoil.grade }}학년 {{ spoil.class }}반</p>
            <SpoilView :parentSpoil="spoil" :childSpoil="spoil.subTarget" />
        </li>
    </ul>
</template>

<script>
import { reactive, ref } from "vue";
export default {
    name: "SpoilView",
    props: { parentSpoil: Array, childSpoil: Array },
    emits: ["showSpoilModal"],
    setup(props, { emit }) {},
};
</script>

<style></style>
