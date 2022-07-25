import { createWebHistory, createRouter } from "vue-router";
import { PageMain, PageForm, PageView } from "@pages";

const routes = [
    {
        path: "/",
        alias: ["/main"],
        name: "PageMain",
        component: PageMain,
    },
    {
        path: "/view",
        name: "PageView",
        component: PageView,
    },
    {
        path: "/form",
        name: "PageForm",
        component: PageForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
