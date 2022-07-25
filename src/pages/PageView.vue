<template>
    <h1>연합을 한눈에 봐요</h1>
    <div class="dashboard">
        <div class="wrap">
            <div v-if="unions !== null">
                <div v-for="(union, uIdx) in unions" class="union" :key="uIdx">
                    <h1>📢{{ union.name }}</h1>
                    <h1>🚩{{ union.address }}</h1>
                    <p>👨‍⚖️ : {{ union.leader }}</p>
                    <p>
                        👨‍💼 :
                        <span
                            v-for="(commander, cIdx) in union.commander"
                            :key="cIdx"
                            >{{ commander }}</span
                        >
                    </p>
                    <p>
                        💂‍♂️ :
                        <span
                            v-for="(staff, sIdx) in union.staff"
                            :key="sIdx"
                            >{{ staff }}</span
                        >
                    </p>
                    <div class="showCal">
                        👨‍👦‍👦
                        <GroupBody :child="union.group" />
                    </div>
                    <div class="showSpo">
                        🔫
                        <ViewSpoli :child="union.spoil" />
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";

import GroupBody from "@components/GroupBody";
import ViewSpoli from "@views/ViewSpoil";

export default {
    name: "PageView",
    components: { GroupBody, ViewSpoli },
    setup() {
        const getObj = JSON.parse(localStorage.getItem("unions"));
        const unions = ref();

        onMounted(() => {
            unions.value = getObj;
        });

        return { unions };
    },
};
</script>

<style lang="scss">
.dashboard {
    .btn {
        display: none;
    }
    .showCal {
        margin: 30px 0px;
    }
    .showSpo {
        margin-top: 30px;
    }
}
</style>
