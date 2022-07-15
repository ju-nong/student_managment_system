<template>
    <ul class="spoil">
        <li v-for="(spoil, sIndex) in child" :key="sIndex">
            <div class="menu">
                <p class="title">{{ spoil.grade }}학년 {{ spoil.class }}반</p>
                <button @click="add(spoil, `target`)">타겟 추가</button>
                <button @click="add(spoil, `sGroup`)">그룹 추가</button>
                <button @click="edit(spoil)">수정</button>
                <button @click="remove(child, sIndex)">삭제</button>
            </div>
            <SpoilGroupView :child="spoil.group" :pNames="''" />
            <SpoilView :child="spoil.subTarget" />
        </li>
    </ul>
</template>

<script>
import { SpoilGroupView } from "@views";
import { useModalStore, useSpoilStore } from "@store";

function getContent(node) {
    return `${node.grade}학년 ${node.class}반`;
}

export default {
    name: "SpoilView",
    props: { child: Array },
    components: { SpoilGroupView },
    setup(props) {
        const modal = useModalStore();
        const spoil = useSpoilStore();

        const add = (node, target) => {
            let content;
            if (target == "target") {
                content = "서브타겟";
                spoil.set(node.subTarget);
            } else {
                content = "그룹";
                spoil.set(node.group);
            }
            modal.set("add", target, `${getContent(node)}의 ${content} 추가`);
        };

        const edit = (node) => {
            modal.set("edit", "target", `${getContent(node)} 수정`);
            spoil.set(node);
        };

        const remove = (node, index) => {
            modal.set(
                "remove",
                "removeSpoil",
                `${getContent(node[index])} 삭제`,
            );
            spoil.set(node, index);
        };

        return { add, edit, remove };
    },
};
</script>

<style lang="scss" scoped>
.spoil {
    margin: 0 0 30px 30px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .menu {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .title {
            font-size: 32px;
            font-weight: bold;
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
</style>
