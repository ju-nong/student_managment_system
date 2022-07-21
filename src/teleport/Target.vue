<template>
    <BaseModal
        @complete="complete()"
        @reset="reset()"
        v-if="modal.getTarget == `target`"
    >
        <div class="content-container">
            <h1>{{ modal.getContent }}</h1>
            <div class="groupForm">
                <label for="grade">
                    학년
                    <select id="grade" v-model="gradeValue">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label for="class">
                    반
                    <select id="class" v-model="classValue">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
            </div>
        </div>
    </BaseModal>
</template>

<script>
import { ref } from "vue";
import { useModalStore, useSpoilStore } from "@store";
import { BaseModal } from "@teleport";
export default {
    components: {
        BaseModal,
    },
    setup() {
        const modal = useModalStore();
        const spoil = useSpoilStore();

        const gradeValue = ref("1");
        const classValue = ref("1");

        const complete = () => {
            if (modal.getType == "add") {
                spoil.addTarget(gradeValue.value, classValue.value);
            } else if (modal.getType == "edit") {
                spoil.editTarget(gradeValue.value, classValue.value);
            }
            reset();
        };

        const reset = () => {
            gradeValue.value = "1";
            classValue.value = "1";
            modal.hide();
        };

        return { modal, gradeValue, classValue, complete, reset };
    },
};
</script>

<style></style>
