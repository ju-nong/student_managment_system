<template>
    <div class="groupBody" v-if="child.length !== 0">
        <GroupView :child="child" :pNames="''"></GroupView>
    </div>
</template>

<script>
import { GroupView } from "@views";
export default {
    props: { child: Array },
    components: { GroupView },
};
</script>

<style></style>
