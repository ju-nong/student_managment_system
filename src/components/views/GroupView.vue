<template>
    <ul class="group">
        <li v-for="(group, index) in childGroup" :key="index" class="gro">
            <div class="groupInline">
                <div class="txt">
                    <span v-for="(pName, pIndex) in parentNames" :key="pIndex">
                        {{ pName }} /
                    </span>
                    {{ group.name }}
                </div>
                <div class="btn">
                    <button
                        @click="
                            $emit('showCalModal', {
                                type: 'add',
                                target: group,
                            })
                        "
                    >
                        <img
                            src="@assets/images/calendar.png"
                            alt=""
                            class="calIcon"
                        />
                    </button>
                    <button
                        @click="
                            $emit('showGroupModal', {
                                type: 'add',
                                target: group,
                            })
                        "
                    >
                        <img
                            src="@assets/images/plus.jpg"
                            alt=""
                            class="plusIcon"
                        />
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
                        <img
                            src="@assets/images/edit.jpg"
                            alt=""
                            class="editIcon"
                        />
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
                        <img
                            src="@assets/images/delete.png"
                            alt=""
                            class="deleteIcon"
                        />
                    </button>
                </div>
            </div>
            <ul class="group">
                <li
                    v-for="(cal, cIndex) in group.cal"
                    :key="cIndex"
                    class="cal"
                >
                    <div class="groupInline">
                        <div class="txt">{{ cal.name }} / {{ cal.date }}</div>
                        <div class="btn">
                            <button
                                @click="
                                    $emit('showCalModal', {
                                        type: 'edit',
                                        target: group.cal,
                                        index: cIndex,
                                    })
                                "
                            >
                                <img src="@assets/images/plus.jpg" alt="" />
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
                                <img src="@assets/images/delete.png" alt="" />
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

<style lang="scss">
.groupBody {
    > .group {
        > li {
            margin-bottom: 30px;
            overflow: hidden;
            > .groupInline {
                > .txt {
                    color: #ffcf00 !important;
                }
            }
        }
    }
    .group {
        position: relative;
        padding-left: 32px;
        li {
            position: relative;
            line-height: 30px;
            ::before,
            ::after {
                content: "";
                position: absolute;
                left: -12px;
            }
            .groupInline {
                position: relative;
                background-color: #2e2e2e;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                transition: $ts3;
                z-index: 1;
                .txt {
                    border-radius: 5px;
                    padding: 0 5px;
                }
                .btn {
                    opacity: 0;
                    transition: $ts3;
                    button {
                        margin-left: 20px;
                        vertical-align: middle;
                        background: transparent;
                        border: 0;
                        img {
                            width: 30px;
                            height: 30px;
                        }
                        .calIcon {
                            filter: invert(100%);
                        }
                    }
                }
            }
            .groupInline:hover {
                .txt {
                    background-color: #ffcf00;
                    color: #fff !important;
                }
                .btn {
                    opacity: 1;
                }
            }
            .group:last-of-type li::after {
                top: calc(-100% + 14px);
                height: 100%;
            }
        }
        .gro > .groupInline .txt {
            font-weight: bold;
            font-size: 22px;
            color: #abb8c2;
        }
        .cal > .groupInline .txt {
            color: #eee;
        }
    }
}

li::before {
    border-top: $bw;
    top: 14px;
    width: 8px;
}

li::after {
    border-left: $bw;
    height: 100%;
    top: 2px;
}
</style>
