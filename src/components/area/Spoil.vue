<template>
    <div class="form">
        <h2>약탈 영역</h2>
        <div class="groupHeader">
            <button @click="rootSpoilAdd">추가</button>
        </div>
        <div class="spoilBody">
            <SpoilView :child="spoil.getAll" />
        </div>
        <teleport to="body">
            <TargetModal />
            <SpoilGroupModal />
        </teleport>
    </div>
</template>

<script>
import { useModalStore, useSpoilStore } from "@store";
import { TargetModal, SpoilGroupModal } from "@teleport";
import { SpoilView } from "@views";

export default {
    components: {
        SpoilView,
        TargetModal,
        SpoilGroupModal,
    },
    setup() {
        const modal = useModalStore();
        const spoil = useSpoilStore();

        const rootSpoilAdd = () => {
            modal.set("add", "target", "약탈 타겟 추가");
            spoil.set(spoil.getAll);
        };

        return { modal, spoil, rootSpoilAdd };
    },
};
</script>

<style>
.spoilBody {
    padding: 30px;
}
</style>
