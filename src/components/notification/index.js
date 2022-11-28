import Notification from "./notification.vue";
import notify from "./notify.js";

export default (Vue) => {
    Vue.component(Notification.name, Notification);
    Vue.prototype.$notify = notify;
};
