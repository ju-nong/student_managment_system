<template>
    <h1>연합을 한눈에 봐요</h1>
    <div class="wrap union-list-container" v-if="unions !== null">
        <div v-for="(union, uIdx) in unions" class="union" :key="uIdx">
            <div>
                <router-link :to="`/view/${uIdx}`">
                    <h2>{{ union.name }}</h2>
                    <h4>🚩{{ union.address }}</h4>

                    <p>👨‍⚖️ {{ union.leader }}</p>
                    <p>
                        <span
                            v-for="(commander, cIdx) in union.commander"
                            :key="cIdx"
                            >👨‍💼{{ commander }}</span
                        >
                    </p>
                </router-link>
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
.union-list-container {
    display: flex;
    padding: 10px;
    gap: 20px 2%;
    flex-wrap: wrap;
    > div {
        width: 32%;
        position: relative;
        min-height: 200px;

        > div {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            cursor: pointer;
            text-align: left;
            padding: 15px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
                rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
            transition: all 0.3s;
        }
        > div:hover {
            transform: translateY(-10px);
        }
        h4 {
            padding: 10px 0px;
            color: RGB(149, 151, 157);
        }
        span {
            margin-left: 5%;
            display: block;
        }
    }
}
</style>
