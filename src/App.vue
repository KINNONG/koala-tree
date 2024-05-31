<script setup lang="ts">
import TreeCatalogue from "./components/TreeCatalogue/index.vue"
import {ref} from "vue";

interface TreeNode {
  id: number;
  label: string;
  value: number;
  children?: Array<TreeNode>;
}

const treeData = ref([
  {
    id: 1, //id唯一
    label: "a",
    value: 1,
    children: [
      {
        id: 2, //id唯
        label: "a-a",
        value: 2,
        children: [
          {
            id: 3, //id唯
            label: "a-a-a",
            value: 3,
            children: [
              {
                id: 7, //id唯
                label: "a-a-a-a",
                value: 7,
                children: [
                  {
                    id: 8, //id唯
                    label: "a-a-a-a-a",
                    value: 8,
                    children: [
                      {
                        id: 9, //id唯
                        label: "a-a-a-a-a-a",
                        value: 9,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4, //id唯一
    label: "b",
    value: 4,
    children: [
      {
        id: 5, //id唯
        label: "b-b",
        value: 5,
        children: [
          {
            id: 6, //id唯
            label: "b-b-b",
            value: 6,
          },
        ],
      },
    ],
  },
]);

const text = ref('当前选中：')
const activeNodeId = ref<number | null>(null);

// @ts-ignore
const handleCreate = (parentNode: TreeNode) => {
  // 创建节点逻辑
  console.log("创建节点:");
  // 使用原生 prompt 弹窗让用户输入节点名称
  const nodeName = prompt('请输入新节点名称：', '新节点');
  if (nodeName) {
    const newNode: TreeNode = {
      id: Date.now(), // 唯一标识符
      value: Date.now(),
      label: nodeName,
      children: [] // 新节点默认没有子节点
    }
    parentNode.children = parentNode.children || [];
    parentNode.children.push(newNode); // 添加到指定父节点的子节点数组
  }
};

// 点击节点逻辑
const handleClick = (node: TreeNode) => {
  activeNodeId.value = node.id; // 更新激活节点状态
  text.value = "当前选中：" + node.id
}

// 点击重命名逻辑
const handleRename = (parentNode: TreeNode) => {
  console.log("点击重命名:", parentNode)
}

// 点击删除逻辑
const handleRemove = (nodeId: number) => {
  const rootNodes = treeData.value;
  const findNode = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (node.id === nodeId) {
        // 找到节点，从数组中删除
        const index = nodes.indexOf(node);
        if (index > -1) {
          nodes.splice(index, 1);
        }
        return;
      }
      if (node.children) {
        // 递归查找子节点，随后进行删除
        findNode(node.children);
      }
    });
  };
  findNode(rootNodes);
}

</script>

<template>
  <div class="flex-col justify-start items-start">
    <h1 class="font-bold font pb-5">koala-tree</h1>
    <TreeCatalogue
        :data="treeData"
        :depth="0"
        :activeNodeId="activeNodeId"
        :onCreate="handleCreate"
        :onClick="handleClick"
        :onRename="handleRename"
        :onRemove="handleRemove"
    />
    <div class="mt-3">{{ text }}</div>
  </div>

</template>

<style scoped>
</style>
