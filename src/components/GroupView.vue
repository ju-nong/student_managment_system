<template>
    <ul class="group">
        <li v-for="(group, index) in childGroup" :key="index">
            <div class="groupInline">
                <div class="groupTxtBox">
                    <span v-for="(pName, pIndex) in parentNames" :key="pIndex">
                        {{ pName }} /
                    </span>
                    {{ group.name }}
                </div>
                <div class="groupBtnBox">
                    <button
                        @click="
                            $emit('showCalModal', {
                                type: 'add',
                                target: group,
                            })
                        "
                    >
                        일정
                    </button>
                    <button
                        @click="
                            $emit('showGroupModal', {
                                type: 'add',
                                target: group,
                            })
                        "
                    >
                        생성
                    </button>
                    <button
                        @click="
                            $emit('showGroupModal', {
                                type: 'edit',
                                target: parentGroup,
                                index: index,
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
                            })
                        "
                    >
                        삭제
                    </button>
                </div>
            </div>
            <ul class="group">
                <li
                    v-for="(cal, cIndex) in group.cal"
                    :key="cIndex"
                    class="calList"
                >
                    <div class="groupInline">
                        <div class="groupTxtBox">
                            {{ cal.name }} / {{ cal.date }}
                        </div>
                        <div class="groupBtnBox">
                            <button
                                @click="
                                    $emit('showCalModal', {
                                        type: 'edit',
                                        target: group.cal,
                                        index: cIndex,
                                    })
                                "
                            >
                                수정
                            </button>
                            <button
                                @click="
                                    $emit('showCalModal', {
                                        type: 'delete',
                                        target: group.cal,
                                        index: cIndex,
                                    })
                                "
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            <GroupView
                v-if="group.sub.length > 0"
                :parentGroup="group"
                :childGroup="group.sub"
                v-bind:parentNames="[...parentNames, group.name]"
                @showGroupModal="$emit('showGroupModal', $event)"
                @showCalModal="$emit('showCalModal', $event)"
            ></GroupView>
        </li>
    </ul>
</template>

<script>
import { reactive, ref } from "vue";
export default {
    name: "GroupView",
    props: { parentGroup: Array, childGroup: Array, parentNames: Array },
    emits: ["showGroupModal", "showCalModal"],
    setup(props, { emit }) {},
};
</script>

<style></style>
