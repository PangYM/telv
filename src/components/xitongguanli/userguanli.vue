<template>
  <div class="custom-tree-container">
    <el-row>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="kuang">
      <div class="zuokuang">
        <el-tree :data="fromData" show-checkbox node-key="id" :expand-on-click-node="false" accordion>
          <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
          <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    Append
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    Delete
                  </el-button>
                </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '@/api'
  let id = 1000;
  export default {
    created() {
      API.gettongxinlu()
        .then(({
          data
        }) => {
          this.fromData = data.tongxinlu;
        });
    },
    data() {
      return {
        fromData: []
      }
    },
  
    methods: {
      append(data) {
        const newChild = {
          id: id++,
          label: 'testtest',
          children: []
        };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
  
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
  
      renderContent(h, {
        node,
        data,
        store
      }) {;
      }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .kuang {
    margin-top: 20px;
  }
  .zuokuang{
    width: 40%;
  }
</style>
