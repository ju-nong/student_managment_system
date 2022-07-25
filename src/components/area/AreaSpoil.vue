<template>
    <div class="form">
        <h2>약탈 영역</h2>
        <div class="groupHeader">
            <button @click="rootSpoilAdd">추가</button>
        </div>
        <div class="spoilBody">
            <ViewSpoil :child="spoil.getAll" />
        </div>
        <teleport to="body">
            <ModalTarget />
            <ModalSpoilGroup />
        </teleport>
    </div>
</template>

<script>
import { useModalStore, useSpoilStore } from "@store";
import { ModalTarget, ModalSpoilGroup } from "@teleport";
import { ViewSpoil } from "@views";

export default {
    components: {
        ViewSpoil,
        ModalTarget,
        ModalSpoilGroup,
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
