import storageService from '@/service/storageService';
import tagService from '@/service/tagService';

const tagModule = {
    namespaced: true,
    actions: {
        add(context, { name, color }) {
            return new Promise((resolve, reject) => {
                tagService.add({ name, color }).then((res) => {
                    // 保存token
                    // context.commit('SET_TOKEN', res.data.data.token);
                    // return articleService.info();
                    return res.data;
                }).then((res) => {
                    // 保存用户信息
                    // context.commit('SET_USERINFO', res.data.data.user);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        del(context, { id }) {
            // console.log("Req", JSON.stringify(req))
            return new Promise((resolve, reject) => {
                tagService.del({ id }).then((res) => {
                    return res.data
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        list(context) {
            return new Promise((resolve, reject) => {
                tagService.list({}).then((res) => {
                    return res.data.details;
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            })
        },
        update(context, { id, name }) {
            return new Promise((resolve, reject) => {
                tagService.update({ id, name }).then((res) => {
                    return res.data;
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            })
        }
    },
};
export default tagModule;
