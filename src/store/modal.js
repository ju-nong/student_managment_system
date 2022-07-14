import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
    state: () => {
        return {
            content: null,
            target: null,
            type: null,
            visible: false,
        };
    },
    actions: {
        setting(content, target, type) {
            this.content = content;
            this.target = target;
            this.type = type;
        },
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
    },
    getters: {
        getAll: (state) => state,
        getContent: (state) => state.content,
        getTarget: (state) => state.target,
        getType: (state) => state.type,
        getVisible: (state) => state.visible,
    },
});
