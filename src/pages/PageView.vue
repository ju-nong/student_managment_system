<template>
    <h1>연합을 한눈에 봐요</h1>
    <div class="dashboard">
        <div class="wrap">
            <div v-if="union !== null">
                <div>
                    <div class="info">
                        <h1>📢{{ union.name }}</h1>
                        <h3>🚩{{ union.address }}</h3>
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
                    </div>
                    <div class="showCal">
                        <GroupBody :child="union.group"
                            ><div class="section-title">👨‍👦‍👦</div></GroupBody
                        >
                    </div>
                    <div class="showSpo">
                        <div class="section-title">🔫</div>
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
import { useRoute } from "vue-router";

import GroupBody from "@components/GroupBody";
import ViewSpoli from "@views/ViewSpoil";

export default {
    name: "PageView",
    components: { GroupBody, ViewSpoli },
    setup() {
        const getObj = JSON.parse(localStorage.getItem("unions"));
        const union = ref({});

        onMounted(() => {
            const route = useRoute();
            const unionId = route.params.id;

            union.value = Object.assign(union.value, getObj[unionId]);
            console.log(union.value);
        });

        return { union };
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
        padding: 32px;
    }

    .section-title {
        text-align: left;
        font-size: 32px;
        padding-bottom: 20px;
    }

    .info {
        text-align: left;
        padding: 15px;
        h3 {
            padding: 20px;
        }
        p {
            padding: 5px 0px;
        }
        p:nth-child(3) {
            padding-left: 20px;
        }
        p:nth-child(4) {
            padding-left: 40px;
        }
        p:nth-child(5) {
            padding-left: 60px;
        }
    }
}
</style>
