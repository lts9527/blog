// 添加标签列表路由
import router from "@/router";
export function addTagRoute(tags) {
    console.log("add route", tags)
    let routerObj = {
        path: "",
        name: "",
        component: () => import("@/views/platform/apps/todo/articles.vue"),
    };
    tags.forEach((element, index) => {
        routerObj.path = `/platform/apps/todo/${index}`;
        routerObj.name = `tags-${index}`;
        router.addRoute("todo", routerObj);
    });
}