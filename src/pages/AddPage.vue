<template>
    <h1>연합을 생성해봐요</h1>
    <div class="wrap addBox">
        <Info />
        <Member />
        <Calendar />
        <!-- <div class="form">
            <h2>일정 영역</h2>
            <div class="groupHeader">
                <button @click="showGroupModal({ type: 'add' })">
                    그룹 추가
                </button>
            </div>
            <div class="groupBody">
                <GroupView
                    :parentGroup="state.group"
                    :childGroup="state.group"
                    :parentNames="''"
                    @showGroupModal="showGroupModal"
                    @showCalModal="showCalModal"
                ></GroupView>
            </div>
        </div> -->
        <ModalGroupAdd ref="modalGroupAdd" :content="addContent" />
        <ModalGroupDelete ref="modalGroupDelete" :content="deleteContent" />
        <ModalGroupEdit ref="modalGroupEdit" :content="editContent" />
        <ModalCalAdd ref="modalCalAdd" :content="calAddContent" />
        <ModalCalDelete ref="modalCalDelete" :content="calDeleteContent" />
        <ModalCalEdit
            ref="modalCalEdit"
            :content="calEditContent"
            :date="calEditDate"
        />

        <div class="form">
            <h2>약탈 영역</h2>
            <div class="groupHeader">
                <button @click="showSpoilModal({ type: 'add' })">추가</button>
            </div>
            <div class="">
                <SpoilView
                    :parentSpoil="state.spoil"
                    :childSpoil="state.spoil"
                    @showSpoilModal="showSpoilModal"
                    @showGroupModal="showGroupModal"
                />
            </div>
        </div>

        <ModalSpoilAdd ref="modalSpoilAdd" :option="spoilOption" />

        <div class="form">
            <button @click="addUnion">연합 생성</button>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useInfoStore, useMemberStore } from "@store";

import { Info, Member, Calendar, Union } from "@area";

import {
    ModalGroupAdd,
    ModalGroupDelete,
    ModalGroupEdit,
    ModalCalAdd,
    ModalCalDelete,
    ModalCalEdit,
    ModalSpoilAdd,
} from "@teleport";

import { GroupView, SpoilView } from "@views";

export default {
    name: "AddPage",
    components: {
        Info,
        Member,
        Calendar,
        Union,
        GroupView,
        ModalGroupAdd,
        ModalGroupDelete,
        ModalGroupEdit,
        ModalCalAdd,
        ModalCalDelete,
        ModalCalEdit,
        ModalSpoilAdd,
        SpoilView,
    },
    setup() {
        const router = useRouter();
        const info = useInfoStore();
        const member = useMemberStore();

        const modalGroupAdd = ref();
        const addContent = ref("");

        const modalGroupDelete = ref();
        const deleteContent = ref("");

        const modalGroupEdit = ref();
        const editContent = ref("");

        const modalCalAdd = ref();
        const calAddContent = ref("");

        const modalCalDelete = ref();
        const calDeleteContent = ref("");

        const modalCalEdit = ref();
        const calEditContent = ref("");
        const calEditDate = ref("");

        const modalSpoilAdd = ref();

        const spoilOption = reactive({
            content: "",
            type: "add",
            grade: 1,
            class: 1,
        });

        const state = reactive({
            group: [
                {
                    name: "그룹 A",
                    sub: [{ name: "그룹 A_1", sub: [], cal: [] }],
                    cal: [{ name: "그룹 A 일정 1", date: "2022-06-30" }],
                },
                {
                    name: "그룹 B",
                    sub: [
                        {
                            name: "그룹 B_1",
                            sub: [
                                { name: "그룹 B_1_1", sub: [], cal: [] },
                                {
                                    name: "그룹 B_1_2",
                                    sub: [],
                                    cal: [
                                        {
                                            name: "그룹 B_1_2 일정 1",
                                            date: "2022-07-01",
                                        },
                                    ],
                                },
                            ],
                            cal: [
                                { name: "그룹 B_1 일정 1", date: "2022-05-10" },
                                { name: "그룹 B_1 일정 2", date: "2022-05-20" },
                                { name: "그룹 B_1 일정 3", date: "2022-05-30" },
                            ],
                        },
                    ],
                    cal: [{ name: "그룹 B 일정 1", date: "2022-06-30" }],
                },
                {
                    name: "그룹 C",
                    sub: [{ name: "그룹 C_1", sub: [], cal: [] }],
                    cal: [{ name: "그룹 C 일정 1", date: "2022-04-30" }],
                },
            ],
            spoil: [
                {
                    grade: 1,
                    class: 1,
                    group: [
                        {
                            name: "aaa",
                            group: [],
                        },
                        { name: "ccc", group: [] },
                    ],
                    subTarget: [],
                },
                {
                    grade: 2,
                    class: 3,
                    group: [{ name: "bbb", group: [] }],
                    subTarget: [],
                },
            ],
        });

        const groupAdd = async (target = null, spoil = false, group = true) => {
            // 루트, 서브그룹 추가 모달
            const ok = await modalGroupAdd.value.show();
            if (!ok) {
                // cancle
                return;
            }

            if (spoil || group) {
                target.group.push({ name: ok, group: [] });
                return;
            }

            if (target === null) {
                // rootGroup Add
                state.group.push({ name: ok, sub: [], cal: [] });
            } else {
                // subGroup Add
                target.sub.push({ name: ok, sub: [], cal: [] });
            }
        };

        const groupDelete = async (
            target,
            index,
            spoil = false,
            group = false,
        ) => {
            // 루트, 서브그룹 삭제 모달
            const ok = await modalGroupDelete.value.show();
            if (!ok) {
                // cancle
                return;
            }

            target.splice(index, 1);
        };

        const groupEdit = async (
            target,
            index,
            spoil = false,
            group = false,
        ) => {
            // 루트, 서브그룹 수정 모달
            const ok = await modalGroupEdit.value.show();
            if (!ok) {
                // cancle
                return;
            }

            if (group) {
                target.name = ok;
            } else {
                target[index].name = ok;
            }
        };

        const showGroupModal = ({
            type,
            target = null,
            index = null,
            spoil = false,
            group = false,
        }) => {
            if (type == "add") {
                // 루트, 서브 그룹추가 모달 show
                addContent.value =
                    target === null
                        ? "그룹 추가"
                        : spoil
                        ? `${target.grade}학년 ${target.class}반의 그룹 추가`
                        : `${target.name}의 서브그룹 추가`;

                groupAdd(target, spoil, group);
            } else if (type == "edit") {
                // 루트, 서브 그룹수정 모달 show
                if (group) {
                    editContent.value = target.name;
                } else {
                    if (target.sub) {
                        editContent.value = target.sub[index].name;
                        target = target.sub;
                    } else {
                        editContent.value = target[index].name;
                    }
                }
                groupEdit(target, index, spoil, group);
            } else if (type == "delete") {
                // 루트, 서브 그룹삭제 모달 show
                if (group) {
                    deleteContent.value = target.group[index].name;
                    target = target.group;
                } else {
                    if (target.sub) {
                        deleteContent.value = target.sub[index].name;
                        target = target.sub;
                    } else {
                        deleteContent.value = target[index].name;
                    }
                }

                groupDelete(target, index, spoil, group);
            }
        };

        const calAdd = async (target = null) => {
            // 루트, 서브그룹 추가 모달
            const ok = await modalCalAdd.value.show();
            if (!ok) {
                // cancle
                return;
            }

            if (target === null) {
                // rootGroup Calendar Add
                state.group.cal.push({ name: ok.name, date: ok.date });
            } else {
                // subGroup Calendar Add
                target.cal.push({ name: ok.name, date: ok.date });
            }
        };

        const calDelete = async (target = null, index = null) => {
            // 루트, 서브그룹 삭제 모달
            const ok = await modalCalDelete.value.show();
            if (!ok) {
                // cancle
                return;
            }

            target.splice(index, 1);
        };

        const calEdit = async (target = null, index = null) => {
            // 루트, 서브그룹 삭제 모달
            const ok = await modalCalEdit.value.show();
            if (!ok) {
                // cancle
                return;
            }

            target.name = ok.name;
            target.date = ok.date;
        };

        const showCalModal = ({ type, target = null, index = null }) => {
            if (type == "add") {
                // 일정 추가 모달 show
                calAddContent.value = target.name;
                calAdd(target);
            } else if (type == "edit") {
                // 일정 수정 모달 show
                calEditContent.value = target[index].name;
                calEditDate.value = target[index].date;
                target = target[index];

                calEdit(target);
            } else if (type == "delete") {
                // 일정 삭제 모달 show
                calDeleteContent.value = target[index].name;

                calDelete(target, index);
            }
        };

        const spoil = async (type = null, target = null, index = null) => {
            // 루트, 서브 타겟 추가 모달
            const ok = await modalSpoilAdd.value.show();

            if (!ok) {
                return;
            }

            if (type == "add") {
                const newTarget = {
                    grade: ok.grade,
                    class: ok.class,
                    group: [],
                    subTarget: [],
                };

                if (target === null) {
                    // rootTarget Add
                    state.spoil.push(newTarget);
                } else {
                    // subTarget Add
                    target.subTarget.push(newTarget);
                }
            } else if (type == "edit") {
                target.grade = ok.grade;
                target.class = ok.class;
            } else if (type == "delete") {
                if (ok) {
                    target.splice(index, 1);
                }
            }
        };

        const showSpoilModal = ({ type, target = null, index = null }) => {
            if (type == "add") {
                spoilOption.content =
                    target === null ? "약탈 타겟 추가" : "약탈 서브타겟 추가";

                spoilOption.type = "add";
                spoilOption.grade = 1;
                spoilOption.class = 1;
            } else if (type == "edit") {
                spoilOption.content = `${target.grade}학년 ${target.class}반 수정`;

                spoilOption.type = "edit";
                spoilOption.grade = target.grade;
                spoilOption.class = target.class;
            } else if (type == "delete") {
                spoilOption.content = `${target[index].grade}학년 ${target[index].class}반 삭제`;
                spoilOption.type = "delete";
                spoilOption.grade = target[index].grade;
                spoilOption.class = target[index].class;
            }

            spoil(type, target, index);
        };

        const addUnion = () => {
            const union = JSON.stringify({
                name: info.getName,
                address: info.getAddress,
                leader: member.getLeader,
                commander: member.getCommander,
                staff: member.getStaff,
                group: state.group,
                spoil: state.spoil,
            });
            if (!localStorage.unions) {
                localStorage.setItem("unions", "[]");
            }
            let unions = localStorage.getItem("unions");
            if (unions == "[]") {
                localStorage.unions = `[${union}]`;
            } else {
                localStorage.unions = `${unions.slice(0, -1)},${union}]`;
            }

            alert("연합이 생성되었습니다.");
            router.push({ name: "MainPage" });
        };

        return {
            // 그룹 레퍼런스
            modalGroupAdd,
            modalGroupDelete,
            modalGroupEdit,
            // 그룹 컨텐츠
            addContent,
            deleteContent,
            editContent,
            // 그룹 메소드
            groupAdd,
            groupDelete,
            groupEdit,
            showGroupModal,

            // 일정 레퍼런스
            modalCalAdd,
            modalCalDelete,
            modalCalEdit,
            // 일정 컨텐츠
            calAddContent,
            calDeleteContent,
            calEditContent,
            calEditDate,
            // 일정 메소드
            calAdd,
            calDelete,
            calEdit,
            showCalModal,

            // 약탈 레퍼런스
            modalSpoilAdd,
            // 약탈 컨텐츠
            //spoilAddContent,
            spoilOption,
            // 약탈 메소드
            spoil,
            showSpoilModal,

            // 전역 state
            state,

            // 연합 생성
            addUnion,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.groupHeader {
    padding: 10px;
    text-align: right;
    button {
        border-radius: 5px;
        padding: 3px 5px;
        font-weight: bold;
        background-color: transparent;
        transition: all 0.3s;
        cursor: pointer;
    }
    button:hover {
        border-color: #fff;
        background-color: #000;
        color: #fff;
    }
}

.groupBody {
    position: relative;
    text-align: left;
    background-color: #2e2e2e;
    padding: 32px;
    > .group {
        > li::before,
        > li::after {
            border: 0;
        }
    }
}
</style>
