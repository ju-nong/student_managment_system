<template>
    <div class="groupBody" v-if="child.length !== 0">
        <ViewGroup :child="child" :parent-names="''" />
    </div>
</template>

<script>
import { ViewGroup } from "@views";
export default {
    props: { child: Array },
    components: { ViewGroup },
};
</script>

<style></style>
