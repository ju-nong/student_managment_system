<template>
    <ul class="spoil">
        <li v-for="(spoil, sIndex) in childSpoil" :key="sIndex">
            <div class="menu">
                <p class="title">{{ spoil.grade }}학년 {{ spoil.class }}반</p>
                <button
                    @click="
                        $emit('showSpoilModal', { type: 'add', target: spoil })
                    "
                >
                    타겟 추가
                </button>
                <button
                    @click="
                        $emit('showGroupModal', {
                            type: 'add',
                            target: spoil,
                            spoil: true,
                        })
                    "
                >
                    그룹 추가
                </button>
                <button
                    @click="
                        $emit('showSpoilModal', { type: 'edit', target: spoil })
                    "
                >
                    수정
                </button>
                <button
                    @click="
                        $emit('showSpoilModal', {
                            type: 'delete',
                            target: childSpoil,
                            index: sIndex,
                        })
                    "
                >
                    삭제
                </button>
            </div>
            <SpoilGroupView
                :parentGroup="spoil"
                :childGroup="spoil.group"
                :parentNames="''"
                @showGroupModal="$emit('showGroupModal', $event)"
            />
            <SpoilView
                :parentSpoil="spoil"
                :childSpoil="spoil.subTarget"
                @showSpoilModal="$emit('showSpoilModal', $event)"
                @showGroupModal="$emit('showGroupModal', $event)"
            />
        </li>
    </ul>
</template>

<script>
import { reactive, ref } from "vue";
import SpoilGroupView from "./SpoilGroupView.vue";
export default {
    name: "SpoilView",
    props: { parentSpoil: Array, childSpoil: Array },
    emits: ["showSpoilModal", "showGroupModal"],
    components: { SpoilGroupView },
    setup(props, { emit }) {},
};
</script>

<style lang="scss" scoped>
.spoil {
    margin: 0 0 30px 30px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .menu {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .title {
            font-size: 32px;
            font-weight: bold;
            display: inline-block;
            padding-right: 30px;
        }
        button {
            padding: 5px 3px;
            margin-right: 10px;
            border-radius: 10px;
            font-size: 16px;
            background-color: transparent;
        }
        button:hover {
            border-color: transparent;
            background-color: #000;
            color: #fff;
        }
    }
}
</style>
