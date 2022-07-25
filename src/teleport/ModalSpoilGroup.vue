<template>
    <BaseModal
        v-if="modal.getTarget == `sGroup`"
        @complete="complete()"
        @reset="reset()"
    >
        <div class="content-container">
            <h1>{{ modal.getContent }}</h1>
            <div class="groupForm">
                <input
                    type="text"
                    placeholder="그룹 이름"
                    v-model="groupName"
                />
            </div>
        </div>
    </BaseModal>
</template>

<script>
import { ref } from "vue";
import { useModalStore, useSpoilStore } from "@store";
import { BaseModal } from "@teleport";

export default {
    name: "ModalSpoilGroup",
    components: { BaseModal },
    setup() {
        const modal = useModalStore();
        const spoil = useSpoilStore();

        const groupName = ref("");

        const complete = () => {
            if (modal.getType == "add") {
                spoil.addGroup(groupName.value);
            } else if (modal.getType == "edit") {
                spoil.editGroup(groupName.value);
            }
            reset();
        };

        const reset = () => {
            groupName.value = "";
            modal.hide();
        };

        return { modal, groupName, complete, reset };
    },
};
</script>

<style lang="scss" scoped></style>
