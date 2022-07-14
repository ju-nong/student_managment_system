import { createWebHistory, createRouter } from "vue-router";
import { MainPage, AddPage, ViewPage } from "@pages";

const routes = [
    {
        path: "/",
        alias: ["/main"],
        name: "MainPage",
        component: MainPage,
    },
    {
        path: "/view",
        name: "ViewPage",
        component: ViewPage,
    },
    {
        path: "/add",
        name: "AddPage",
        component: AddPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
