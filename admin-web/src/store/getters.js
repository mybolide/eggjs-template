const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  id: state => state.user.id,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  email: state => state.user.email,
  permissions: state => state.user.permissions,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  tenantCode: state => state.user.tenantCode
}
export default getters
