<template>
  <div class="tree-catalogue">
    <ul class="tree-list">
      <li v-for="node in props.data" :key="node.id" class="tree-node">
        <div class="tree-item flex hover:bg-light-gray cursor-pointer"
             :class="{ active: props.activeNodeId === node.id }"
             @mouseover="setHoveredState(node.id,true)"
             @mouseleave="setHoveredState(node.id,false)"
             @click.stop="onClick(node)"
        >
          <div class="flex items-center overflow-hidden truncate" :style="{ paddingLeft: `${props.depth * 15}px` }">
          <span
              class="tree-node-expand-arrow"
              :class="[
              node.children && node.children.length ? 'has-icon' : '',
              isExpanded(node) ? 'arrow-expand' : 'arrow-collapse',
            ]"
              @click.stop="toggle(node)"
          >
            <svg-icon
                v-if="node.children && node.children.length"
                name="icon-triangle"
                width="20px"
                height="20px"
            />
          </span>
            <!-- 重命名输入框 -->
            <input
                ref="renameInput"
                @focus="renameNode(node)"
                v-if="renaming[node.id]"
                class="rename-input"
                type="text"
                v-model="node.label"
                autofocus
                @blur="endRename(node)"
                @keyup.enter="endRename(node)"
                @keyup.esc="cancelRename(node)"
                :style="{left: `${props.depth * 15 + 25}px`,width: `${props.depth * 15 + 30}px`}"
            />
            <div v-if="!renaming[node.id]" class="tree-label relative overflow-hidden truncate">
              {{ node.label }}
            </div>

          </div>
          <div v-if="nodeHoverStates[node.id]" class="actions-groups flex pl-2 relative">
            <svg-icon class="mr-1 p-1 hover:bg-gray rounded" name="icon-add" width="20px" height="20px"
                      @click.stop="handleCreateNode(node)"/>
            <svg-icon class="p-1 hover:bg-gray rounded" name="icon-menu" width="20px" height="20px"
                      @click.stop="openMenu(node)"/>

            <div v-show="menuVisible[node.id]" @mouseleave="hideMenu"
                 class="action-menu flex-col justify-start absolute right-0">
              <ul class="menu-list p-1">
                <li class="menu-item pt-1 pb-1 hover:bg-gray rounded" @click.stop="renameNode(node)"> ✍ 重命名</li>
                <li class="menu-item pt-1 pb-1 hover:bg-gray rounded" @click.stop="removeNode(node.id)"> ❌ 删除</li>
                <!-- 其他菜单项 -->
              </ul>

            </div>
          </div>

        </div>
        <TreeCatalogue
            v-if="isExpanded(node) && node.children && node.children.length"
            :key="node.id"
            :data="node.children"
            :depth="props.depth + 1"
            :activeNodeId="props.activeNodeId"
            :onCreate="props.onCreate"
            :onClick="props.onClick"
            :onRename="props.onRename"
            :onRemove="props.onRemove"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from "vue";
import TreeCatalogue from "../TreeCatalogue/index.vue";

// 定义树节点结构
interface TreeNode {
  id: number;
  value: number;
  label: string;
  children?: Array<TreeNode>;
  isHovered?: boolean;
  isActive?: boolean;
}

interface ExpandedStates {
  [key: number]: boolean;
}

interface ActiveStates {
  [key: number]: boolean;
}

const props = withDefaults(defineProps<{
  data: Array<TreeNode>;
  depth: number;
  activeNodeId: number | null;
  onCreate: (node: TreeNode) => void;
  onClick: (node: TreeNode) => void;
  onRename: (node: TreeNode) => void;
  onRemove: (nodeId: number) => void;
}>(), {
  depth: 0,
  activeNodeId: null,
})

const emit = defineEmits(['onCreate', 'onClick', 'onRename', 'onRemove'])

// 使用一个响应式对象来存储每个节点的展开状态
const expandedStates = ref<ExpandedStates>({});
// 定义一个变量来记录鼠标是否悬停在节点上
const nodeHoverStates = ref<Record<number, boolean>>({});
const nodeActiveStates = ref<ActiveStates>({});
// 使用一个响应式对象来存储每个节点的菜单显示状态
const menuVisible = ref<Record<number, boolean>>({});
// 用于重命名的状态
const renaming = ref<Record<number, boolean>>({}); // 记录哪些节点正在重命名
// 记录当前激活节点的 ID


const onClick = (node: TreeNode) => {
  props.onClick(node);
};

// 初始化展开状态
props.data.forEach(node => {
  node.isActive = false; // 初始化悬浮状态
  if (node.children && node.children.length) {
    expandedStates.value[node.id] = false;
    nodeActiveStates.value[node.id] = false;
  }
});

// 判断节点是否展开
const isExpanded = (node: TreeNode) => {
  return expandedStates.value[node.id] || false;
};


// 设置鼠标悬浮状态
const setHoveredState = (nodeId: number, isHovering: boolean) => {
  nodeHoverStates.value[nodeId] = isHovering;
};


// 切换节点的展开状态
const toggle = (node: TreeNode) => {
  if (node.children && node.children.length) {
    expandedStates.value[node.id] = !expandedStates.value[node.id];
  }
};

// 切换节点菜单的展开状态
const openMenu = (node: TreeNode) => {
  // 切换菜单状态
  menuVisible.value[node.id] = !menuVisible.value[node.id];
};

// 点击外部隐藏菜单
const hideMenu = () => {
  for (const key in menuVisible.value) {
    menuVisible.value[key] = false;
  }
};

// 处理新增节点的逻辑
const handleCreateNode = (parentNode: TreeNode) => {
  // 调用父组件传递的 onCreate 函数
  props.onCreate(parentNode);
};

// 处理点击重命名的逻辑
// 开始重命名节点
const renameNode = (parentNode: TreeNode) => {
  renaming.value[parentNode.id] = true; // 显示输入框
  nextTick(() => {
    // 获取输入框的DOM引用
    const input = document.querySelector('.rename-input');
    if (input instanceof HTMLInputElement) {
      // 聚焦输入框
      input.focus();
      // 选中输入框中的所有文字
      input.select();
    }
  });
  props.onRename(parentNode);
};

const endRename = (node: TreeNode) => {
  renaming.value[node.id] = false; // 隐藏输入框
};

const cancelRename = (node: TreeNode) => {
  renaming.value[node.id] = false; // 隐藏输入框
};

// 处理点击删除节点的逻辑
const removeNode = (nodeId: number) => {
  if (nodeId) {
    props.onRemove(nodeId);
  }
}

</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
