<script setup lang="ts">
import { useTableStore } from "../../store/modules/tableStore/tableStore";
import { CircleCloseFilled, Rank } from "@element-plus/icons-vue";
import Sortable from "sortablejs";
const dialogVisible = ref(false);
const tableData = ref(useTableStore().tableData);
const tableTitle = useTableStore().tableTitle;
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const $table = ref<any>();
//行拖拽
function rowDrop() {
  const tbody = $table.value.$el.querySelector("tbody")!;
  new Sortable(tbody, {
    handle: ".rank-handle",
    animation: 150,
    onEnd({ newIndex, oldIndex }) {
      const currRow = tableData.value.splice(oldIndex!, 1)[0];
      tableData.value.splice(newIndex!, 0, currRow);
    },
  });
}

watch(dialogVisible, (value) => {
  if (value) {
    nextTick(() => {
      rowDrop();
    });
  } else {
  }
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="../../assets/typescript.svg" class="logo ts" alt="TS logo" />
    </a>
    <a href="https://pinia.vuejs.org/zh/" target="_blank">
      <img src="../../assets/pinia.svg" class="logo pinia" alt="Pinia logo" />
    </a>
    <a href="https://element-plus.gitee.io/zh-CN/" target="_blank">
      <img
        src="../../assets/element-plus.svg"
        class="logo element"
        alt="Element logo"
      />
    </a>
  </div>
  <h1>Vite + Vue + Ts + Pinia + Element Plus</h1>
  <div class="content">
    <button @click="dialogVisible = true">点击弹窗</button>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      :show-close="false"
      width="90vw"
      style="
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        overflow: auto;
      "
      draggable
    >
      <template #header="{ close, titleId, titleClass }">
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="text-align: left">
            <h4 style="margin: 0" :id="titleId" :class="titleClass">
              自定义显示列项
            </h4>
            <h6
              style="margin: 0; font-size: smaller; color: #858585"
              :id="titleId"
              :class="titleClass"
            >
              测试文本
            </h6>
          </div>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </div>
      </template>
      <el-table
        ref="$table"
        :data="filterTableData"
        max-height="300px"
        row-key="id"
      >
        <el-table-column fixed type="selection" width="55" />
        <el-table-column
          v-for="(item, index) in tableTitle"
          :prop="item.prop"
          :key="`col_${index}`"
          :column-key="index.toString()"
          :label="item.label"
          :show-overflow-tooltip="true"
        />
        <el-table-column align="center">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="通过Name搜索"
            />
          </template>
          <template #default="_scope">
            <!-- {{ (scope.$index, scope.row) }} -->
            <el-icon class="rank-handle" style="cursor: grab"><Rank /></el-icon>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div style="display: flex; justify-content: space-between">
          <!-- <el-link type="primary" :underline="false" @click="reset"
            >恢复默认</el-link
          > -->
          <span style="margin-left: auto">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              确认
            </el-button>
          </span>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  @media (max-width: 520px) {
    &.element {
      height: auto;
    }
  }
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  &.ts:hover {
    filter: drop-shadow(0 0 2em #3178c6);
  }
  &.pinia:hover {
    filter: drop-shadow(0 0 2em #ffd859);
  }
  &.element:hover {
    filter: drop-shadow(0 0 2em #409eff);
  }
}
</style>
