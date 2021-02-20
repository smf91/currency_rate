<template>
    <a-layout class="layout" v-if="this.$store.state.rates.length !==0">
    <a-layout-header>
      <div class="logo" />
      <DropdownList />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <Table />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center"> this is footer </a-layout-footer>
  </a-layout>
  <a-spin v-else tip="Loading..." class="loading" size="large">
    <a-alert
      message="Alert message title"
      description="Further details about the context of this alert."
    ></a-alert>
  </a-spin>
</template>

<script>
import DropdownList from "./components/DropdownList";
import Table from "./components/Table";
export default {
  name: "App",
  components: {
    DropdownList,
    Table,
  },
  methods: {
    getData() {
      this.$store.dispatch("getData");
    },
  },
  created(){
    this.getData()
  }
};
</script>

<style lang="less">
.loading{
  margin-top: 25%;
}
.site-layout-content {
  min-height: 380px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>
