<script setup lang="ts">
import { useTable } from '@/hooks';

function fetchData(params: { key: string }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            name: '张三',
            age: 18,
            sex: '男',
          },
          {
            name: '李四',
            age: 20,
            sex: '女',
          },
        ].filter(item => item.name.includes(params.key)),
        total: 2,
      });
    }, 1000);
  });
}

const { columns, data, columnChecks, getTableList } = useTable({
  apiFnc: fetchData,
  apiParams: {
    key: '',
  },
  columns: () => [
    {
      label: '序号',
      type: 'index',
      fixed: 'left',
    },
    {
      label: '姓名',
      prop: 'name',
      fixed: 'left',
    },
    {
      label: '年龄',
      prop: 'age',
    },
    {
      label: '性别',
      prop: 'sex',
    },
  ],
});

onMounted(getTableList);
</script>

<template>
  <div class="main-content">
    <app-table title="表格" :data :columns :column-checks="columnChecks">
      <template #header>
        <el-button type="primary">
          新增
        </el-button>
        <el-button type="danger">
          删除
        </el-button>
      </template>
    </app-table>
  </div>
</template>
