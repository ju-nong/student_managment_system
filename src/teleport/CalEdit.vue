<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ content }} 일정 수정</h2>
            <div class="groupForm">
                <input
                    type="date"
                    v-model="dateValue"
                    min="2022-01-01"
                    max="2022-12-31"
                />
                <input
                    type="text"
                    v-model="txtCalName"
                    @keyup.enter="edit"
                    placeholder="일정 제목을 입력해주세요"
                />
            </div>
        </div>
        <div class="buttons-container">
            <span>
                <button class="btn confirm" @click="edit">수정</button>
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { ref } from "vue";
export default {
    name: "ModalCalAdd",
    components: {
        ModalBase,
    },
    props: {
        content: String,
        date: String,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);
        const dateValue = ref(props.date);
        const txtCalName = ref(props.content);
        console.log(props.date);
        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };
        const edit = () => {
            resolvePromise.value({
                date: dateValue.value,
                name: txtCalName.value,
            });
            baseAction();
        };
        const cancel = () => {
            resolvePromise.value(null);
            baseAction();
        };
        const baseAction = () => {
            baseModal.value.close();
            dateValue.value = "2022-06-30";
            txtCalName.value = "";
        };
        return {
            baseModal,
            show,
            edit,
            cancel,
            dateValue,
            txtCalName,
        };
    },
};
</script>
