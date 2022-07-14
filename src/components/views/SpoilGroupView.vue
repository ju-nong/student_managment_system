<template>
    <ul class="inGroup">
        <li v-for="(group, index) in childGroup" :key="index">
            <div class="menu">
                <span v-for="(name, nIndex) in parentNames" :key="nIndex">
                    {{ name }} /
                </span>
                <span class="title">
                    {{ group.name }}
                </span>
                <button
                    @click="
                        $emit('showGroupModal', {
                            type: 'add',
                            target: group,
                            group: true,
                        })
                    "
                >
                    그룹 추가
                </button>
                <button
                    @click="
                        $emit('showGroupModal', {
                            type: 'edit',
                            target: group,
                            group: true,
                        })
                    "
                >
                    수정
                </button>
                <button
                    @click="
                        $emit('showGroupModal', {
                            type: 'delete',
                            target: parentGroup,
                            index: index,
                            group: true,
                        })
                    "
                >
                    삭제
                </button>
            </div>

            <SpoilGroupView
                v-if="group.group.length > 0"
                :parentGroup="group"
                :childGroup="group.group"
                v-bind:parentNames="[...parentNames, group.name]"
                @showGroupModal="$emit('showGroupModal', $event)"
            />
        </li>
    </ul>
</template>

<script>
import { reactive, ref } from "vue";
export default {
    name: "SpoilGroupView",
    props: { parentGroup: Array, childGroup: Array, parentNames: Array },
    emits: ["showGroupModal"],
    setup(props, { emit }) {},
};
</script>

<style lang="scss" scoped>
.inGroup {
    display: flex;
    flex-direction: column;
    margin: 0 0 15px 30px;
    > li {
        font-size: 22px;
        .menu {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .title {
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
}
</style>
