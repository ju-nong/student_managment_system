<template>
    <div class="form">
        <h2>연합 정보 영역</h2>
        <input
            type="text"
            placeholder="연합 이름을 입력해주세요."
            v-model="name"
        />
        <input
            type="text"
            placeholder="연합 주소를 입력해주세요."
            v-model="address"
        />
    </div>
</template>

<script>
import { ref, watch } from "vue";

import { useInfoStore } from "@store/info";

export default {
    setup() {
        const name = ref("");
        const address = ref("");
        const info = useInfoStore();

        watch(name, (n, o) => {
            info.setName(n);
        });

        watch(address, (n, o) => {
            info.setAddress(n);
        });

        return { name, address };
    },
};
</script>

<style></style>
