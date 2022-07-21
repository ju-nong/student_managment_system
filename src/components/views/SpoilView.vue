<template>
    <ul class="spoil">
        <li v-for="(spoil, sIndex) in child" :key="sIndex">
            <div class="menu">
                <p class="spoilTitle">
                    {{ spoil.grade }}학년 {{ spoil.class }}반
                </p>
                <div class="btn">
                    <button @click="add(spoil, `target`)">🔫</button>
                    <button @click="add(spoil, `sGroup`)">👨‍👦‍👦</button>
                    <button @click="edit(spoil)">📝</button>
                    <button @click="remove(child, sIndex)">❌</button>
                </div>
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

<style lang="scss">
.spoil {
    padding: 0px 0px 30px 30px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .menu {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        justify-content: space-between;
        .spoilTitle {
            font-weight: bold;
            font-size: 24px;
        }
        .groupTitle {
            font-weight: bold;
            font-size: 18px;
        }
        .btn {
            opacity: 0;
            transition: all 0.3s;
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
    .menu:hover {
        .btn {
            opacity: 1;
        }
    }
}
</style>
