import { defineStore } from "pinia";

export const useSpoilStore = defineStore("Spoil", {
    state: () => {
        return {
            spoil: [],
            node: null,
            index: null,
        };
    },
    actions: {
        set(node, index = null) {
            this.node = node;
            this.index = index;
        },
        addTarget(gradeValue, classValue) {
            this.getNode.push({
                grade: gradeValue,
                class: classValue,
                group: [],
                subTarget: [],
            });
        },
        addGroup(name) {
            this.getNode.push({ name: name, group: [] });
        },
        editTarget(gradeValue, classValue) {
            this.getNode.grade = gradeValue;
            this.getNode.class = classValue;
        },
        editGroup(name) {
            this.getNode.name = name;
        },
        remove() {
            this.getNode.splice(this.getIndex, 1);
        },
        reset() {
            this.spoil = [];
            this.node = null;
            this.index = null;
        },
    },
    getters: {
        getAll: (state) => state.spoil,
        getNode: (state) => state.node,
        getIndex: (state) => state.index,
    },
});
