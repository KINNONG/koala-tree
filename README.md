# koala-tree

基于Vue3和TypeScript实现的仿飞书的树形结构目录，传入树形接口数据即可。只实现了基本功能，还有很大的进步的空间~~

![2024-05-29 09-18-57](https://kinnong-1301438479.cos.ap-guangzhou.myqcloud.com/PicGo/202405311603142.gif)

# Demo

预览地址：[koala-tree.vercel.app](https://koala-tree.vercel.app/)



# API

#### props

|     属性     |            说明            | 类型             |
| :----------: | :------------------------: | ---------------- |
|     data     |       显示的树的数据       | Array            |
|    depth     |  初始树的深度（影响缩进）  | Number，默认0    |
| activeNodeId |  当前正在查看/激活的节点   | Number \|\| null |
|   onCreate   |        接收新建事件        |                  |
|   onRemove   |        接收删除事件        |                  |
|   onRename   |       接收重命名事件       |                  |
|   onClick    | 接收任意节点的点击触发事件 |                  |



# 使用方式

```
# 克隆该项目
git clone https://github.com/KINNONG/koala-tree.git

# 安装依赖
npm install

# 运行项目
npm run dev
```



## 待完善功能

- [ ] 多选、带复选框
- [ ] 虚拟列表
- [ ] 节点拖拽
- [ ] 自定义节点图标
- [ ] 自定义额外节点
- [ ] 自定义组件图标
- [ ] 动态加载
- [ ] 设置回填方式
- [ ] 显示连接线
- [ ] 搜索树
- [ ] 自定义data的字段名称