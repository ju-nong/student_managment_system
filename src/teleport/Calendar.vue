<template>
    <BaseModal
        @complete="complete()"
        @reset="reset()"
        v-if="modal.getTarget == 'calendar'"
    >
        <div class="content-container">
            <h2>{{ modal.getContent }}</h2>
            <div class="groupForm">
                <input
                    type="date"
                    v-model="dateValue"
                    min="2022-01-01"
                    max="2022-12-31"
                />
                <input
                    type="text"
                    placeholder="일정을 입력해주세요"
                    v-model="calendarName"
                />
            </div>
        </div>
    </BaseModal>
</template>

<script>
import { ref } from "vue";
import { useModalStore, useCalendarStore } from "@store";
import { BaseModal } from "@teleport";

export default {
    components: { BaseModal },
    setup() {
        const modal = useModalStore();
        const calendar = useCalendarStore();

        const calendarName = ref("");
        const dateValue = ref("2022-07-15");

        const complete = () => {
            if (modal.getType == "add") {
                calendar.addCalendar(calendarName.value, dateValue.value);
            } else {
                calendar.edit(calendarName.value, dateValue.value);
            }
            reset();
        };

        const reset = () => {
            dateValue.value = "2022-07-15";
            calendarName.value = "";
            modal.hide();
        };

        return { modal, dateValue, calendarName, complete, reset };
    },
};
</script>

<style lang="scss" scoped></style>
