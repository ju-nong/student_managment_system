import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
    state: () => {
        return {
            type: null,
            target: null,
            content: null,
        };
    },
    actions: {
        set(type, target, content) {
            this.type = type;
            this.target = target;
            this.content = content;
        },
        hide() {
            this.target = null;
        },
    },
    getters: {
        getAll: (state) => state,
        getType: (state) => state.type,
        getTarget: (state) => state.target,
        getContent: (state) => state.content,
    },
});
