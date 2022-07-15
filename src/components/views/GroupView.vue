<template>
    <ul class="group">
        <li v-for="(group, index) in child" :key="index" class="gro">
            <div class="groupInline">
                <div class="txt">
                    <span v-for="(pName, pIndex) in pNames" :key="pIndex">
                        {{ pName }} /
                    </span>
                    {{ group.name }}
                </div>
                <div class="btn">
                    <button @click="add(group, `calendar`)">
                        <img
                            src="@assets/images/calendar.png"
                            alt=""
                            class="calIcon"
                        />
                    </button>
                    <button @click="add(group, `group`)">
                        <img
                            src="@assets/images/plus.jpg"
                            alt=""
                            class="plusIcon"
                        />
                    </button>
                    <button @click="edit(group, 'group')">
                        <img
                            src="@assets/images/edit.jpg"
                            alt=""
                            class="editIcon"
                        />
                    </button>
                    <button @click="remove(child, 'group', index)">
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
                            <button @click="edit(cal, 'calendar')">
                                <img src="@assets/images/edit.jpg" alt="" />
                            </button>
                            <button
                                @click="remove(group.cal, 'calendar', cIndex)"
                            >
                                <img src="@assets/images/delete.png" alt="" />
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            <GroupView
                v-if="group.sub.length > 0"
                :child="group.sub"
                v-bind:pNames="[...pNames, group.name]"
            ></GroupView>
        </li>
    </ul>
</template>

<script>
import { useModalStore, useCalendarStore } from "@store";
export default {
    name: "GroupView",
    props: { parent: Array, child: Array, pNames: Array },
    setup(props) {
        const modal = useModalStore();
        const calendar = useCalendarStore();

        const add = (node, target) => {
            let content;
            if (target == "group") {
                content = "의 서브그룹 추가";
                calendar.set(node.sub);
            } else {
                content = "의 일정 추가";
                calendar.set(node.cal);
            }
            modal.set("add", target, `${node.name}${content}`);
        };

        const edit = (node, target) => {
            modal.set("edit", target, `${node.name} 수정`);
            calendar.set(node);
        };

        const remove = (node, target, index) => {
            const content = target == "group" ? "그룹" : "일정";

            modal.set(
                "remove",
                "removeCalendar",
                `${node[index].name} ${content} 삭제`,
            );
            calendar.set(node, index);
        };

        return { add, edit, remove };
    },
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
