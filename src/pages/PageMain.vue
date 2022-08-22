<template>
    <h1>학생 관리 시스템</h1>
    <button @click="print" class="storage-btn print-btn">PRINT</button>
    <button @click="clear" class="storage-btn delete-btn">DELETE</button>
    <table v-if="state.unions.length != []" class="storage-table" border="1">
        <tr>
            <th>연합명</th>
            <th>주소</th>
        </tr>
        <tr v-for="(union, uIdx) in state.unions" :key="uIdx">
            <td>{{ union.name }}</td>
            <td>{{ union.address }}</td>
        </tr>
    </table>
</template>

<script>
import { reactive } from "vue";
export default {
    name: "PageMain",
    setup() {
        const state = reactive({
            unions: [],
        });

        const print = () => {
            let unions = JSON.parse(localStorage.getItem("unions"));
            state.unions = [];

            for (let i = 0; i < unions.length; i++) {
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

<style>
.storage-btn {
    font-size: 16px;
    padding: 10px 7px;
    transition: all 0.3s;
    border-radius: 5px;
    margin: 10px;
    background-color: #fff;
    font-weight: bold;
}
.print-btn {
    color: RGB(45, 78, 245);
    border: 3px solid RGB(45, 78, 245);
}
.print-btn:hover {
    background-color: RGB(45, 78, 245);
    color: #fff;
}
.delete-btn {
    color: RGB(226, 76, 76);
    border: 3px solid RGB(226, 76, 76);
}
.delete-btn:hover {
    background-color: RGB(226, 76, 76);
    color: #fff;
}

.storage-table {
    margin: 0 auto;
    margin-top: 50px;
    text-align: left;
}
</style>
