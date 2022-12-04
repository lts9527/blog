import request from '@/utils/request';

// 创建文章
const create = ({ user_id, cover, title, content, tags }) => request.post('article/creative/article/submit', { user_id, cover, title, content, tags });

// 修改文章
const update = (article) => request.post("article/creative/article/update", (article));

// 删除文章
const del = ({ id }) => request.post("article/creative/article/delete", ({ id }));

// 获取文章
const show = ({ username, password }) => request.post('auth/login', { username, password });

// 文章列表
const list = () => request.get('article/list');

export default {
    create,
    update,
    del,
    show,
    list,
};
