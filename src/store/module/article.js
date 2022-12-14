import storageService from '@/service/storageService';
import articleService from '@/service/articleService';

const articleModule = {
    namespaced: true,
    // state: {
    //     token: storageService.get(storageService.USER_TOKEN),
    //     userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null, //eslint-disable-line
    // },


    // 同步
    // mutations: {
    //     SET_TOKEN(state, token) {
    //         // 更新本地缓存
    //         storageService.set(storageService.USER_TOKEN, token);
    //         // 更新state
    //         state.token = token;
    //     },
    //     SET_USERINFO(state, userInfo) {
    //         // 更新本地缓存
    //         storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
    //         // 更新state
    //         state.userInfo = userInfo;
    //     },
    // },

    // 异步
    actions: {
        create(context, { user_id, cover, title, content, tags }) {
            return new Promise((resolve, reject) => {
                articleService.create({ user_id, cover, title, content, tags }).then((res) => {
                    // 保存token
                    // context.commit('SET_TOKEN', res.data.data.token);
                    // return articleService.info();
                    return res.data.details.article_id;
                }).then((res) => {
                    // 保存用户信息
                    // context.commit('SET_USERINFO', res.data.data.user);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        update(content, article) {
            return new Promise((resolve, reject) => {
                articleService.update(article).then((res) => {
                    return res.data
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        del(content, { id }) {
            return new Promise((resolve, reject) => {
                articleService.del({ id }).then((res) => {
                    return res.data
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        list(context, { user_id }) {
            return new Promise((resolve, reject) => {
                articleService.list({ user_id }).then((res) => {
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
export default articleModule;
