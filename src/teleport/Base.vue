<template>
    <div class="backdrop">
        <div class="modal-container">
            <slot></slot>
            <div class="buttons-container">
                <span class="btn">
                    <button
                        v-if="modal.getType == 'add'"
                        class="add"
                        @click="com()"
                    >
                        추가
                    </button>
                    <button
                        v-if="modal.getType == 'edit'"
                        class="edit"
                        @click="com()"
                    >
                        수정
                    </button>
                    <button
                        v-if="modal.getType == 'remove'"
                        class="delete"
                        @click="com()"
                    >
                        삭제
                    </button>
                    <button class="cancel" @click="cancel()">취소</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

import { useModalStore, useCalendarStore } from "@store";
export default {
    name: "Base",
    emits: ["complete"],
    setup(props, { emit }) {
        const modal = useModalStore();

        const com = () => {
            emit("complete");
        };

        const cancel = () => {
            emit("reset");
        };

        return { modal, com, cancel };
    },
};
</script>

<style lang="scss">
.backdrop {
    z-index: 100;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.2);
    .modal-container {
        width: 450px;
        border-radius: 20px;
        background: white;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        .groupForm {
            padding: 20px 0px;
            input {
                width: 100%;
                font-size: 16px;
                padding: 10px 5px;
                margin-bottom: 5px;
            }
            label {
                font-size: 22px;
                select {
                    font-size: 22px;
                }
                padding: 20px;
            }
        }
        .buttons-container {
            text-align: right;

            button {
                padding: 5px;
                transition: all 0.3s;
                margin-left: 5px;
                font-size: 16px;
                color: $w;
                border: 0;
            }
            .add {
                background-color: $pc;
            }
            .edit {
                background-color: #00c230;
            }
            .delete {
                background-color: #ff0000;
            }
            .cancel {
                background-color: #aaa;
            }
        }
    }
}
</style>
