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

<style lang="scss" scoped>
.groupBody {
    display: flex;
    > ul {
        width: 100%;
        > li::after {
            width: 0 !important;
        }
        > li {
            > ul {
                margin-left: 15px;
            }
        }
    }
    ul li::before {
        content: "";
        position: absolute;
        border-left: 2px solid #999;
        width: 1px;
        height: calc(100% - 58px);
        top: 35px;
        left: 30px;
    }
    ul li::after {
        content: "";
        position: absolute;
        background-color: #999;
        width: 34px;
        height: 2px;
        top: 15px;
        left: -34px;
    }
    .group {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        text-align: left;

        .calList > .groupInline {
            border-color: #ff0000 !important;
        }
        .groupInline {
            display: inline-block;
            padding-left: 10px;
            border-radius: 10px;
            border: 2px solid #999;
            overflow: hidden;
            height: 35px;
            > div {
                display: inline-block;
            }
            .groupTxtBox {
                font-size: 18px;
                padding-right: 10px;
            }
            .groupBtnBox {
                height: 100%;
                button {
                    height: 100%;
                    border-color: transparent;
                    border-radius: 5px;
                    background-color: transparent;
                    font-weight: bold;
                    margin: 0 3px;
                    padding: 0 3px;
                }
                button:hover {
                    background-color: #000;
                    color: #fff;
                }
            }
        }

        > li {
            margin: 25px 0 0 15px;
            position: relative;
            > ul {
                margin-left: 50px;
            }
        }
    }
}

.content-container {
    > h2 {
        padding-bottom: 10px;
        border-bottom: 1px solid #999;
        margin-bottom: 10px;
    }

    .groupForm {
        display: flex;
        flex-direction: column;
        > input {
            width: 100%;
            padding: 3px 5px;
            margin: 10px 0;
        }
    }
}

.buttons-container > span {
    float: right;
    button {
        padding: 3px 5px;
        margin: 0 5px;
    }
}
</style>
