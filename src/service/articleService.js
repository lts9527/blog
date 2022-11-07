import request from '@/utils/request';

// 创建文章
const create = ({ user_id, category_id, title, content, tags }) => request.post('creative/article/submit', { user_id, category_id, title, content, tags });

// 获取文章
const show = ({ username, password }) => request.post('auth/login', { username, password });

// 文章列表
const list = () => request.get('catgory/list');

export default {
    create,
    show,
    list,
};
