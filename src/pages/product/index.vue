/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div>
    <el-button type="primary" size="small" @click="toAddHandler">新增</el-button>
    <el-button type="danger" size="small" @click="toDelHandler">删除</el-button>
    <el-input v-model="list.status" placeholder="根据状态搜索..." clearable style="width:200px;display:inline-block" />
    <el-input v-model="list.description" placeholder="根据描述搜索..." clearable style="width:200px;display:inline-block" />
    <el-input v-model="list.name" placeholder="根据名称搜索..." clearable style="width:200px;display:inline-block" />
    <el-button type="primary" size="small" @click="toSearchHandler">搜索</el-button>

    <el-tabs v-model="id">
      <el-tab-pane label="全部" name="0" />
      <el-tab-pane v-for="item in categorys" :key="item.id" :label="item.name" :name="item.id+''" />
    </el-tabs>

    <el-table
      ref="multipleTable"
      :data="products"
      border
      style="width: 90%"
    >
      <el-table-column
        type="selection"
        width="55"
        prop="id"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="150"
      />
      <el-table-column
        prop="description"
        label="描述"
        width="150"
      />
      <el-table-column
        prop="price"
        width="80"
        label="价格"
      />
      <el-table-column
        prop="category.name"
        label="所属栏目"
      >
        <!-- <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="photo"
        label="产品图"
      >
        <template slot-scope="scope">
          <img :src="scope.row.photo" alt="图片加载超时" style="{color:#999}">
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        width="80"
        label="状态"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetailHandler(scope.row.id)">详情</el-button>
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
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="输入名称" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" placeholder="输入描述" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="输入价格" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="请选择栏目">
            <el-option v-for="item in categorys" :key="item.id" :label="item.name" :value="item.id" />
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
        pageSize: 7,
        status: ''
      },
      form: {},
      title: '新增用户',
      dialogFormVisible: false,
      formLabelWidth: '200',
      id: '0',
      multipleTable: []
    }
  },
  computed: {
    ...mapState('product', ['products', 'total']),
    ...mapState('category', ['categorys'])
  },
  watch: {
    id() {
      if (this.id === '0') {
        this.queryProduct(this.list)
      } else {
        this.findByCategory(this.id - 0)
      }
    }
  },
  created() {
    // this.findAll()
    this.queryProduct(this.list)
    this.queryCategory(this.list)
  },
  methods: {
    ...mapActions('product', ['queryProduct', 'findAll', 'saveOrUpdate', 'deleteById', 'findByCategory', 'toDelHandler']),
    ...mapActions('category', ['queryCategory']),
    changePage(page) {
      this.list.page = page - 1
      this.queryProduct(this.list)
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
      this.queryProduct(this.list)
    },
    toDetailHandler(id) {
      this.$router.push({ name: 'product_detail', params: { id }})
    },
    toDelHandler() {
      this.batchDelete(this.multipleTable)
    }
  }
}
</script>
<style scoped>

</style>
