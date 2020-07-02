/**
 * 拷贝 target 的所有属性值到 source 对象同名属性，如果 target 存在 source 同名属性的话
 * @param source 将被新属性值覆盖的源对象
 * @param target 待拷贝属性的对象
 * @returns {*}
 */
function cloneExistsProperties(source,target) {
    Object.keys(source).forEach(srcPropertyKey => {
        if (target.hasOwnProperty(srcPropertyKey)) {
            source[srcPropertyKey] = target[srcPropertyKey];
        }
    });
    return source;
}

export default {
    cloneExistsProperties
}