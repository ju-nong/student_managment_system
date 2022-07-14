<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>
                {{ state.content }}
                {{ state.type == "add" ? "추가" : state.type == "edit" }}
            </h2>
            <div class="groupForm">
                <input
                    type="text"
                    v-model="state.groupName"
                    @keyup.enter="update"
                    placeholder="그룹 이름을 입력해주세요"
                />
            </div>
        </div>
        <div class="buttons-container">
            <span>
                <button
                    v-if="type == 'add' || type == 'edit'"
                    :class="`btn ${type}`"
                    @click="update"
                >
                    {{ printType }}
                </button>
                <button v-else class="btn delete" @click="remove">삭제</button>
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { reactive, ref } from "vue";

export default {
    name: "GroupModal",
    components: {
        ModalBase,
    },

    props: {
        attr: Object,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);

        const state = reactive(props.attr);
        // const type = reactive(`${state.type}`);
        // const printType = reactive(type == "add" ? "추가" : "수정");

        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };

        const update = () => {
            resolvePromise.value(state.groupName);
            baseModal.value.close();
        };

        const remove = () => {
            resolvePromise.value(true);
            baseModal.value.close();
        };

        const cancel = () => {
            resolvePromise.value(null);
            baseModal.value.close();
        };
        return {
            baseModal,
            state,
            show,
            update,
            remove,
            cancel,
        };
    },
};
</script>

<style lang="scss"></style>
