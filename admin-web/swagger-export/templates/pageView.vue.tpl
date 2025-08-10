<template>
  <div class="app-container">
    <el-form :inline="true" :model="page.query" class="demo-form-inline">
      {{#each searchList}}
      {{#if (eq searchType "input")}}
      <el-form-item label="{{description}}:">
        <el-input v-model="page.query.{{name}}" clearable></el-input>
      </el-form-item>
      {{/if}}
      {{#if (eq searchType "select")}}
      <el-form-item label="{{description}}:">
        <el-select v-model="page.query.{{name}}">
          {{#each selectOptions}}
          <el-option label="{{label}}" :value="{{value}}"> </el-option>
          {{/each}}
        </el-select>
      </el-form-item>
      {{/if}}
      {{/each}}
    </el-form>
    <el-table :data="page.data" border style="width: 100%">
      {{#each tableCloumns}}
      <el-table-column prop="{{name}}" label="{{description}}">
        {{#if (eq type "image")}}
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.{{name}}" fit="cover" />
        </template>
        {{/if}}
      </el-table-column>
      {{/each}}
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <el-pagination :current-page="page.currentPage" :total="page.total" layout="total, prev, pager, next"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script>
  import { pageGet, {{modules}}ByIdDelete as del, {{modules}}Post as save , {{modules}}ByIdPut as update  } from "@/api/{{modules}}";
  export default {
    data() {
      return {
        dialogVisible: false,
        form: {
          id : '',
          seq: '',
          name: '' // 新增字段 name
          // 可以在这里添加其他字段
        },
        page: {
          data: [],
          query: {
            pageSize: 10,
            pageNum: 1,
                          
          },
          currentPage: 0,
          total: 0,
        },
      };
    },
    mounted() {
      this.getPageData();
    },
    methods: {
      handleUpdate(index, row) {
        console.info(row)
        this.dialogVisible = true
        this.form.name = row.name
        this.form.id = row.id
        this.form.seq = row.seq
      },
      handleDelete(index, row) {
        del(row.id).then(res => {
          if (res.code * 1 === 1) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.getPageData()
          }
        })
      },
      getPageData() {
        pageGet(this.page.query).then((res) => {
          this.page.data = res.data.records;
          this.page.total = parseInt(res.data.total);
        });
      },
      async handleAddRecord() {
        if (this.form.name) {
          if (this.form.id) {
            const res = await update(this.form.id, { name: this.form.name, seq: this.form.seq * 1 })
            if (res.code * 1 === 1) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.getPageData()
              this.dialogVisible = false
              this.form.name = ''
              this.form.seq = ''
            }
          } else {
            const res = await save({ name: this.form.name,  seq: this.form.seq * 1 })
            if (res.code * 1 === 1) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.getPageData()
              this.dialogVisible = false
              this.form.name = ''
              this.seq = ''
            }
          }
        } else {
          this.$message({
            message: '请输入模板内容',
            type: 'info'
          });
        }
      },
      handleCreate() {
        this.form.id = ''
        this.form.name = ''
        this.form.seq = ''
        this.dialogVisible = true;
      },
      handleCloseDialog() {
        this.dialogVisible = false
        this.form.name = ''
        this.form.id = ''
        this.form.seq = ''
      },
      // 分页处理
      handleCurrentChange(val) {
        this.page.query.pageNum = val
        this.getPageData()
      },
    }
  };
  </script>