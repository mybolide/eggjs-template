<template>
  <div class="app-container">
    <el-form :inline="true" :model="condition" class="demo-form-inline">
      <el-form-item label="用户名:">
        <el-input v-model="condition.name" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCurrentChange(1)">搜索</el-button>
        <el-button type="primary" icon="plus" @click="handleCreate">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="page.data" border style="width: 100%">
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="status" label="头像" width="80">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" style="width: 50px; height: 50px;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="roleNames" label="用户角色" />
      <el-table-column prop="address" label="操作" width="360">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button type="warning" size="mini" @click="handleUpdatePassword(scope.$index, scope.row)">重置密码</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px;">
      <el-pagination :current-page="page.currentPage" :page-sizes="page.pageSizes" :page-size="page.pageSize"
        :total="page.total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <!-- Form -->
    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormTitle" width="40%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="用户名:" prop="userName">
          <el-input :disabled="isDisabled" v-model="form.userName" auto-complete="off" name="userName" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码:" prop="password" v-if="isCreate">
          <el-input :disabled="isDisabled" v-model="form.password" auto-complete="off" name="password" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="姓名:" prop="name">
          <el-input :disabled="isDisabled" v-model="form.name" auto-complete="off" name="name" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="头像:" prop="avatar">
          <upload v-model="form.avatar" @success="handleAvatarSuccess" :fileUrl="form.avatar" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="分配角色:">
          <el-select :disabled="isDisabled" v-model="userRole" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isDisabled" @click="handleCancel">关闭</el-button>
        <el-button v-if="!isDisabled" @click="handleCancel">取消</el-button>
        <el-button v-if="!isDisabled" type="primary" @click="handleSave">确定</el-button>
      </div>
    </el-dialog>


    <!-- Form -->
    <el-dialog :visible.sync="dialogFormPasswordVisible" title="重置密码" width="40%">
      <el-form ref="form" :model="formPassWord" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="密码:" prop="password">
          <el-input :disabled="isDisabled" v-model="formPassWord.password" auto-complete="off" name="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isDisabled" @click="handleCancel">Close</el-button>
        <el-button v-if="!isDisabled" @click="handleCancel">Cancel</el-button>
        <el-button v-if="!isDisabled" type="primary" @click="handleResetPassword">Reset</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { pageGet, sysAccountPost, sysAccountByIdDelete, passwordPut } from '@/api/sysAccount'
import { fileViewUrl } from '@/api/upload'
import { sysRoleGet } from '@/api/sysRole'
import upload from '@/components/upload'

export default {
  components: {
    upload
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '正常',
        1: '锁定'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      module: 'users',
      fileViewUrl,
      form: {
        avatar: '',
        name: '',
        userName: '',
        roleIds: []
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      defaultFrom: {
      },
      formPassWord: {
        password: ''
      },
      condition: {
        name: '',
        pageNum: 1,
        pageSize: 10,
        tenantCode: ''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        data: []
      },
      isCreate: false,
      isDisabled: false,
      dialogFormTitle: '',
      dialogFormVisible: false,
      dialogFormPasswordVisible: false,
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      deptList: [],
      roleList: [],
      userRole: [],
      tenantList: [],
      doctors: []
    }
  },
  created() {
    this.handleCurrentChange(1)
  },
  methods: {
    handleAvatarSuccess(data) {
      this.form.avatar = data
    },
    handleUpdatePassword(index, row) {
      this.dialogFormPasswordVisible = true
      this.formPassWord = {
        id: row.id,
        password: ''
      }
    },
    findRoleByUserId(userId) {
      sysRoleGet({ accountId: userId }).then(res => {
        if (res.code * 1 === 1) {
          this.roleList = res.data.roles
          this.userRole = res.data.userRole.map(item => item.roleId)
        }
      })
    },
    handleCreate() {
      this.form = {}
      this.isCreate = true
      this.isDisabled = false
      this.dialogFormVisible = true
      this.userRole = []
      sysRoleGet().then(res => {
        if (res.code * 1 === 1) {
          console.log(res.data)
          this.roleList = res.data.roles
        }
      })
      this.dialogFormTitle = '新增用户'
    },
    handleDetail(index, row) {
      this.defaultFrom = row
      this.isCreate = false
      this.form = JSON.parse(JSON.stringify(this.defaultFrom))
      this.isDisabled = true
      this.dialogFormVisible = true
      this.dialogFormTitle = '用户详情'
      this.findRoleByUserId(row.id)
    },
    handleUpdate(index, row) {
      this.defaultFrom = row
      this.form = JSON.parse(JSON.stringify(this.defaultFrom))
      this.isCreate = false
      this.isDisabled = false
      this.dialogFormVisible = true
      this.dialogFormTitle = '编辑用户'
      this.findRoleByUserId(row.id)
    },
    async handleResetPassword() {
      const passwordFrom = this.formPassWord
      const res = await passwordPut(passwordFrom.id, passwordFrom)
      if (res.code * 1 === 1) {
        this.dialogFormVisible = false
        this.handleCurrentChange(this.page.currentPage)
        this.formPassWord = {}
        this.dialogFormPasswordVisible = false
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.roleIds = this.userRole

          sysAccountPost(this.form).then(res => {
            if (res.code * 1 === 1) {
              this.dialogFormVisible = false
              this.handleCurrentChange(this.page.currentPage)
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(index, item) {
      console.log(item)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysAccountByIdDelete(item.id).then(() => {
          this.handleCurrentChange(1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handleCancel() {
      this.dialogFormVisible = false
      if (!this.isDisabled) {
        this.$message('操作已取消')
      }
    },
    handleTreeSelect(data) {
      console.log(data)
      this.form.deptId = data.id
      this.form.deptName = data.name
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.condition.pageNum = val
      this.page.currentPage = val
      pageGet(this.condition).then(res => {
        this.page.data = res.data.records
        this.page.total = parseInt(res.data.total)
      })
    }
  }
}
</script>
