<template>
    <BaseModal
        v-if="modal.getTarget == `target`"
        @complete="complete()"
        @reset="reset()"
    >
        <div class="content-container">
            <h1>{{ modal.getContent }}</h1>
            <div class="groupForm">
                <label for="grade">
                    학년
                    <select id="grade" v-model="gradeValue">
                        <option
                            v-for="(value, index) in grade"
                            :key="index"
                            :value="value"
                        >
                            {{ value }}
                        </option>
                    </select>
                </label>
                <label for="class">
                    반
                    <select id="class" v-model="classValue">
                        <option
                            v-for="(value, index) in _class"
                            :key="index"
                            :value="value"
                        >
                            {{ value }}
                        </option>
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
    name: "ModalTarget",
    components: {
        BaseModal,
    },
    setup() {
        const modal = useModalStore();
        const spoil = useSpoilStore();

        const grade = [1, 2, 3];
        const _class = [1, 2, 3, 4, 5, 6];

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

        return {
            modal,
            grade,
            _class,
            gradeValue,
            classValue,
            complete,
            reset,
        };
    },
};
</script>

<style></style>
