<template>
    <BaseModal
        @complete="complete()"
        @reset="reset()"
        v-if="modal.getTarget == `sGroup`"
    >
        <div class="content-container">
            <h2>{{ modal.getContent }}</h2>
            <div class="groupForm">
                <input
                    type="text"
                    placeholder="그룹 이름을 입력해주세요"
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
