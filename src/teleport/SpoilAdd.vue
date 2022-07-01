<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ spoilOption.content }}</h2>
            <div
                class="groupForm"
                v-if="spoilOption.type == 'add' || spoilOption.type == 'edit'"
            >
                <label for="grade">
                    학년
                    <select id="grade" v-model="spoilOption.grade">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label for="class">
                    반
                    <select id="class" v-model="spoilOption.class">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
            </div>
            <div v-else>정말로 삭제하시겠습니까?</div>
        </div>
        <div class="buttons-container">
            <span>
                <button
                    v-if="
                        spoilOption.type == 'add' || spoilOption.type == 'edit'
                    "
                    class="btn confirm"
                    @click="update"
                >
                    {{ spoilOption.type == "add" ? "추가" : "수정" }}
                </button>
                <button v-else class="btn confirm" @click="remove">삭제</button>
                <!-- <button class="btn confirm" @click="update">
                    {{ actionType.value == "add" ? "추가" : "생성" }}
                </button> -->
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { reactive, ref } from "vue";

export default {
    name: "ModalSpoilAdd",
    components: {
        ModalBase,
    },

    props: {
        option: Object,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);

        const spoilOption = reactive(props.option);

        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };

        const update = () => {
            resolvePromise.value({
                grade: spoilOption.grade,
                class: spoilOption.class,
            });
            baseAction();
        };
        const remove = () => {
            resolvePromise.value(true);
            baseAction();
        };

        const cancel = () => {
            resolvePromise.value(null);
            baseAction();
        };

        const baseAction = () => {
            baseModal.value.close();
        };
        return {
            baseModal,
            show,
            update,
            remove,
            cancel,
            spoilOption,
        };
    },
};
</script>

<style lang="scss"></style>
