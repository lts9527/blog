

/**
 * 根据总条数计算页码
 * @param {number} count 总条数
 * @param {number} pageSize 每页条数
 * @returns 
 */
// pagerCount 计算分页页码
export function pagerCount(count, pageSize) {
    if (typeof (count) == "number") {
        if (count > 0) {
            try {
                let _pagerCount = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
                let c = _pagerCount.toFixed(0);//小数取整
                _pagerCount = c > _pagerCount ? c - 1 : c;//过滤四舍五入
                return _pagerCount;

            } catch (error) {
                return 0;
            }

        } else {
            return 0;
        }

    } else {
        return 0;
    }

}