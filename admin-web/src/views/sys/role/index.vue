<template>
  <div class="app-container">
    <el-form :inline="true" :model="condition" class="demo-form-inline">
      <el-form-item label="角色名:">
        <el-input v-model="condition.name" placeholder="角色名" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCurrentChange(1)">搜索</el-button>
        <el-button type="success" icon="plus" @click="handleCreate">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="page.data" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="角色名" width="180" />
      <el-table-column prop="code" label="角色编码" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormTitle" width="80%">
      <el-form ref="form" :model="form" :rules="roleRules" label-width="200px">
        <el-form-item :label-width="formLabelWidth" prop="type" label="角色类型:">
          <el-radio-group v-model="form.type" name="type">
            <el-radio :label="0">管理员角色</el-radio>
            <el-radio :label="1">普通角色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" prop="name" label="角色名:">
          <el-input v-model="form.name" name="name" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" prop="code" label="角色编码:">
          <el-input v-model="form.code" name="code" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" prop="description" label="角色描述:">
          <el-input v-model="form.description" name="description" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="分配权限:">
          <el-tree ref="tree" :data="powerList" :props="defaultProps" :default-checked-keys="powerIds"
            :check-strictly="true" style="margin-top: 8px" show-checkbox default-expand-all node-key="id"
            highlight-current />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { pageGet, sysRolePost, sysRoleByIdDelete } from '@/api/sysRole'
import { sysRolePermissionGet } from '@/api/sysRolePermission'
import { saveModel, updateModel, deleteModelById, getModelPage, query, deepCopyModel } from '@/api/common/common-crud'
export default {
  data() {
    return {
      module: 'roles',
      form: {
      },
      roleRules: {
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      defaultFrom: {
      },
      condition: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        data: []
      },
      isCreate: false,
      dialogFormTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      powerList: [],
      powerIds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.handleCurrentChange(1)
  },
  methods: {
    findPowers(id) {
      sysRolePermissionGet({roleId:id}).then(res => {
        if (res.code * 1 === 1) {
          const powerList = this.generateTree(res.data.powerList)
          this.powerList = powerList
          this.powerIds = res.data.powerIds ? res.data.powerIds.map(item => item.permissionId) : []
        }
      })
    },
    handleCreate() {
      this.powerIds = []
      this.findPowers(-1)
      this.form = {}
      this.isCreate = true
      this.dialogFormVisible = true
      this.dialogFormTitle = '新增角色'
    },
    handleUpdate(index, row) {
      this.powerIds = []
      this.findPowers(row.id)
      this.defaultFrom = row
      this.form = deepCopyModel(this.defaultFrom)
      this.isCreate = false
      this.dialogFormVisible = true
      this.dialogFormTitle = '编辑角色'
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.powerIds = this.$refs.tree.getCheckedKeys()
          sysRolePost(this.form).then(res => {
            this.dialogFormVisible = false
            this.handleCurrentChange(1)
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysRoleByIdDelete(item.id).then(() => {
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
      this.$message('已取消操作')
    },
    handleSizeChange(val) {
      this.condition.pageSize = val
      this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.condition.pageNum = val
      this.page.currentPage = val
      pageGet(this.condition).then(res => {
        if (res.code * 1 === 1) {
          this.page.data = res.data.records
          this.page.total = parseInt(res.data.total)
        }
      })
      // getModelPage(this.module, this.condition).then(res => {
      //   this.page.data = res.data.records
      //   this.page.total = parseInt(res.data.total)
      // })
    },
    generateTree(data, parentId = '-1') {
        const tree = [];
        for (const item of data) {
            if (item.parentId === parentId) {
                const children = this.generateTree(data, item.id);
                if (children.length > 0) {
                    item.children = children;
                }
                tree.push(item);
            }
        }
        return tree;
    }
  }
}
</script>
