<template>
    <div class="groupBody">
        <slot></slot>
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
