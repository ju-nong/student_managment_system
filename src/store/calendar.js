import { defineStore } from "pinia";

export const useCalendarStore = defineStore("Calendar", {
    state: () => {
        return {
            group: [],
            node: null,
            index: null,
        };
    },
    actions: {
        set(node, index = null) {
            this.node = node;
            this.index = index;
        },
        addGroup(name) {
            this.getNode.push({ name: name, sub: [], cal: [] });
        },
        addCalendar(name, date) {
            this.getNode.push({ name: name, date: date });
        },
        edit(name, date = null) {
            this.getNode.name = name;
            if (date) this.getNode.date = date;
        },
        remove() {
            this.getNode.splice(this.getIndex, 1);
        },
        reset() {
            this.group = [];
            this.node = null;
            this.index = null;
        },
    },
    getters: {
        getAll: (state) => state.group,
        getNode: (state) => state.node,
        getIndex: (state) => state.index,
    },
});
