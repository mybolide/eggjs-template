<template>
  <div class="app-container">
    <el-card style="height: 880px; overflow-y: auto;">
      <div style="margin-left:50px;">
        <el-button type="success" icon="plus" @click="handleCreate">新增</el-button>
        <el-button v-if="isShow" type="primary" icon="edit" @click="handleUpdate">编辑</el-button>
        <el-button v-if="isShow" type="danger" icon="delete" @click="handleDelete">删除</el-button>
      </div>
      <el-row>
        <el-col :span="5" style="margin-top:40px; margin-left: 50px;margin-right: 10px">
          <el-tree :data="list" :props="defaultProps" :default-expand-all="true" highlight-current empty-text="No data found" @node-click="showItem"/>
        </el-col>
        <el-col :span="12" style="margin-top:40px;margin-right: 200px">
          <el-card class="box-card">
            <el-form ref="form" :model="form" :rules="powerRules" label-width="100px">
              <el-form-item label="权限名:" prop="name">
                <el-input :disabled="isDisabled" v-model="form.name" name="name"/>
              </el-form-item>
              <el-form-item label="上级菜单:" prop="parentName">
                <div class="flex justify-between">
                  <el-input :disabled="true" v-model="form.parentName" name="parentName" class="w-[80%]"/>
                  <el-popover
                    v-if="!isDisabled"
                    placement="bottom-start"
                    trigger="click">
                    <el-tree :data="list" :props="defaultProps" @node-click="handleParent"/>
                    <el-button slot="reference">选择</el-button>
                  </el-popover>
                </div>
                
              </el-form-item>
              <el-form-item label="权限类型:" prop="type">
                <el-radio-group :disabled="isDisabled" v-model="form.type" name="type">
                  <el-radio :label="0">菜单</el-radio>
                  <el-radio :label="1">按钮</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="form.type === 1" label="权限标识:">
                <el-input :disabled="isDisabled" v-model="form.permission"/>
              </el-form-item>
              <el-form-item v-if="form.type === 0 || form.type === 2" label="组件名:">
                <el-input :disabled="isDisabled" v-model="form.permission"/>
              </el-form-item>
              <el-form-item v-if="form.type === 0" label="图标:">
                <dmm-icon :disabled="isDisabled" v-model="form.icon" />
              </el-form-item>
              <el-form-item label="排序:" prop="seq">
                <el-input-number :disabled="isDisabled" v-model="form.seq" :min="0" :max="9999" name="sort" controls-position="right"/>
              </el-form-item>
              <el-form-item v-if="!isDisabled">
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="handleCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import config from '@/config'
import { sysPermissionGet, sysPermissionPost, sysPermissionByIdPut, sysPermissionByIdDelete } from '@/api/sysPermission'
import dmmIcon from '@/components/DmmIcon'
import { deepCopyModel } from '@/api/common/common-crud'
export default {
  components: {
    dmmIcon
  },
  data() {
    return {
      module: 'powers',
      form: {
        parentName: ''
      },
      powerRules: {
        type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入权限名字', trigger: 'blur' }],
        parentName: [{ required: true, message: '请选择上级菜单', trigger: 'change' }],
        seq: [{ required: true, message: '请输入菜单排序', trigger: 'blur' }]
      },
      defaultFrom: {
      },
      allList: [],
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isDisabled: true,
      isShow: false,
      isCreate: false
    }
  },
  created() {
    this.getPowerTree()
  },
  methods: {
    getPowerTree() {
      const root = {
        id: "-1",
        name: config.systemName
      }
      sysPermissionGet().then(res => {
        if (res.code * 1 === 1) {
          const data = JSON.parse(JSON.stringify(res.data))
          data.push(root)
          const tree = this.generateTree(data)
          root.children = tree
          this.list = [root]
          this.allList = data
        }
      })
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.isDisabled = true
          if (this.isCreate) {
            sysPermissionPost(this.form).then(() => {
              this.getPowerTree()
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            sysPermissionByIdPut(this.form.id, this.form).then(() => {
              this.getPowerTree()
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
    handleCreate() {
      this.isDisabled = false
      this.isCreate = true
      this.form = { parentName: '' }
    },
    handleUpdate() {
      this.form = deepCopyModel(this.defaultFrom)
      this.isDisabled = false
      this.isCreate = false
    },
    handleDelete() {
      this.form = deepCopyModel(this.defaultFrom)
      this.isDisabled = true
      this.$confirm('此操作将永久删除，是否继续？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysPermissionByIdDelete(this.form.id).then(() => {
          this.getPowerTree()
          this.form = { parentName: '' }
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
      if (!this.isCreate) {
        this.form = deepCopyModel(this.defaultFrom)
      }
      this.isDisabled = true
      this.$message('已取消操作')
    },
    handleParent(data) {
      if (data.id === this.form.id) {
        this.$message('不能选择当前节点作为父节点')
        return
      }
      this.form.parentId = data.id
      this.form.parentName = data.name
    },
    showItem(data) {
      this.isDisabled = true
      this.defaultFrom = data
      const parent = this.allList.filter(item => item.id === data.parentId)
      if (parent && parent.length === 1) data.parentName = parent[0].name
      this.form = deepCopyModel(data)
      this.isShow = true
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
