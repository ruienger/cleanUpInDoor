<template>
  <div>
    <el-link @click="backHandler">返回</el-link><br>
    <!-- {{ customer }} -->
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first" class="tab">
          <div class="tab-info">
            <img class="face" src="../../assets/404_images/404.png">
            <div>{{ customer.username }}</div>
            <div>{{ customer.gender }}</div>
            <div>手机号:{{ customer.telephone }}</div>
            <div>Q Q:{{ customer.qq }}</div>
            <div>微信:{{ customer.wxid }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单信息" name="second" class="tab">
          <div class="tab-info">
            订单
          </div>
        </el-tab-pane>
        <el-tab-pane label="地址信息" name="third" class="tab">
          <div class="tab-info">
            地址信息
            <div>所在省:{{ customer.province }}</div>
            <div>所在市:{{ customer.city }}</div>
            <div>所在区:{{ customer.area }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {
    ...mapState('customer', ['customer'])
  },
  created() {
    this.findCustomerById(this.$route.params.id)
  },
  methods: {
    ...mapActions('customer', ['findCustomerById']),
    backHandler() {
      this.$router.push({ name: 'customer' })
    }
  }
}
</script>
<style scoped>
.face{
  border-radius: 100px;
  height: 200px;
  width: 200px;
  overflow: hidden;
  background-size: 100% 100%;
  border: 1px solid #555;
}
.tab-info{
  margin-left: 27px;
  font-size: 24px;
  line-height: 40px;
}
</style>
