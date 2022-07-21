<template>
    <ul class="inGroup">
        <li v-for="(group, index) in child" :key="index">
            <div class="menu">
                <span class="groupTitle">
                    <span v-for="(name, nIndex) in pNames" :key="nIndex">
                        {{ name }} /
                    </span>
                    {{ group.name }}
                </span>
                <div class="btn">
                    <button @click="add(group)">👨‍👦‍👦</button>
                    <button @click="edit(group)">📝</button>
                    <button @click="remove(child, index)">❌</button>
                </div>
            </div>

            <SpoilGroupView
                v-if="group.group.length > 0"
                :child="group.group"
                v-bind:pNames="[...pNames, group.name]"
                @showGroupModal="$emit('showGroupModal', $event)"
            />
        </li>
    </ul>
</template>

<script>
import { useModalStore, useSpoilStore } from "@store";
export default {
    name: "SpoilGroupView",
    props: { child: Array, pNames: Array },
    setup(props) {
        const modal = useModalStore();
        const spoil = useSpoilStore();
        const target = "sGroup";

        const add = (node) => {
            modal.set("add", target, `${node.name}의 서브그룹 추가`);
            spoil.set(node.group);
        };

        const edit = (node) => {
            modal.set("edit", target, `${node.name} 수정`);
            spoil.set(node);
        };

        const remove = (node, index) => {
            modal.set("remove", "removeSpoil", `${node[index].name} 삭제`);
            spoil.set(node, index);
        };
        return { add, edit, remove };
    },
};
</script>

<style lang="scss">
.inGroup {
    display: flex;
    flex-direction: column;
    padding: 0px 0px 10px 10px;
}
</style>
