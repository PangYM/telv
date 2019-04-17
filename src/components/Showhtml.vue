<template>
  <el-row class="warp">
    <div v-html="content"></div>
  </el-row>
</template>
<style>
</style>

<script>
export default {
  created() {
    if (this.$route.query.content) {
      this.content=this.$route.query.content;
    }
  },
  data() {
    return {
      content:'',
    };
  },
  mounted: function() {}
};
</script>
