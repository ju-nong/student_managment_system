import { defineStore } from "pinia";

export const useInfoStore = defineStore("info", {
    state: () => {
        return { name: "", address: "" };
    },
    actions: {
        setName(name) {
            this.name = name;
        },
        setAddress(address) {
            this.address = address;
        },
    },
    getters: {
        getAll: (state) => state,
        getName: (state) => state.name,
        getAddress: (state) => state.address,
    },
});
