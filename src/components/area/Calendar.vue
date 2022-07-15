<template>
    <div class="form">
        <h2>일정 영역</h2>
        <div class="groupHeader">
            <button @click="rootGroupAdd">그룹 추가</button>
        </div>
        <div class="groupBody">
            <GroupView :child="calendar.getAll" :pNames="''"></GroupView>
        </div>
        <teleport to="body">
            <GroupModal />
            <CalendarModal />
            <RemoveModal />
        </teleport>
    </div>
</template>

<script>
import { useModalStore, useCalendarStore } from "@store";

import { GroupModal, CalendarModal, RemoveModal } from "@teleport";
import { GroupView } from "@views";

export default {
    components: { GroupModal, CalendarModal, GroupView, RemoveModal },
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
