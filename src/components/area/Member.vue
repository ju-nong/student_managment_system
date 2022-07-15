<template>
    <div class="form">
        <h2>멤버 영역</h2>
        <div class="mInfo">
            <p>대장</p>
            <p>:</p>
            <div class="nameList">
                <span v-if="member.getLeader" @click="changeLeader()">
                    {{ member.getLeader }}
                </span>
            </div>
        </div>
        <div class="mInfo">
            <p>부대장</p>
            <p>:</p>
            <div class="nameList">
                <span
                    v-for="(com, index) in member.getCommander"
                    :key="index"
                    @click="kickCom(index)"
                >
                    {{ com }}
                </span>
            </div>
        </div>
        <div class="mInfo">
            <p>말단</p>
            <p>:</p>
            <div class="nameList">
                <span
                    v-for="(stf, index) in member.getStaff"
                    :key="index"
                    @click="kickStf(index)"
                    >{{ stf }}</span
                >
            </div>
        </div>
        <div class="commitForm">
            <p>대장 : 1명 ( 필수 )</p>
            <input
                type="text"
                placeholder="대장"
                @keyup.enter="addLeader()"
                v-model="leader"
            />
            <p>부대장 : 최대 7 명</p>
            <input
                type="text"
                placeholder="부대장"
                @keyup.enter="addCommander()"
                v-model="commander"
            />
            <p>말단 : 제한 없음</p>
            <input
                type="text"
                placeholder="말단"
                @keyup.enter="addStaff()"
                v-model="staff"
            />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useMemberStore } from "@store/member";

export default {
    setup() {
        const leader = ref("");
        const commander = ref("");
        const staff = ref("");

        const member = useMemberStore();

        const addLeader = () => {
            if (!member.getLeader) {
                member.setLeader(leader.value);
            } else {
                alert("대장은 최대 1 명만 등록가능합니다.");
            }

            leader.value = "";
        };

        const addCommander = () => {
            if (member.getCommanderLen < 7) {
                member.addCommander(commander.value);
            } else {
                alert("부대장은 최대 7 명만 등록가능합니다.");
            }

            commander.value = "";
        };

        const addStaff = () => {
            member.addStaff(staff.value);
            staff.value = "";
        };

        const changeLeader = () => {
            member.setLeader(null);
        };

        const kickCom = (index) => {
            member.kickCommander(index);
        };

        const kickStf = (index) => {
            member.kickStaff(index);
        };

        return {
            leader,
            commander,
            staff,
            member,
            addLeader,
            addCommander,
            addStaff,
            changeLeader,
            kickCom,
            kickStf,
        };
    },
};
</script>

<style></style>
