<template>
    <ul class="inGroup">
        <li v-for="(group, index) in child" :key="index">
            <div class="menu">
                <span v-for="(name, nIndex) in pNames" :key="nIndex">
                    {{ name }} /
                </span>
                <span class="title">
                    {{ group.name }}
                </span>
                <button @click="add(group)">그룹 추가</button>
                <button @click="edit(group)">수정</button>
                <button @click="remove(child, index)">삭제</button>
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

<style lang="scss" scoped>
.inGroup {
    display: flex;
    flex-direction: column;
    margin: 0 0 15px 30px;
    > li {
        font-size: 22px;
        .menu {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .title {
                display: inline-block;
                padding-right: 30px;
            }
            button {
                padding: 5px 3px;
                margin-right: 10px;
                border-radius: 10px;
                font-size: 16px;
                background-color: transparent;
            }
            button:hover {
                border-color: transparent;
                background-color: #000;
                color: #fff;
            }
        }
    }
}
</style>
