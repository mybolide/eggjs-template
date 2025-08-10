export default {
  /**
   * 被绑定元素插入父节点时调用
   * @param {*} el 指令绑定的元素
   * @param {*} binding 指令信息
   * @param {*} vnode 虚拟DOM节点
   */
  inserted(el, binding, vnode) {
    const userPermissions  = window.GLOBAL_ADMIN_PERMISSIONS;
    const requiredPermissions = binding.value;  // 获取传入的权限数组
    // 判断用户是否具有任意一个传入的权限
    const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission));

    // 如果没有权限，移除元素
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
