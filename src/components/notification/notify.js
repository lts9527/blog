import Vue from "vue";
import Notification from "./notification.vue";

const NotificationConstructor = Vue.extend(Notification);

const instances = [];
let seed = 1;
// 消除Vue实例
const removeInstance = (instance) => {
    if (!instance) return;
    const len = instances.length;
    const index = instances.findIndex((ins) => instance.id === ins.id);

    instances.splice(index, 1);

    if (len <= 1) return;
    const removeHeight = instance.height;
    for (let i = index; i < len - 1; i++) {
        instances[i].verticalOffset =
            parseInt(instances[i].verticalOffset) - removeHeight - 16;
    }
};

const notify = (options = {}) => {
    if (Vue.prototype.$isServer) return;
    // 获取vue实例
    let instance = new NotificationConstructor({
        propsData: options, // 这里是传进来一组props
        data() {
            return {
                // verticalOffset: 0,
                // timer: null,
                // visible: false,
                // height: 0,
                // color: "error",
            };
        },
        computed: {
            // 配置消息组件的位置
            // style() {
            //     return {
            //         position: "fixed",
            //         right: "20px",
            //         bottom: `${this.verticalOffset}px`,
            //     };
            // }
        },
        mounted() {
            // this.createTimer();
            // this.$el.addEventListener("mouseenter", () => {
            //     if (this.timer) {
            //         this.clearTimer(this.timer);
            //     }
            // });
            // this.$el.addEventListener("mouseleave", () => {
            //     if (this.timer) {
            //         this.clearTimer(this.timer);
            //     }
            //     this.createTimer();
            // });
        },
        updated() {
            // this.height = this.$el.offsetHeight;
        },
        beforeDestroy() {
            this.clearTimer();
        },
        methods: {
            // 创建计时器
            createTimer() {
                this.timer = setTimeout(() => {
                    this.visible = false;
                    document.body.removeChild(this.$el);
                    removeInstance(this);
                    this.$destroy();
                }, options.timeout || 5000);
            },
            // 清除计时器
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            // // 关闭消息弹窗
            // handleClose() {
            //     this.visible = false;
            //     document.body.removeChild(this.$el);
            //     removeInstance(this);
            //     this.$destroy(true);
            // },
            // // 过渡js钩子
            // handleAfterEnter() {
            //     this.height = this.$el.offsetHeight;
            // },
        },
    });

    const id = `notification_${seed++}`; // 动态生成唯一Id
    instance.id = id;
    // 生成vue中的$el
    instance = instance.$mount();
    // 将$el中的内容插入dom节点中去
    document.body.appendChild(instance.$el);
    instance.visible = true;

    // let verticalOffset = 0;

    // instances.forEach((item) => {
    //     verticalOffset += item.$el.offsetHeight + 16;
    // });

    // verticalOffset += 16;
    // instance.verticalOffset = verticalOffset;

    instances.push(instance);

    return instance;
};

export default notify;

