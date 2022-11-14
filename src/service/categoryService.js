import request from '@/utils/request';

// 创建文章
const create = ({ list }) => request.post('article/catgory/create', { list });

// 获取分类列表
const list = () => request.get('article/category/list');

// 删除分类 type=1表 示删除一级分类 type=2 表示删除二级分类
const del = ({ id, type }) => request.post('article/category/delete', { id, type });

export default {
    create,
    del,
    list,
};
