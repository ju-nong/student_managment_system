<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ content }}</h2>
            <div class="groupForm">
                <label for="grade">
                    학년
                    <select v-model="txtGrade" id="grade">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label for="class">
                    반
                    <select v-model="txtClass" id="class">
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
        <div class="buttons-container">
            <span>
                <button class="btn confirm" @click="add">추가</button>
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { ref } from "vue";

export default {
    name: "ModalSpoilAdd",
    components: {
        ModalBase,
    },

    props: {
        content: String,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);
        const txtGrade = ref("1");
        const txtClass = ref("1");

        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };

        const add = () => {
            resolvePromise.value({
                grade: txtGrade.value,
                class: txtClass.value,
            });
            baseAction();
        };

        const cancel = () => {
            resolvePromise.value(null);
            baseAction();
        };

        const baseAction = () => {
            baseModal.value.close();
            txtGrade.value = "1";
            txtClass.value = "1";
        };
        return {
            baseModal,
            show,
            add,
            cancel,
            txtGrade,
            txtClass,
        };
    },
};
</script>

<style lang="scss"></style>
