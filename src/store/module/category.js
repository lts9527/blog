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
        del(context, { id, type }) {
            const req = {
                id: id,
                type: type,
            };
            console.log("Req", JSON.stringify(req))
            return new Promise((resolve, reject) => {
                categoryService.del(req).then((res) => {
                    console.log("response", res.data)
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
                categoryService.list({}).then((res) => {
                    return res.data.details;
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            })
        }
    },
};
export default categoryModule;
