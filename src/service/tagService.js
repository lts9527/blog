import request from '@/utils/request';

// 创建文章
const add = ({ name, color }) => request.post('article/tag/add', { name, color });

// 获取分类列表
const list = () => request.get('article/tag/list');

// 删除标签
const del = ({ id }) => request.post('article/tag/delete', { id });

// 更新标签信息
const update = ({ id, name }) => request.post('article/tag/update', { id, name });

export default {
    add,
    list,
    del,
    update
};
