<template>
    <h1>학생 관리 시스템</h1>
    <button @click="print">로컬스토리지 출력</button>
    <button @click="clear">로컬스토리지 삭제</button>
    <ul v-for="(union, uIdx) in state.unions" :key="uIdx">
        <li>{{ union.name }}</li>
        <li>{{ union.address }}</li>
    </ul>
</template>

<script>
// import { useMemberStore } from "../store/member";
import { reactive } from "vue";
export default {
    name: "MainPage",
    components: {},
    setup() {
        const state = reactive({
            unions: [],
        });

        const print = () => {
            let unions = JSON.parse(localStorage.getItem("unions"));
            state.unions = [];

            for (let i = 0; i < unions.length; i++) {
                //result += `${i + 1}번째 ${JSON.stringify(unions[i])}<br>`;
                state.unions.push(unions[i]);
            }
            console.log(state.unions);
        };
        const clear = () => {
            localStorage.clear();

            console.log(localStorage);
        };

        return { print, clear, state };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
