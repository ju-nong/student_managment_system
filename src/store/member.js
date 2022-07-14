import { defineStore } from "pinia";

export const useMemberStore = defineStore("member", {
    state: () => {
        return {
            leader: null,
            commander: [],
            staff: [],
        };
    },
    actions: {
        setLeader(name) {
            this.leader = name;
        },
        addCommander(name) {
            this.commander.push(name);
        },
        addStaff(name) {
            this.staff.push(name);
        },
        kickCommander(index) {
            this.commander.splice(index, 1);
        },
        kickStaff(index) {
            this.staff.splice(index, 1);
        },
    },
    getters: {
        getAll: (state) => state,
        getLeader: (state) => state.leader,
        getCommander: (state) => state.commander,
        getCommanderLen: (state) => state.commander.length,
        getStaff: (state) => state.staff,
    },
});
