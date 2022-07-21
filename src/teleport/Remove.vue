<template>
    <BaseModal
        :name="groupName"
        @complete="complete()"
        @reset="reset()"
        v-if="
            modal.getTarget == `removeCalendar` ||
            modal.getTarget == `removeSpoil`
        "
    >
        <div class="content-container">
            <h1>{{ modal.getContent }}</h1>
            <p>정말로 삭제하시겠습니까?</p>
        </div>
    </BaseModal>
</template>

<script>
import { ref } from "vue";
import { useModalStore, useCalendarStore, useSpoilStore } from "@store";
import { BaseModal } from "@teleport";

export default {
    components: { BaseModal },
    setup() {
        const modal = useModalStore();
        const calendar = useCalendarStore();
        const spoil = useSpoilStore();

        const complete = () => {
            if (modal.getTarget == "removeCalendar") calendar.remove();
            else spoil.remove();

            reset();
        };

        const reset = () => {
            modal.hide();
        };

        return { modal, complete, reset };
    },
};
</script>

<style lang="scss" scoped></style>
