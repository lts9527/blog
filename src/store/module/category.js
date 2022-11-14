import storageService from '@/service/storageService';
import categoryService from '@/service/categoryService';

const categoryModule = {
    namespaced: true,
    actions: {
        create(context, { list }) {
            return new Promise((resolve, reject) => {
                categoryService.create({ list }).then((res) => {
                    console.log("response", res.data)
                    // 保存token
                    // context.commit('SET_TOKEN', res.data.data.token);
                    // return articleService.info();
                    return res.data.message;
                }).then((res) => {
                    // 保存用户信息
                    // context.commit('SET_USERINFO', res.data.data.user);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        list(context) {
            return new Promise((resolve, reject) => {
                categoryService.list({}).then((res) => {
                    return res.data.details;
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            })
        }
        // login(context, { telephone, password }) {
        //     return new Promise((resolve, reject) => {
        //         articleService.login({ telephone, password }).then((res) => {
        //             // 保存token
        //             context.commit('SET_TOKEN', res.data.data.token);
        //             return articleService.info();
        //         }).then((res) => {
        //             // 保存用户信息
        //             context.commit('SET_USERINFO', res.data.data.user);
        //             resolve(res);
        //         }).catch((err) => {
        //             reject(err);
        //         });
        //     });
        // },
        // logout(context) {
        //     // 清除token
        //     context.commit('SET_TOKEN', '');
        //     storageService.set(storageService.USER_TOKEN, '');
        //     // 清除用户信息
        //     context.commit('SET_USERINFO', '');
        //     storageService.set(storageService.USER_INFO, '');
        //     window.location.reload();
        // },
    },
};
export default categoryModule;
