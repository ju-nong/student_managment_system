<template>
    <h1>연합을 생성해봐요</h1>
    <div class="wrap addBox">
        <AreaInfo />
        <AreaMember />
        <AreaCalendar />
        <AreaSpoil />

        <div class="form">
            <button @click="addUnion">연합 생성</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import {
    useInfoStore,
    useMemberStore,
    useCalendarStore,
    useSpoilStore,
} from "@store";

import { AreaInfo, AreaMember, AreaCalendar, AreaSpoil } from "@area";

import { ViewGroup } from "@views";

export default {
    name: "AddPage",
    components: {
        AreaInfo,
        AreaMember,
        AreaCalendar,
        AreaSpoil,
        ViewGroup,
    },
    setup() {
        const router = useRouter();
        const info = useInfoStore();
        const member = useMemberStore();
        const calendar = useCalendarStore();
        const spoil = useSpoilStore();

        const addUnion = () => {
            const union = JSON.stringify({
                name: info.getName,
                address: info.getAddress,
                leader: member.getLeader,
                commander: member.getCommander,
                staff: member.getStaff,
                group: calendar.getAll,
                spoil: spoil.getAll,
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

            info.reset();
            member.reset();
            calendar.reset();
            spoil.reset();

            router.push({ name: "PageMain" });
        };

        return {
            addUnion,
        };
    },
};
</script>

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
    overflow: hidden;
    > .group {
        > li::before,
        > li::after {
            border: 0;
        }
    }
}
</style>
