<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />-->
    <tree-table :data="data" :columns="columns" border />
  </div>
</template>

<script>
import treeTable from "@/components/treeTable";
export default {
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: "事件",
          value: "event",
          width: 200
        },
        {
          text: "ID",
          value: "id"
        }
      ],
      data: [
        {
          id: 0,
          event: "事件1",
          timeLine: 50,
          comment: "无"
        },
        {
          id: 1,
          event: "事件1",
          timeLine: 100,
          comment: "无",
          child: [
            {
              id: 2,
              event: "事件2",
              timeLine: 10,
              comment: "无"
            },
            {
              id: 3,
              event: "事件3",
              timeLine: 90,
              comment: "无",
            }
          ]
        }
      ]
    };
  },

  watch: {
    // filterText(val) {
    //   this.$refs.tree2.filter(val);
    // }
  },

  methods: {
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.label.indexOf(value) !== -1;
    // }
  }
};
</script>

