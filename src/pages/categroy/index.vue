/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div>
    <el-button type="primary" size="small" @click="toAddHandler">新增</el-button>
    <el-input v-model="list.status" placeholder="根据状态搜索..." clearable style="width:200px;display:inline-block" />
    <el-input v-model="list.telephone" placeholder="根据手机号搜索..." clearable style="width:200px;display:inline-block" />
    <el-input v-model="list.realname" placeholder="根据姓名搜索..." clearable style="width:200px;display:inline-block" />
    <el-button type="primary" size="small" @click="toSearchHandler">搜索</el-button>
    <el-table
      :data="categorys"
      border
      style="width: 90%"
    >
      <el-table-column
        prop="id"
        width="150"
      />
      <el-table-column
        prop="name"
        label="栏目名"
      />
      <el-table-column
        prop="num"
        label="编号"
      />
      <el-table-column
        prop="icon"
        label="图标"
      >
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toUpdateHandler(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="toDeleteHandler(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="list.pageSize"
      @current-change="changePage"
    />
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realname" placeholder="输入姓名" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" placeholder="输入用户名" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" placeholder="输入手机号" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择用户状态">
            <el-option label="启用" value="启用" />
            <el-option label="禁用" value="禁用" />
            <el-option label="已审核" value="已审核" />
            <el-option label="未审核" value="未审核" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      list: {
        page: 0,
        pageSize: 10,
        status: ''
      },
      form: {},
      title: '新增用户',
      dialogFormVisible: false,
      formLabelWidth: '200'
    }
  },
  computed: {
    ...mapState('category', ['categorys', 'total'])
  },
  created() {
    // this.findAll()
    this.queryCategory(this.list)
  },
  methods: {
    ...mapActions('category', ['queryCategory', 'findAll', 'saveOrUpdate', 'deleteById']),
    changePage(page) {
      this.list.page = page - 1
      this.queryCategory(this.list)
    },
    toAddHandler() {
      this.title = '新增信息'
      this.form = {}
      this.dialogFormVisible = true
    },
    submitForm() {
      this.dialogFormVisible = false
      this.form.registerTime = new Date().getTime()
      this.saveOrUpdate({ form: this.form, list: this.list })
    },
    toUpdateHandler(row) {
      this.title = '修改信息'
      this.form = row
      this.dialogFormVisible = true
    },
    toDeleteHandler(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteById({ id, list: this.list })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toSearchHandler() {
      this.queryCategory(this.list)
    }
  }
}
</script>
<style scoped>

</style>
