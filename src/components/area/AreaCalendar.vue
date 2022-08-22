<template>
    <div class="form">
        <h2>일정 영역</h2>
        <div class="groupHeader">
            <button @click="rootGroupAdd">그룹 추가</button>
        </div>

        <GroupBody :child="calendar.getAll" />
        <teleport to="body">
            <ModalGroup />
            <ModalCalendar />
            <ModalRemove />
        </teleport>
    </div>
</template>

<script>
import { useModalStore, useCalendarStore } from "@store";

import { ModalGroup, ModalCalendar, ModalRemove } from "@teleport";
import GroupBody from "@components/GroupBody";

export default {
    components: { ModalGroup, ModalCalendar, ModalRemove, GroupBody },
    setup() {
        const modal = useModalStore();
        const calendar = useCalendarStore();

        const rootGroupAdd = () => {
            modal.set("add", "group", "그룹 추가");
            calendar.set(calendar.getAll);
        };

        return { modal, calendar, rootGroupAdd };
    },
};
</script>

<style></style>
