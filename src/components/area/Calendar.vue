<template>
    <div class="form">
        <h2>일정 영역</h2>
        <div class="groupHeader">
            <button @click="rootGroupAdd">그룹 추가</button>
        </div>
        <div class="groupBody">
            <!-- <GroupView
                :parentGroup="state.group"
                :childGroup="state.group"
                :parentNames="''"
                @showGroupModal="showGroupModal"
                @showCalModal="showCalModal"
            ></GroupView> -->
        </div>
        <teleport to="body" disabled></teleport>
    </div>
</template>

<script>
import { useModalStore } from "@store";

export default {
    setup() {
        const modal = useModalStore();

        const rootGroupAdd = () => {};

        return { rootGroupAdd };
    },
};
</script>

<style></style>
